// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "contracts/interfaces/ICrossDomainMessenger.sol";
import "contracts/interfaces/IZKBridgeInner.sol";

contract OpMessageReceive is Initializable, OwnableUpgradeable {

    event ReceiveNativeMessage(uint16 srcChainId, uint16 dstChainId, uint64 sequence, bytes32 messageHash);

    ICrossDomainMessenger public crossDomainMessenger;

    address public remoteSender;

    IZKBridgeInner public zkBridge;

    uint16 public chainId;

    function initialize(
        address _crossDomainMessenger,
        address _remoteSender,
        uint16 _chainId,
        address _zkBridge
    ) public initializer {
        require(_crossDomainMessenger != address(0), "Zero address");
        require(_remoteSender != address(0), "Zero address");
        crossDomainMessenger = ICrossDomainMessenger(_crossDomainMessenger);
        remoteSender = _remoteSender;
        chainId = _chainId;
        zkBridge = IZKBridgeInner(_zkBridge);
        __Ownable_init();
    }

    function receiveMessage(
        uint16 _srcChainId,
        address _srcAddress,
        uint16 _dstChainId,
        address _dstAddress,
        uint64 _sequence,
        bytes calldata _payload
    ) external payable {
        require(
            msg.sender == address(crossDomainMessenger),
            "Not From CrossDomainMessenger"
        );
        require(
            crossDomainMessenger.xDomainMessageSender() == remoteSender,
            "invalid emitter"
        );
        if (_dstChainId == chainId) {
            zkBridge.validateTransactionFromL2(
                _srcChainId,
                _srcAddress,
                _dstAddress,
                _sequence,
                _payload
            );
        } else {
            zkBridge.sendFromL2(_srcChainId,_dstChainId, _dstAddress, _payload);
        }
        bytes32 messageHash = keccak256(abi.encode(_srcChainId, _srcAddress, _dstChainId, _dstAddress, _sequence, _payload));
        emit ReceiveNativeMessage(_srcChainId, _dstChainId, _sequence, messageHash);
    }

    function setCrossDomainMessenger(address _crossDomainMessenger) external onlyOwner {
        require(_crossDomainMessenger != address(0), "Zero address");
        crossDomainMessenger = ICrossDomainMessenger(_crossDomainMessenger);
    }

    function setRemoteSender(address _remoteSender) external onlyOwner {
        require(_remoteSender != address(0), "Zero address");
        remoteSender = _remoteSender;
    }

    function setZkBridge(address _zkBridge) external onlyOwner {
        require(_zkBridge != address(0), "Zero address");
        zkBridge = IZKBridgeInner(_zkBridge);
    }

    function setChainId(uint16 _chainId) external onlyOwner {
        chainId = _chainId;
    }
}
