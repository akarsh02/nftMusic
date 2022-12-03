// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Audio.sol";

contract Audiopium {
    mapping(address => address) public ArtistContracts;

    function createArtistContract(
        string memory _name,
        string memory _intro,
        string memory _picture,
        string memory _cover
    ) public {
        ArtistContracts[msg.sender] = address(
            new Audio(_name, _intro, _picture, _cover, msg.sender)
        );
    }
    function getArtistContract(address _artist) public view returns (address) {
        return ArtistContracts[_artist];
    }
}
