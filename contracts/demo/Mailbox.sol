// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IZKBridgeEntrypoint.sol";
import "./interfaces/IZKBridgeReceiver.sol";
import "./interfaces/ISameChainReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Mailbox
/// @notice An example contract for receiving messages from other chains
contract Mailbox is IZKBridgeReceiver, ISameChainReceiver, Ownable {
    event MessageReceived(
        uint64 indexed sequence,
        uint32 indexed sourceChainId,
        address indexed sourceAddress,
        address sender,
        address recipient,
        string message
    );
    event NewTrustedMailer(address mailer, bool isTrusted);

    struct Msg {
        address sender;
        string message;
    }

    address private zkBridgeReceiver;

    /// @notice The trusted mailer will only receive the message if msg.sender is the trusted mailer.
    mapping(address => bool) public trustedMailers;

    // recipient=>Msg
    mapping(address => Msg[]) public messages;

    constructor(address _zkBridgeReceiver) {
        zkBridgeReceiver = _zkBridgeReceiver;
    }

    /// @notice ZKBridge endpoint will invoke this function to deliver the message on the destination
    /// @param srcChainId - the source endpoint identifier
    /// @param srcAddress - the source sending contract address from the source chain
    /// @param sequence - the ordered message nonce
    /// @param payload - the signed payload is the UA bytes has encoded to be sent
    function zkReceive(
        uint16 srcChainId,
        address srcAddress,
        uint64 sequence,
        bytes calldata payload
    ) external override {
        require(msg.sender == zkBridgeReceiver, "Not From ZKBridgeReceiver");
        _receive(srcChainId, srcAddress, sequence, payload);
    }

    /// @notice See note on `zkReceive()`
    function _receive(
        uint16 srcChainId,
        address srcAddress,
        uint64 sequence,
        bytes calldata payload
    ) private {
        (address sender, address recipient, string memory message) = abi.decode(
            payload,
            (address, address, string)
        );
        messages[recipient].push(Msg(sender, message));
        emit MessageReceived(
            sequence,
            srcChainId,
            srcAddress,
            sender,
            recipient,
            message
        );
    }

    /**
     * @notice Receive same-chain messages only from a trusted mailer. The message will be accepted only if `msg.sender` is a trusted mailer.
     * @param srcChainId - the source endpoint identifier
     * @param srcAddress - the source sending contract address from the source chain
     * @param sequence - the ordered message nonce
     * @param payload - the signed payload is the UA bytes has encoded to be sent
     */
    function sameChainReceive(
        uint16 srcChainId,
        address srcAddress,
        uint64 sequence,
        bytes calldata payload
    ) external override {
        require(trustedMailers[msg.sender], "Not from a trusted Mailer");
        _receive(srcChainId, srcAddress, sequence, payload);
    }

    /**
     * @notice Set a new TrustedMailer.Only owner can set
     * @param mailer The mailer address.
     * @param isTrusted The mailer is trusted.
     */
    function setTrustedMailer(
        address mailer,
        bool isTrusted
    ) external onlyOwner {
        require(trustedMailers[mailer] != isTrusted, "Duplicate setting!");
        trustedMailers[mailer] = isTrusted;
        emit NewTrustedMailer(mailer, isTrusted);
    }

    function messagesLength(address recipient) external view returns (uint256) {
        return messages[recipient].length;
    }
}
