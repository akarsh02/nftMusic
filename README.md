# Audiopium

### Publish your audio content to the web3.

Audiopium allows music artists to create NFTs that includes their audio creations as metadata. 
Artists can deploy ERC-1155 smart contract using the frontend and add audio tracks to the smart contract. Fans are able to buy music NFTs of their favourite artists and listen to them. 

![audiopium](https://i.ibb.co/XWG9sqp/audiopium.png)

Built using:
React, Solidity, Hardhat, NFT.storage , Moralis Web3 API

## Smart Contracts


- Audiopium contract


Audiopium smart contract deployes Artist contract and keep track of all artist contracts deployed.


- Artist contract


Artist contract is a ERC-1155 smart contract deployed by Audiopium contract. Each artist can have a seperate Artist contract. This contract stores details such as artist name and intro. Artists can add music tracks as tokenURIs. Fans can mint ERC-1155 NFTs that includes audio metadata.

![smart contracts](https://i.ibb.co/rmG3KKN/Untitled-Diagram-drawio-2.png)

Audiopium.sol contract allows to create a instance of Audio contract for each artist.

```solidity
// Audiopium.sol
function createArtistContract(
    string memory _name,
    string memory _intro,
    string memory _picture,
    string memory _cover
) public {
    ArtistContracts[msg.sender] = address(
        new Artist(_name, _intro, _picture, _cover, msg.sender)
    );
}
```

Artists can add metadata URI to their instance of Artist.sol contract
```solidity
// Artist.sol
function setURI(string memory _uri, uint256 _price) external onlyOwner {
    tokenURI[songCounter] = _uri;
    tokenPrice[songCounter] = _price * 10e18;
    songCounter = songCounter + 1;
    emit URI(_uri, songCounter);
}
```

Fans can mint audio NFT by interacting with Artist contract of their favourite artist
```solidity
// Artist.sol
function mint(uint256 _id) external payable {
    if (msg.sender != owner()) {
        uint256 amount = tokenPrice[_id];
        require(msg.value >= amount);
    }
    _mint(msg.sender, _id, 1, "");
}
```

Metadata uploaded to IPFS using NFT.storage
```typescript
// create.tsx
async function storeData() {
  const metadata = await client.store({
    name: songName,
    description: "Audiopium Music NFT",
    image: new Blob([songCover]),
    song: new Blob([songFile]),
  });
  return metadata.url;
}
```

Moralis Web3 API used to get available NFTs of a wallet
```typescript
// myNFTs.tsx
const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
  chain: "mumbai",
  address: userCTX?.address,
});
```

To run the app add .env to frontend folder with following values
```
REACT_APP_CONTRACT_ADDRESS = 0x1c6aBb29d7125973f6aEE6E165Dcf28E47755932
REACT_APP_API_KEY = REPLACE_WITH_NFT_STORAGE_API_KEY
REACT_APP_SERVER_URL = REPLACE_WITH_MORALIS_SERVER_URL
REACT_APP_APPID = REPLACE_WITH_MORALIS_SERVER_APPID
```

