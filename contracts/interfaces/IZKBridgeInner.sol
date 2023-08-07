// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IZKBridge.sol";

interface IZKBridgeInner is IZKBridgeSend {

    function sendFromL2(uint16 srcChainId, uint16 dstChainId, address dstAddress, bytes memory payload) external returns (uint64 sequence);

    function validateTransactionFromL2(uint16 srcChainId, address srcAddress, address dstAddress, uint64 sequence, bytes calldata payload) external;

}
