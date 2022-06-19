import { useState } from "react";
import { TextField, Input, Button } from "@mui/material";
import { ethers } from "ethers";
import { NFTStorage, File, Blob } from "nft.storage";
import AudioContractABI from "../../utils/audio.json";
import "./create.css";
import { apiKey } from "../../utils/constants";

export type draftAlbum = {
  name: string;
  image: string;
  address: string;
};

type Track = {
  id: number;
  name: string;
  file: string;
  cover: string;
  price: number;
};

type Props = {
  address: string;
};

export default function Create({ address }: Props) {
  const [songName, setSongName] = useState<string>("");
  const [songFile, setSongFile] = useState<any>();
  const [songCover, setSongCover] = useState<any>();
  const [songCoverView, setSongCoverView] = useState<any>();
  const [songPrice, setSongPrice] = useState<number>();
  const [publishState, setPublishState] = useState<string>("publish");

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSongCover(event.target.files[0]);
      setSongCoverView(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSongChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSongFile(event.target.files[0]);
    }
  };
  const client = new NFTStorage({
    token: apiKey,
  });

  async function storeData() {
    setPublishState("uploading");
    const metadata = await client.store({
      name: songName,
      description: "Audiopium Music NFT",
      image: new Blob([songCover]),
      song: new Blob([songFile]),
    });
    console.log("Metadata :" + metadata.url);
    return metadata.url;
  }

  const addToSmartContract = async (metadata: string) => {
    try {
      setPublishState("deploying");
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const audiopiumContract = new ethers.Contract(
          address,
          AudioContractABI.abi,
          signer
        );

        let audioContract = await audiopiumContract.setURI(metadata, songPrice);
        console.log("New song added: ", audioContract);
      } else {
        console.log("Adding new song failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadSong = async () => {
    const metadataCID = await storeData();
    const newSong = await addToSmartContract(metadataCID);
    setPublishState("completed");
  };

  return (
    <div className="createContainer">
      <div className="createNew"></div>
      <div className="createNewAlbumBox">
        <div className="createTitle">Add New Song</div>
        <div className="createAlbumDetails">
          <div className="createAlbumImage">
            <img
              id="target"
              src={songCoverView}
              className="CreateSongImageFile"
            />
          </div>
          <div className="createAlbumDetailsBox">
            <TextField
              id="outlined-basic"
              label="Song Name"
              variant="outlined"
              onChange={(e) => setSongName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Token Price"
              variant="outlined"
              onChange={(e) => setSongPrice(parseFloat(e.target.value))}
            />
            <input
              accept="audio/*"
              style={{ display: "none" }}
              id="raised-button-cover"
              multiple
              type="file"
              onChange={onSongChange}
            />
            <label htmlFor="raised-button-cover">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ height: "45px" }}
              >
                Select Song
              </Button>
            </label>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={onImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ height: "45px" }}
              >
                Select Cover Image
              </Button>
            </label>
          </div>
        </div>
        <div className="createAddNewTrack">
          {publishState == "publish" && (
            <button className="createAddNewTrackButton" onClick={uploadSong}>
              Publish Song
            </button>
          )}
          {publishState === "uploading" && <h3>Uploading data...</h3>}
          {publishState === "deploying" && <h3>Adding to smart contract...</h3>}
          {publishState === "completed" && <h3>Song added successfully!</h3>}
        </div>
      </div>
    </div>
  );
}
