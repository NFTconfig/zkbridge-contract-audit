// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "contracts/interfaces/ICrossDomainMessenger.sol";
import "contracts/interfaces/IL2MessageSend.sol";

contract OpMessageSend is Initializable, OwnableUpgradeable, IL2MessageSend {

    event SendNativeMessage(uint16 dstChainId, uint64 sequence, bytes32 messageHash);

    ICrossDomainMessenger public crossDomainMessenger;

    address public messageReceive;

    mapping(bytes32 => bool) public transmitted;

    uint32 public l1GasLimit;

    address public zkBridge;

    function initialize(address _crossDomainMessenger, address _zkBridge) public initializer {
        require(_crossDomainMessenger != address(0), "Zero address");
        require(_zkBridge != address(0), "Zero address");
        __Ownable_init();
        crossDomainMessenger = ICrossDomainMessenger(_crossDomainMessenger);
        l1GasLimit = 2000000;
        zkBridge = _zkBridge;
    }

    function sendMessage(
        uint16 _srcChainId,
        address _srcAddress,
        uint16 _dstChainId,
        address _dstAddress,
        uint64 _sequence,
        bytes calldata _payload
    ) external payable {
        require(messageReceive != address(0), "MessageReceive is not set");
        require(zkBridge == msg.sender, "caller is not the zkBridge");
        uint256 fee = getFee();
        require(msg.value == fee, "invalid fee");
        bytes32 messageHash = keccak256(
            abi.encode(
                _srcChainId,
                _srcAddress,
                _dstChainId,
                _dstAddress,
                _sequence,
                _payload
            )
        );
        require(transmitted[messageHash] == false, "Transmitted");

        bytes memory message = abi.encodeWithSignature(
            "receiveMessage(uint16,address,uint16,address,uint64,bytes)",
            _srcChainId,
            _srcAddress,
            _dstChainId,
            _dstAddress,
            _sequence,
            _payload
        );
        crossDomainMessenger.sendMessage(messageReceive, message, l1GasLimit);
        transmitted[messageHash] = true;
        emit SendNativeMessage(_dstChainId, _sequence, messageHash);
    }

    function isTransmit(
        uint16 _srcChainId,
        address _srcAddress,
        uint16 _dstChainId,
        address _dstAddress,
        uint64 _sequence,
        bytes calldata _payload
    ) external view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encode(
                _srcChainId,
                _srcAddress,
                _dstChainId,
                _dstAddress,
                _sequence,
                _payload
            )
        );
        return transmitted[messageHash];
    }

    function getFee() public view returns (uint256 fee) {
        fee = 0;
    }

    function setCrossDomainMessenger(address _crossDomainMessenger) external onlyOwner {
        require(_crossDomainMessenger != address(0), "Zero address");
        crossDomainMessenger = ICrossDomainMessenger(_crossDomainMessenger);
    }

    function setZkBridge(address _zkBridge) public onlyOwner {
        require(_zkBridge != address(0), "Zero address");
        zkBridge = _zkBridge;
    }


    function setMessageReceive(address _messageReceive) external onlyOwner {
        require(_messageReceive != address(0), "Zero address");
        messageReceive = _messageReceive;
    }

    function setL1GasLimit(uint32 _l1GasLimit) external onlyOwner {
        l1GasLimit = _l1GasLimit;
    }
}
