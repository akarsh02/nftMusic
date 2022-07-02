import "./profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ethers } from "ethers";
import Skeleton from "@mui/material/Skeleton";
import { useUser } from "../../context/userContext";
import Topbar from "../../components/topbar/Topbar";
import Create from "../../components/create/Create";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import BasicModal from "../../components/modal/Modal";
import ArtistContractABI from "../../utils/artist.json";
import AudiopiumContractABI from "../../utils/audiopium.json";

type ArtistDetails = {
  artistName: string;
  intro: string;
  picture: string;
  cover: string;
};

export default function Profile() {
  const [feed, setFeed] = useState("profile");
  const [artistDetails, setArtistDetails] = useState<ArtistDetails>();
  const [profilepicLoad, setProfilepicLoad] = useState(false);
  const [coverpicLoad, setCoverpicLoad] = useState(false);

  const [artistContractAvailable, setArtistContractAvailable] =
    useState("loading");
  const [isOwner, setIsOwner] = useState(false);

  const artistContractAddress = useParams().address;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const { userCTX } = useUser();

  useEffect(() => {
    const getContractAddress = async (artistContractAddress: string) => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum as any);
          const signer = provider.getSigner();
          const audiopiumContract = new ethers.Contract(
            artistContractAddress,
            ArtistContractABI.abi,
            signer
          );

          let res = await audiopiumContract.getArtist();
          console.log("Artist details :", res);
          if (res.length) {
            setArtistContractAvailable("true");
            setArtistDetails(res);
          }
        } else {
          setArtistContractAvailable("false");
        }
      } catch (error) {
        console.log("Artist contract not found");
        alert("Artist contract not found");
        setArtistContractAvailable("false");
      }
    };
    if (artistContractAddress) {
      getContractAddress(artistContractAddress);
    }
  }, [artistContractAddress]);

  const checkIfOwner = async (artistContractAddress: string) => {
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

        let res = await audiopiumContract.getArtistContract(userCTX?.address);
        console.log("Artist contract for", contractAddress, " :", res);
        if (res !== "0x0000000000000000000000000000000000000000") {
          setIsOwner(true);
        }
      }
    } catch (error) {
      console.log("Artist contract not found");
    }
  };

  useEffect(() => {
    if (artistContractAddress && artistContractAvailable === "true") {
      checkIfOwner(artistContractAddress);
    }
  }, [artistContractAvailable, userCTX?.address]);

  return (
    <div>
      <Topbar />
      {!userCTX?.address && <BasicModal />}
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                style={coverpicLoad ? {} : { display: "none" }}
                src={"https://" + artistDetails?.cover + ".ipfs.dweb.link"}
                onLoad={() => setCoverpicLoad(true)}
                alt="Cover"
              />
              {!coverpicLoad && (
                <Skeleton
                  variant="rectangular"
                  width={1000}
                  height={250}
                  className="skeltonRectangleCover"
                />
              )}
              <img
                className="profileUserImg"
                style={coverpicLoad ? {} : { display: "none" }}
                src={"https://" + artistDetails?.picture + ".ipfs.dweb.link"}
                alt="Profile"
              />
              {!profilepicLoad && (
                <Skeleton
                  variant="circular"
                  width={150}
                  height={150}
                  className="skeltonCircularProfilePicture"
                />
              )}
            </div>
            <div className="profileInfo">
              <div className="profileInfoName font-bold">
                {artistDetails?.artistName}
              </div>
              <span className="profileInfoDesc text-lg font-semibold">
                {artistDetails?.intro}
              </span>
              {/* <span className="profileInfoDesc">
                {"Audiopium contract " + artistContractAddress}
              </span> */}
            </div>
            {!artistDetails && (
              <div className="profileInfo">
                <Skeleton variant="text" className="skeltonTitle" />
                <Skeleton variant="text" className="skeltonIntro" />
              </div>
            )}
            {isOwner && (
              <div className="profileButtons pt-2">
                <button
                  className="profileButton"
                  onClick={() => setFeed("profile")}
                >
                  Profile
                </button>

                <button
                  className="profileButton"
                  onClick={() => setFeed("create")}
                >
                  Add New Song
                </button>
              </div>
            )}

            {feed === "profile" && artistContractAddress && (
              <ProfileFeed address={artistContractAddress} />
            )}
            {feed === "create" && artistContractAddress && (
              <Create address={artistContractAddress} />
            )}
          </div>
          <div className="profileRightBottom"></div>
        </div>
      </div>
    </div>
  );
}
