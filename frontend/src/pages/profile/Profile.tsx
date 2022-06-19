import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import ProfileAlbums from "../../components/profileAlbums/ProfileAlbums";
import Create from "../../components/create/Create";
import ContractABI from "../../utils/audiopium.json";
import { ethers } from "ethers";
import ProfileSection from "../../components/profileSection/ProfileSection";
import ProfileCreate from "../../components/profileCreate/ProfileCreate";
import { contractAddress } from "../../utils/constants";

type ProfileStatus = "Loading" | "Profile" | "User";

export default function Profile() {
  const [audioContract, setAudioContract] = useState();
  const [feed, setFeed] = useState("profile");
  const address = useParams().address;
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const getContractAddress = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum as any);
          const signer = provider.getSigner();
          const audiopiumContract = new ethers.Contract(
            contractAddress,
            ContractABI.abi,
            signer
          );

          let audioContract = await audiopiumContract.getArtistContract(
            address
          );
          console.log("Artist contract :", audioContract);
          if (audioContract !== "0x0000000000000000000000000000000000000000") {
            setAudioContract(audioContract);
            setShowProfile(true);
          }
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContractAddress();
  }, [address]);

  return (
    <div>
      <Topbar />
      {showProfile && audioContract ? (
        <ProfileSection feed={feed} setFeed={setFeed} address={audioContract} />
      ) : (
        <ProfileCreate />
      )}
    </div>
  );
}
