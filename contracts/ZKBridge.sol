// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./libraries/RLPReader.sol";
import "./libraries/BytesLib.sol";
import "./interfaces/IZKBridgeInner.sol";
import "./interfaces/IZKBridgeReceiver.sol";
import "./interfaces/IL2MessageSend.sol";
import "./interfaces/IMptVerifier.sol";
import "./interfaces/IBlockUpdater.sol";

contract ZKBridge is Initializable, OwnableUpgradeable, IZKBridgeInner {
    using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;
    using BytesLib for bytes;

    event SetFee(uint16 dstChainId, uint256 fee);

    event ClaimFee(address operator, uint256 amount);

    event SetTrustedRemoteAddress(uint16 chainId, address remoteAddress);

    event SetMptVerifier(uint16 chainId, address mptVerifier);

    event SetBlockUpdater(uint16 chainId, address lockUpdater);

    event SetL2MessageReceive(uint16 chainId, address l2MessageReceive);

    event SetL2MessageSend(address l2MessageSend);

    bytes32 public constant MESSAGE_TOPIC = 0xb8abfd5c33667c7440a4fc1153ae39a24833dbe44f7eb19cbe5cd5f2583e4940;

    uint16 public chainId;

    bool public isL2;

    IL2MessageSend public l2MessageSend;

    // chainId => mptVerifierAddress
    mapping(uint16 => IMptVerifier) public mptVerifiers;

    // chainId => blockUpdaterAddress
    mapping(uint16 => IBlockUpdater) public blockUpdaters;

    mapping(bytes32 => uint64) public targetNonce;

    // chainId => messageReceiveAddress
    mapping(uint16 => address) public l2MessageReceives;

    // chainId => zkBridgeAddress
    mapping(uint16 => address) public trustedRemoteLookup;

    mapping(bytes32 => bool) public completedTransfers;

    mapping(uint16 => uint256) public fee;

    struct LogMessage {
        uint16 dstChainId;
        uint64 nonce;
        address dstAddress;
        address srcAddress;
        address srcZkBridge;
        bytes payload;
    }

    struct Payload {
        uint16 srcChainId;
        uint16 dstChainId;
        address srcAddress;
        address dstAddress;
        uint64 nonce;
        bytes uaPayload;
    }

    function initialize(uint16 _chainId, bool _isL2) public initializer {
        __Ownable_init();
        chainId = _chainId;
        isL2 = _isL2;
    }

    function send(uint16 _dstChainId, address _dstAddress, bytes memory _payload) external payable returns (uint64 currentNonce) {
        require(_dstChainId != chainId, "Cannot send to same chain");
        require(msg.value >= _estimateFee(_dstChainId, _payload), "insufficient Fee");
        currentNonce = _useNonce(msg.sender, _dstChainId, _dstAddress);
        _payload = abi.encodePacked(chainId, _dstChainId, msg.sender, _dstAddress, currentNonce, _payload);
        if (isL2) {
            require(address(l2MessageSend) != address(0), "l2MessageSend is not set");
            l2MessageSend.sendMessage{value : l2MessageSend.getFee()}(chainId, msg.sender, _dstChainId, _dstAddress, currentNonce, _payload);
        }
        emit MessagePublished(msg.sender, _dstChainId, currentNonce, _dstAddress, _payload);
    }

    function sendFromL2(uint16 _srcChainId, uint16 _dstChainId, address _dstAddress, bytes calldata _payload) external returns (uint64 currentNonce) {
        require(msg.sender == l2MessageReceives[_srcChainId], "caller is not the l2MessageReceive");
        require(_dstChainId != chainId, "Cannot send to same chain");
        currentNonce = _useNonce(msg.sender, _dstChainId, _dstAddress);
        emit MessagePublished(msg.sender, _dstChainId, currentNonce, _dstAddress, _payload);
    }

    function validateTransactionProof(uint16 _srcChainId, bytes32 _srcBlockHash, uint256 _logIndex, bytes calldata _mptProof) external {
        IMptVerifier mptVerifier = mptVerifiers[_srcChainId];
        IBlockUpdater blockUpdater = blockUpdaters[_srcChainId];
        require(address(mptVerifier) != address(0), "MptVerifier is not set");
        require(address(blockUpdater) != address(0), "Block Updater is not set");

        IMptVerifier.Receipt memory receipt = mptVerifier.validateMPT(_mptProof);
        require(receipt.state == 1, "Source Chain Transaction Failure");
        require(blockUpdater.checkBlock(_srcBlockHash, receipt.receiptHash), "Block Header is not set");

        LogMessage memory logMessage = _parseLog(receipt.logs, _logIndex);
        require(logMessage.srcZkBridge == trustedRemoteLookup[_srcChainId], "Destination chain is not a trusted sourcee");
        require(logMessage.dstChainId == chainId, "Invalid destination chain");

        bytes32 hash = keccak256(abi.encode(_srcChainId, logMessage.srcAddress, logMessage.nonce));
        require(!completedTransfers[hash], "Message already executed.");
        completedTransfers[hash] = true;

        Payload memory p = _parsePayload(logMessage.payload);
        if (p.srcChainId != _srcChainId) {
            require(p.dstChainId == chainId, "Invalid destination chain");
            hash = keccak256(abi.encode(p.srcChainId, p.srcAddress, p.nonce));
            require(!completedTransfers[hash], "Message already executed");
            completedTransfers[hash] = true;
            emit ExecutedMessage(p.srcAddress, p.srcChainId, p.nonce, p.dstAddress, p.uaPayload);
        }

        IZKBridgeReceiver(p.dstAddress).zkReceive(p.srcChainId, p.srcAddress, p.nonce, p.uaPayload);
        emit ExecutedMessage(logMessage.srcAddress, _srcChainId, logMessage.nonce, logMessage.dstAddress, logMessage.payload);
    }

    function validateTransactionFromL2(uint16 _srcChainId, address _srcAddress, address _dstAddress, uint64 _nonce, bytes calldata _payload) external {
        require(msg.sender == l2MessageReceives[_srcChainId], "caller is not the l2MessageReceive");
        Payload memory p = _parsePayload(_payload);
        require(_srcChainId == p.srcChainId, "Invalid srcChainId");
        require(p.dstChainId == chainId, "Invalid destination chain");

        bytes32 hash = keccak256(abi.encode(_srcChainId, _srcAddress, _nonce));
        require(!completedTransfers[hash], "Message already executed");
        completedTransfers[hash] = true;

        IZKBridgeReceiver(_dstAddress).zkReceive(_srcChainId, _srcAddress, _nonce, p.uaPayload);
        emit ExecutedMessage(_srcAddress, _srcChainId, _nonce, _dstAddress, _payload);
    }

    function _useNonce(address _emitter, uint16 _dstChainId, address _dstAddress) internal returns (uint64 currentNonce) {
        bytes32 hash = keccak256(abi.encode(_emitter, _dstChainId, _dstAddress));
        currentNonce = targetNonce[hash];
        targetNonce[hash]++;
    }

    function _parseLog(bytes memory _logsByte, uint256 _logIndex) internal pure returns (LogMessage memory logMessage) {
        RLPReader.RLPItem[] memory logs = _logsByte.toRlpItem().toList();
        if (_logIndex != 0) {
            require(logs.length > _logIndex + 2, "Invalid proof");
            logs = logs[_logIndex + 2].toRlpBytes().toRlpItem().toList();
        }
        RLPReader.RLPItem[] memory topicItem = logs[1].toRlpBytes().toRlpItem().toList();
        bytes32 topic = bytes32(topicItem[0].toUint());
        if (topic == MESSAGE_TOPIC) {
            logMessage.srcZkBridge = logs[0].toAddress();
            logMessage.srcAddress = abi.decode(topicItem[1].toBytes(), (address));
            logMessage.dstChainId = uint16(topicItem[2].toUint());
            logMessage.nonce = uint64(topicItem[3].toUint());
            (logMessage.dstAddress, logMessage.payload) = abi.decode(logs[2].toBytes(), (address, bytes));
        }
    }

    function _parsePayload(bytes memory _payload) internal pure returns (Payload memory txPayload) {
        uint index = 0;

        txPayload.srcChainId = _payload.toUint16(index);
        index += 2;

        txPayload.dstChainId = _payload.toUint16(index);
        index += 2;

        txPayload.srcAddress = _payload.toAddress(index);
        index += 20;

        txPayload.dstAddress = _payload.toAddress(index);
        index += 20;

        txPayload.nonce = _payload.toUint64(index);
        index += 8;
        txPayload.uaPayload = _payload.slice(index, _payload.length - index);
    }

    function _estimateFee(uint16 _dstChainId, bytes memory _payload) internal view returns (uint256 bridgeFee) {
        if (isL2) {
            require(address(l2MessageSend) != address(0), "l2MessageSend is not set");
            bridgeFee = l2MessageSend.getFee();
        }
        bridgeFee += fee[_dstChainId];
    }

    function estimateFee(uint16 _dstChainId, bytes calldata _payload) external view returns (uint256 bridgeFee){
        bridgeFee = _estimateFee(_dstChainId, _payload);
    }

    //----------------------------------------------------------------------------------
    // onlyOwner
    function setFee(uint16 _dstChainId, uint256 _fee) public onlyOwner {
        fee[_dstChainId] = _fee;
        emit SetFee(_dstChainId, _fee);
    }

    function setTrustedRemoteAddress(uint16 _remoteChainId, address _remoteAddress) external onlyOwner {
        trustedRemoteLookup[_remoteChainId] = _remoteAddress;
        emit SetTrustedRemoteAddress(_remoteChainId,_remoteAddress);
    }

    function setMptVerifier(uint16 _chainId, address _mptVerifier) external onlyOwner {
        require(_mptVerifier != address(0), "Zero address");
        mptVerifiers[_chainId] = IMptVerifier(_mptVerifier);
        emit SetMptVerifier(_chainId, _mptVerifier);
    }

    function setBlockUpdater(uint16 _chainId, address _blockUpdater) external onlyOwner {
        require(_blockUpdater != address(0), "Zero address");
        blockUpdaters[_chainId] = IBlockUpdater(_blockUpdater);
        emit SetBlockUpdater(_chainId, _blockUpdater);
    }

    function setL2MessageReceive(uint16 _chainId, address _l2MessageReceive) external onlyOwner {
        require(_l2MessageReceive != address(0), "Zero address");
        l2MessageReceives[_chainId] = _l2MessageReceive;
        emit SetL2MessageReceive(_chainId, _l2MessageReceive);
    }

    function setL2MessageSend(address _l2MessageSend) external onlyOwner {
        require(_l2MessageSend != address(0), "Zero address");
        l2MessageSend = IL2MessageSend(_l2MessageSend);
        emit SetL2MessageSend(_l2MessageSend);
    }

    function claimFees() external onlyOwner {
        emit ClaimFee(msg.sender, address(this).balance);
        payable(owner()).transfer(address(this).balance);
    }

    fallback() external payable {revert("unsupported");}

    receive() external payable {revert("the ZkBridge contract does not accept assets");}
}
