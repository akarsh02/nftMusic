# Audiopium

### Publish your audio content to the web3.

Audiopium is a no-code smart contracts platform for music artists to create music NFTs. 
Artists can deploy ERC-1155 smart contract using the frontend and add audio tracks as tokens to the smart contract. Fans able to buy music NFTs of their favourite artists and listen to them. 

![audiopium](https://i.ibb.co/Z2zXgyt/audiopiumss.png)

Built using:
React, Solidity, Hardhat, NFT.storage , Moralis Web3 API

## Smart Contracts


- Audiopium contract


Audiopium smart contract deployes Artist contract and keep track of all artist contracts deployed.

Polygon Testnet - [0xfaa4AFdd8De9aA11203D04049AFBd691FCed7Ac9](https://mumbai.polygonscan.com/address/0xfaa4AFdd8De9aA11203D04049AFBd691FCed7Ac9)


- Artist contract


Artist contract is a ERC-1155 NFT smart contract that can be deployed by interacting with Audiopium contract. Each artist can have a seperate Artist contract. This contract stores details such as artist name and intro. Artists can add music tracks as tokenURIs. Fans can mint ERC-1155 NFTs that includes audio metadata.

Polygon Testnet - [0xa213a2B1Ed4fdC755317633F6cBa8eCbA9aB6625](https://mumbai.polygonscan.com/address/0xa213a2B1Ed4fdC755317633F6cBa8eCbA9aB6625)

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
function setURI(string memory _uri, uint256 _price) external onlyOwner 
    tokenURI[_songCounter.current()] = _uri;
    tokenPrice[_songCounter.current()] = _price * 10e18;
    _songCounter.increment();
    emit URI(_uri, _songCounter.current());
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
REACT_APP_CONTRACT_ADDRESS = 0xfaa4AFdd8De9aA11203D04049AFBd691FCed7Ac9
REACT_APP_API_KEY = REPLACE_WITH_NFT_STORAGE_API_KEY
REACT_APP_SERVER_URL = REPLACE_WITH_MORALIS_SERVER_URL
REACT_APP_APPID = REPLACE_WITH_MORALIS_SERVER_APPID
```

