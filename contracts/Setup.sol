// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Governance.sol";

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";

contract Setup is Setters, ERC1967Upgrade {
    function setup(
        address implementation,
        address owner,
        uint256 lockTime,
        uint16 chainId,
        bool isL2
    ) public {
        _setOwner(owner);
        _setChainId(chainId);
        _setLockTime(lockTime);
        _upgradeTo(implementation);
        _setL2(isL2);
        // Call initialize function of the new implementation
        (bool success, bytes memory reason) = implementation.delegatecall(abi.encodeWithSignature("initialize()"));
        require(success, string(reason));
    }
}
