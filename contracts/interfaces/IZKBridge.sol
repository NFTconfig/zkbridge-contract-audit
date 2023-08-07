// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface IZKBridgeSend {

    event MessagePublished(address indexed sender, uint16 indexed dstChainId, uint64 indexed sequence, address dstAddress, bytes payload);

    event ExecutedMessage(address indexed sender, uint16 indexed srcChainId, uint64 indexed sequence, address dstAddress, bytes payload);

    function send(uint16 dstChainId, address dstAddress, bytes memory payload) external payable returns (uint64 nonce);

    function validateTransactionProof(uint16 srcChainId, bytes32 srcBlockHash, uint256 logIndex, bytes memory mptProof) external;

    function estimateFee(uint16 dstChainId, bytes memory payload) external view returns (uint256 fee);
}
