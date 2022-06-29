import "./profileSection.css";
import ProfileFeed from "../profileFeed/ProfileFeed";
import Create from "../create/Create";
import { ethers } from "ethers";
import AudioContractABI from "../../utils/artist.json";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { useParams } from "react-router";

type Props = {
  feed: string;
  setFeed: any;
  address: string;
};

type ArtistDetails = {
  name: string;
  intro: string;
  picture: string;
  cover: string;
};
export default function ProfileSection({ feed, setFeed, address }: Props) {
  const [artistDetails, setArtistDetails] = useState<ArtistDetails>();
  const [showAsUser, setShowAsUser] = useState(false);

  const { userCTX } = useUser();
  const artistAddress = useParams().address;

  useEffect(() => {
    if (userCTX?.address == artistAddress) {
      setShowAsUser(true);
    }
  }, [userCTX, artistAddress]);
  useEffect(() => {
    const getArtistDetails = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum as any);
          const signer = provider.getSigner();
          const audioContract = new ethers.Contract(
            address,
            AudioContractABI.abi,
            signer
          );

          let artistDetails = await audioContract.getArtist();
          setArtistDetails(artistDetails);
        } else {
          console.log("Getting artist details failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getArtistDetails();
  }, [address]);

  return (
    <div className="profile">
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={
                "https://" + artistDetails?.cover + ".ipfs.dweb.link" ||
                "https://i.imgur.com/mUct0VU.jpg"
              }
              alt=""
            />
            <img
              className="profileUserImg"
              src={
                "https://" + artistDetails?.picture + ".ipfs.dweb.link" ||
                "https://i.imgur.com/mUct0VU.jpg"
              }
              alt=""
            />
          </div>
          <div className="profileInfo">
            <div className="profileInfoName font-bold">
              {artistDetails?.name}
            </div>
            <span className="profileInfoDesc text-lg font-semibold">
              {artistDetails?.intro}
            </span>
            <span className="profileInfoDesc">
              {"Audiopium contract " + address}
            </span>
          </div>
          {showAsUser && (
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

          {feed === "profile" && <ProfileFeed address={address} />}
          {feed === "create" && <Create address={address} />}
        </div>
        <div className="profileRightBottom"></div>
      </div>
    </div>
  );
}
