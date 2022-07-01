import "./createProfile.css";
import Topbar from "../../components/topbar/Topbar";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { ethers } from "ethers";
import AudiopiumContractABI from "../../utils/audiopium.json";
import { NFTStorage, File, Blob } from "nft.storage";
import { Navigate, Link } from "react-router-dom";

type ArtistDetails = {
  name: string;
  intro: string;
  picture: string;
  cover: string;
};

export default function CreateProfile() {
  const [profilePicture, setProfilePicture] = useState<any>();
  const [profilePictureView, setProfilePictureView] = useState<any>();
  const [profilePictureCID, setProfilePictureCID] = useState<string>();
  const [profileCover, setProfileCover] = useState<any>();
  const [profileCoverView, setProfileCoverView] = useState<any>();
  const [profileCoverCID, setProfileCoverCID] = useState<string>();
  const [artistName, setArtistName] = useState<string>();
  const [artistIntro, setArtistIntro] = useState<string>();
  const [audioContract, setAudioContract] = useState();
  const [createStatus, setCreateStatus] = useState<string>();

  const { userCTX, connectWalletCTX } = useUser();

  const apiKey = process.env.REACT_APP_API_KEY;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const onProfilePictureChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
      setProfilePictureView(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onProfileCoverChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setProfileCover(event.target.files[0]);
      setProfileCoverView(URL.createObjectURL(event.target.files[0]));
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install Metamask Wallet");
        return;
      }

      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      if (accounts[0]) {
        connectWalletCTX({ address: accounts[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createArtist = async ({
    name,
    intro,
    picture,
    cover,
  }: ArtistDetails) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const audiopiumContract = new ethers.Contract(
          contractAddress,
          AudiopiumContractABI.abi,
          signer
        );

        let audioContract = await audiopiumContract.createArtistContract(
          name,
          intro,
          picture,
          cover
        );
        console.log("Artist contract created: ", audioContract.hash);
        return audioContract;
      } else {
        console.log("Artist ontract creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToIPFS = async (file: any) => {
    const storage = new NFTStorage({
      token: apiKey,
    });
    const cid = await storage.storeBlob(new Blob([file]));
    console.log({ cid });
    return cid;
  };

  const createProfile = async () => {
    setCreateStatus("uploading");
    if (artistName && artistIntro) {
      const picture = await uploadToIPFS(profilePicture);
      const cover = await uploadToIPFS(profileCover);
      const artistDetails = {
        name: artistName,
        intro: artistIntro,
        picture: picture,
        cover: cover,
      };
      console.log(artistDetails);
      setCreateStatus("deploying");
      const audioContract = await createArtist(artistDetails);
      setAudioContract(audioContract);
      setCreateStatus("completed");
    }
  };

  return (
    <div>
      <Topbar />
      {userCTX?.address ? (
        <div className="createProfileContainer">
          <div className="createProfileBox">
            <div className="createProfileTitle">Create Profile</div>
            <div className="createProfileTextField">
              <TextField
                id="outlined-basic"
                label="Artist Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
            <div className="createProfileTextField">
              <TextField
                id="outlined-basic"
                label="Artist Intro"
                variant="outlined"
                fullWidth
                onChange={(e) => setArtistIntro(e.target.value)}
              />
            </div>
            <div className="createProfileProfilePicture">
              <img
                src={profilePictureView || "https://i.imgur.com/ZplkjOn.jpg"}
              />
            </div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={onProfilePictureChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ height: "45px" }}
              >
                Select Profile Picture
              </Button>
            </label>
            <div className="createProfileCover">
              <img
                src={profileCoverView || "https://i.imgur.com/mUct0VU.jpg"}
              ></img>
            </div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-cover"
              multiple
              type="file"
              onChange={onProfileCoverChange}
            />
            <label htmlFor="raised-button-cover">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ height: "45px" }}
              >
                Select Profile Picture
              </Button>
            </label>
            <div className="createProfileSaveButton">
              {!createStatus && (
                <Button
                  variant="outlined"
                  component="span"
                  style={{ height: "45px" }}
                  onClick={createProfile}
                >
                  Create Profile
                </Button>
              )}
              {createStatus == "uploading" && <h3>Uploading data...</h3>}
              {createStatus == "deploying" && (
                <h3>Deploying smart contract...</h3>
              )}
              {createStatus == "completed" && (
                <div>
                  <h3>Profile created!</h3>
                  <Link to={"/profile/" + userCTX.address}>
                    <Button>Visit profile</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="createProfileConnect">
          <div className="createProfileTitle">Wallet not connected</div>
          <button className="createProfileButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
