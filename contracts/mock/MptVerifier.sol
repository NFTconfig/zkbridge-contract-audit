// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../libraries/RLPReader.sol";

contract MptVerifier {
    using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;

    struct Proof {
        bytes32 receiptsHash;
        bytes mptKey;
        RLPReader.RLPItem[] stack;
    }

    struct Receipt {
        bytes32 receiptHash;
        uint256 state;
        bytes logs;
    }

    function validateMPT(bytes calldata _proof) external pure returns (Receipt memory receipt){
        Proof memory proof = decodeProofBlob(_proof);
        bytes memory rlpTx = validateMPTProof(proof.receiptsHash, proof.mptKey, proof.stack);
        require(rlpTx.length != 0, "invalid proof");
        receipt = decodeReceipt(proof.receiptsHash, rlpTx);
    }


    /// @dev Validates a Merkle-Patricia-Trie proof.
    ///      If the proof proves the inclusion of some key-value pair in the
    ///      trie, the value is returned. Otherwise, i.e. if the proof proves
    ///      the exclusion of a key from the trie, an empty byte array is
    ///      returned.
    /// @param _rootHash is the Keccak-256 hash of the root node of the MPT.
    /// @param _mptKey is the key (consisting of nibbles) of the node whose
    ///        inclusion/exclusion we are proving.
    /// @param _stack is the stack of MPT nodes (starting with the root) that
    ///        need to be traversed during verification.
    /// @return value whose inclusion is proved or an empty byte array for
    ///         a proof of exclusion
    function validateMPTProof(
        bytes32 _rootHash,
        bytes memory _mptKey,
        RLPReader.RLPItem[] memory _stack
    ) internal pure returns (bytes memory value) {
        uint256 mptKeyOffset = 0;

        bytes32 nodeHashHash;
        bytes memory rlpNode;
        RLPReader.RLPItem[] memory node;

        RLPReader.RLPItem memory rlpValue;

        if (_stack.length == 0) {
            // Root hash of empty Merkle-Patricia-Trie
            return new bytes(0);
        }

        // Traverse stack of nodes starting at root.
        for (uint256 i = 0; i < _stack.length; i++) {
            // We use the fact that an rlp encoded list consists of some
            // encoding of its length plus the concatenation of its
            // *rlp-encoded* items.
            rlpNode = _stack[i].toRlpBytes();
            // The root node is hashed with Keccak-256 ...
            if (i == 0 && _rootHash != keccak256(rlpNode)) {
                revert();
            }
            // ... whereas all other nodes are hashed with the MPT
            // hash function.
            if (i != 0 && nodeHashHash != mptHashHash(rlpNode)) {
                revert();
            }
            // We verified that stack[i] has the correct hash, so we
            // may safely decode it.
            node = _stack[i].toList();

            if (node.length == 2) {
                // Extension or Leaf node

                bool isLeaf;
                bytes memory nodeKey;
                (isLeaf, nodeKey) = merklePatriciaCompactDecode(
                    node[0].toBytes()
                );

                uint256 prefixLength = sharedPrefixLength(
                    mptKeyOffset,
                    _mptKey,
                    nodeKey
                );
                mptKeyOffset += prefixLength;

                if (prefixLength < nodeKey.length) {
                    // Proof claims divergent extension or leaf. (Only
                    // relevant for proofs of exclusion.)
                    // An Extension/Leaf node is divergent iff it "skips" over
                    // the point at which a Branch node should have been had the
                    // excluded key been included in the trie.
                    // Example: Imagine a proof of exclusion for path [1, 4],
                    // where the current node is a Leaf node with
                    // path [1, 3, 3, 7]. For [1, 4] to be included, there
                    // should have been a Branch node at [1] with a child
                    // at 3 and a child at 4.

                    // Sanity check
                    if (i < _stack.length - 1) {
                        // divergent node must come last in proof
                        revert();
                    }

                    return new bytes(0);
                }

                if (isLeaf) {
                    // Sanity check
                    if (i < _stack.length - 1) {
                        // leaf node must come last in proof
                        revert();
                    }

                    if (mptKeyOffset < _mptKey.length) {
                        return new bytes(0);
                    }

                    rlpValue = node[1];
                    return rlpValue.toBytes();
                } else {
                    // extension
                    // Sanity check
                    if (i == _stack.length - 1) {
                        // shouldn't be at last level
                        revert();
                    }

                    if (!node[1].isList()) {
                        // rlp(child) was at least 32 bytes. node[1] contains
                        // Keccak256(rlp(child)).
                        nodeHashHash = keccak256(node[1].toBytes());
                    } else {
                        // rlp(child) was at less than 32 bytes. node[1] contains
                        // rlp(child).
                        nodeHashHash = keccak256(node[1].toRlpBytes());
                    }
                }
            } else if (node.length == 17) {
                // Branch node

                if (mptKeyOffset != _mptKey.length) {
                    // we haven't consumed the entire path, so we need to look at a child
                    uint8 nibble = uint8(_mptKey[mptKeyOffset]);
                    mptKeyOffset += 1;
                    if (nibble >= 16) {
                        // each element of the path has to be a nibble
                        revert();
                    }

                    if (isEmptyByteSequence(node[nibble])) {
                        // Sanity
                        if (i != _stack.length - 1) {
                            // leaf node should be at last level
                            revert();
                        }

                        return new bytes(0);
                    } else if (!node[nibble].isList()) {
                        nodeHashHash = keccak256(node[nibble].toBytes());
                    } else {
                        nodeHashHash = keccak256(node[nibble].toRlpBytes());
                    }
                } else {
                    // we have consumed the entire mptKey, so we need to look at what's contained in this node.

                    // Sanity
                    if (i != _stack.length - 1) {
                        // should be at last level
                        revert();
                    }

                    return node[16].toBytes();
                }
            }
        }
    }

    function isEmptyByteSequence(RLPReader.RLPItem memory _item)
    internal
    pure
    returns (bool)
    {
        if (_item.len != 1) {
            return false;
        }
        uint8 b;
        uint256 memPtr = _item.memPtr;
        assembly {
            b := byte(0, mload(memPtr))
        }
        return b == 0x80;
        /* empty byte string */
    }

    function decodeReceipt(bytes32 _receiptHash, bytes memory _rlpSignedTx) internal pure returns (Receipt memory t){
        RLPReader.RLPItem[] memory fields = _rlpSignedTx.toRlpItem().toList();
        t = Receipt(
            _receiptHash,
            fields[0].toUint(),
            fields[3].toBytes()
        );
    }

    function decodeNibbles(bytes memory _compact, uint256 _skipNibbles)
    internal
    pure
    returns (bytes memory nibbles)
    {
        require(_compact.length > 0);

        uint256 length = _compact.length * 2;
        require(_skipNibbles <= length);
        length -= _skipNibbles;

        nibbles = new bytes(length);
        uint256 nibblesLength = 0;

        for (uint256 i = _skipNibbles; i < _skipNibbles + length; i += 1) {
            if (i % 2 == 0) {
                nibbles[nibblesLength] = bytes1(
                    (uint8(_compact[i / 2]) >> 4) & 0xF
                );
            } else {
                nibbles[nibblesLength] = bytes1(
                    (uint8(_compact[i / 2]) >> 0) & 0xF
                );
            }
            nibblesLength += 1;
        }

        assert(nibblesLength == nibbles.length);
    }

    function merklePatriciaCompactDecode(bytes memory _compact)
    internal
    pure
    returns (bool isLeaf, bytes memory nibbles)
    {
        require(_compact.length > 0);
        uint256 first_nibble = (uint8(_compact[0]) >> 4) & 0xF;
        uint256 skipNibbles;
        if (first_nibble == 0) {
            skipNibbles = 2;
            isLeaf = false;
        } else if (first_nibble == 1) {
            skipNibbles = 1;
            isLeaf = false;
        } else if (first_nibble == 2) {
            skipNibbles = 2;
            isLeaf = true;
        } else if (first_nibble == 3) {
            skipNibbles = 1;
            isLeaf = true;
        } else {
            // Not supposed to happen!
            revert();
        }
        return (isLeaf, decodeNibbles(_compact, skipNibbles));
    }

    function sharedPrefixLength(
        uint256 _xsOffset,
        bytes memory _xs,
        bytes memory _ys
    ) internal pure returns (uint256) {
        uint256 i;
        for (i = 0; i + _xsOffset < _xs.length && i < _ys.length; i++) {
            if (_xs[i + _xsOffset] != _ys[i]) {
                return i;
            }
        }
        return i;
    }

    function decodeProofBlob(bytes memory _proof)
    internal
    pure
    returns (Proof memory proof)
    {
        RLPReader.RLPItem[] memory proofFields = _proof.toRlpItem().toList();
        proof = Proof(
            bytes32(proofFields[0].toUint()),
            decodeNibbles(proofFields[1].toRlpBytes(), 0),
            proofFields[2].toList()
        );
    }

    /// @dev Computes the hash of the Merkle-Patricia-Trie hash of the input.
    ///      Merkle-Patricia-Tries use a weird "hash function" that outputs
    ///      *variable-length* hashes: If the input is shorter than 32 bytes,
    ///      the MPT hash is the input. Otherwise, the MPT hash is the
    ///      Keccak-256 hash of the input.
    ///      The easiest way to compare variable-length byte sequences is
    ///      to compare their Keccak-256 hashes.
    /// @param _input The byte sequence to be hashed.
    /// @return Keccak-256(MPT-hash(input))
    function mptHashHash(bytes memory _input) internal pure returns (bytes32) {
        if (_input.length < 32) {
            return keccak256(_input);
        } else {
            return
            keccak256(abi.encodePacked(keccak256(abi.encodePacked(_input))));
        }
    }
}
