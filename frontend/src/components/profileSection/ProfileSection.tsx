import "./profileSection.css";
import ProfileFeed from "../profileFeed/ProfileFeed";
import Create from "../create/Create";
import { ethers } from "ethers";
import AudioContractABI from "../../utils/artist.json";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { useParams } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import ContractABI from "../../utils/artist.json";

type Props = {
  feed: string;
  setFeed: any;
  address: string;
};

type ArtistDetails = {
  artistName: string;
  intro: string;
  picture: string;
  cover: string;
};

//0xa213a2B1Ed4fdC755317633F6cBa8eCbA9aB6625

export default function ProfileSection() {
  const [artistDetails, setArtistDetails] = useState<ArtistDetails>();
  const [showAsUser, setShowAsUser] = useState(false);
  const [profilepicLoad, setProfilepicLoad] = useState(false);
  const [coverpicLoad, setCoverpicLoad] = useState(false);

  const [artistContractAvailable, setArtistContractAvailable] =
    useState("loading");
  const [isOwner, setIsOwner] = useState(false);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const { userCTX } = useUser();
  const artistContractAddress = useParams().address;

  // useEffect(() => {
  //   if (userCTX?.address == artistAddress) {
  //     setShowAsUser(true);
  //   }
  // }, [userCTX, artistAddress]);
  // useEffect(() => {
  //   const getArtistDetails = async () => {
  //     try {
  //       const { ethereum } = window;

  //       if (ethereum) {
  //         const provider = new ethers.providers.Web3Provider(ethereum as any);
  //         const signer = provider.getSigner();
  //         const audioContract = new ethers.Contract(
  //           address,
  //           AudioContractABI.abi,
  //           signer
  //         );

  //         let artistDetails = await audioContract.getArtist();
  //         setArtistDetails(artistDetails);
  //       } else {
  //         console.log("Getting artist details failed");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getArtistDetails();
  // }, [address]);

  useEffect(() => {
    const getContractAddress = async (artistContractAddress: string) => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum as any);
          const signer = provider.getSigner();
          const audiopiumContract = new ethers.Contract(
            artistContractAddress,
            ContractABI.abi,
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

  return (
    <div className="profile">
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              style={coverpicLoad ? {} : { display: "none" }}
              src={"https://" + artistDetails?.cover + ".ipfs.dweb.link"}
              onLoad={() => setCoverpicLoad(true)}
              alt="Profile Cover"
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
              alt="Profile Picture"
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
              {"Audiopium contract " + address}
            </span> */}
          </div>
          {/* {isOwner && (
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
          )} */}

          {/* {feed === "profile" && <ProfileFeed address={address} />}
          {feed === "create" && <Create address={address} />} */}
        </div>
        <div className="profileRightBottom"></div>
      </div>
    </div>
  );
}
