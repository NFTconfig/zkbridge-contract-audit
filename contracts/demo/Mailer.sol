// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IZKBridgeEntrypoint.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Mailer
/// @notice An example contract for sending messages to other chains, using the ZKBridgeEntrypoint.
contract Mailer is Ownable {
    /// @notice The ZKBridgeEntrypoint contract, which sends messages to other chains.
    IZKBridgeEntrypoint public zkBridgeEntrypoint;

    /// @notice Sequence number of the current emitter
    uint64 private sequence;

    uint256 public maxLength = 200;

    /// @notice Fee for each chain.
    mapping(uint16 => uint256) public fees;

    event MessageSend(
        uint64 indexed sequence,
        uint32 indexed dstChainId,
        address indexed dstAddress,
        address sender,
        address recipient,
        string message
    );
    event NewFee(uint16 chainId, uint256 fee);

    constructor(address _zkBridgeEntrypoint) {
        zkBridgeEntrypoint = IZKBridgeEntrypoint(_zkBridgeEntrypoint);
    }

    /// @notice Sends a message to a destination MessageBridge.
    /// @param dstChainId The chain ID where the destination MessageBridge.
    /// @param dstAddress The address of the destination MessageBridge.
    /// @param recipient Recipient of the target chain message.
    /// @param message The message to send.
    function sendMessage(
        uint16 dstChainId,
        address dstAddress,
        address recipient,
        string memory message
    ) external payable {
        require(msg.value >= fees[dstChainId], "Insufficient Fee");
        require(
            bytes(message).length <= maxLength,
            "Maximum message length exceeded."
        );
        bytes memory payload = abi.encode(msg.sender, recipient, message);

        uint64 _sequence = zkBridgeEntrypoint.send(
            dstChainId,
            dstAddress,
            payload
        );

        emit MessageSend(
            _sequence,
            dstChainId,
            dstAddress,
            msg.sender,
            recipient,
            message
        );
    }

    /// @notice Allows owner to set a new msg length.
    /// @param _maxLength new msg length.
    function setMsgLength(uint256 _maxLength) external onlyOwner {
        maxLength = _maxLength;
    }

    // @notice Allows owner to claim all fees sent to this contract.
    /// @notice Allows owner to set a new fee.
    /// @param _dstChainId The chain ID where the destination MessageBridge.
    /// @param _fee The new fee to use.
    function setFee(uint16 _dstChainId, uint256 _fee) external onlyOwner {
        require(fees[_dstChainId] != _fee, "Fee has already been set.");
        fees[_dstChainId] = _fee;
        emit NewFee(_dstChainId, _fee);
    }

    /// @notice Allows owner to claim all fees sent to this contract.
    function claimFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
