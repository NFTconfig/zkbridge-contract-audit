// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ISameChainReceiver {
    /**
     * @notice Mailer will call this function to deliver a message to the destination on the same chain.
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
    ) external;
}
