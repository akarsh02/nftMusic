import "./topbar.css";
import React, { useEffect } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useUser } from "../../context/userContext";
import AudiopiumContractABI from "../../utils/audiopium.json";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Topbar() {
  const [profileAvailable, setProfileAvailable] = React.useState("loading");
  const [artistContract, setArtistContract] = React.useState("");
  const { userCTX, connectWalletCTX } = useUser();

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

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

  const checkArtistContract = async () => {
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
        if (res == "0x0000000000000000000000000000000000000000") {
          setProfileAvailable("false");
        } else {
          setArtistContract(res);
          setProfileAvailable("true");
        }
      }
    } catch (error) {
      console.log("Artist contract not found");
    }
  };

  useEffect(() => {
    if (userCTX) {
      checkArtistContract();
    }
  }, [userCTX?.address]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Audiopium 🎶</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search artist address" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {userCTX && (
            <div>
              {profileAvailable === "true" && (
                <Link to={"/profile/" + artistContract}>
                  <span className="topbarLink">Profile</span>
                </Link>
              )}
              {profileAvailable === "false" && (
                <Link to={"/CreateProfile"}>
                  <span className="topbarLink">Create Profile</span>
                </Link>
              )}

              <Link to={"/mynfts"}>
                <span className="topbarLink">My NFTs</span>
              </Link>
            </div>
          )}
        </div>
        <div className="topbarConnect">
          {userCTX !== null ? (
            <button className="topbarConnectButton">{userCTX.address}</button>
          ) : (
            <button className="topbarConnectButton" onClick={connectWallet}>
              Connect Metamask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
