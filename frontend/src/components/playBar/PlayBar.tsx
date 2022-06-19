import "./playBar.css";
import React from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useUser } from "../../context/userContext";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

type Props = {
  song: Song | null;
};

type Song = {
  name: string;
  description: string;
  image: string;
  song: string;
  id: number;
};

export default function PlayBar({ song }: Props) {
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
    <div className="playbarContainer">
      <div className="playbarContent">
        <div className="playbarLeft">
          <div className="playbarSongTitle">{song?.name}</div>
        </div>
        <div className="playbarCenter">
          <div className="playbarPlayButton">
            <PlayCircleIcon className="playbarPlayButtonIcon" />
          </div>
        </div>
        <div className="playbarRight"></div>
      </div>
    </div>
  );
}
