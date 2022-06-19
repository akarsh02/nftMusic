// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/Base64.sol";

contract Audio is ERC1155, Ownable {
    struct Artist {
        string artistName;
        string intro;
        string picture;
        string cover;
    }

    Artist public artist;
    string public name;
    string public symbol;

    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => uint256) public tokenPrice;

    uint256 public songCounter;

    constructor(
        string memory _artistName,
        string memory _intro,
        string memory _picture,
        string memory _cover,
        address _artist
    ) ERC1155("") {
        artist.artistName = _artistName;
        name = _artistName;
        artist.intro = _intro;
        artist.picture = _picture;
        artist.cover = _cover;
        transferOwnership(_artist);
        songCounter = 0;
        symbol = "AUDIOPIUM";
    }

    function mint(uint256 _id) external payable {
        if (msg.sender != owner()) {
            uint256 amount = tokenPrice[_id];
            require(msg.value >= amount);
        }
        _mint(msg.sender, _id, 1, "");
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function setURI(string memory _uri, uint256 _price) external onlyOwner {
        tokenURI[songCounter] = _uri;
        tokenPrice[songCounter] = _price * 10e18;
        songCounter = songCounter + 1;
        emit URI(_uri, songCounter);
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }

    function setArtist(string memory _artistName) external onlyOwner {
        artist.artistName = _artistName;
    }

    function setIntro(string memory _intro) external onlyOwner {
        artist.intro = _intro;
    }

    function setProfilePicture(string memory _picture) external onlyOwner {
        artist.picture = _picture;
    }

    function setProfileCover(string memory _cover) external onlyOwner {
        artist.cover = _cover;
    }

    function getSongs() public view returns (string[] memory) {
        string[] memory allTokenURI = new string[](songCounter);
        for (uint256 i = 0; i < songCounter; i++) {
            allTokenURI[i] = tokenURI[i];
        }
        return allTokenURI;
    }

    function getPrices() public view returns (uint256[] memory) {
        uint256[] memory allPrices = new uint256[](songCounter);
        for (uint256 i = 0; i < songCounter; i++) {
            allPrices[i] = tokenPrice[i];
        }
        return allPrices;
    }

    function getArtist() public view returns (Artist memory) {
        return artist;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}
