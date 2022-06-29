import "./topbar.css";
import React from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useUser } from "../../context/userContext";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Topbar() {
  const [account, setAccount] = React.useState(null);

  const { userCTX, connectWalletCTX } = useUser();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
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
              <Link to={"/profile/" + userCTX?.address}>
                <span className="topbarLink">Profile</span>
              </Link>
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
