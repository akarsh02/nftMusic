import "./audioCard.css";
import { ethers } from "ethers";
import { useState } from "react";
import AudioContractABI from "../../utils/artist.json";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useUser } from "../../context/userContext";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  name: string;
  image: string;
  id: number;
  token_id: string;
  address: string;
  song: string;
  mode: "view" | "mint";
  handlePlayClick?: any;
};
export default function AudioCard({
  name,
  image,
  id,
  token_id,
  address,
  mode,
  song,
  handlePlayClick,
}: Props) {
  const { userCTX } = useUser();
  const [picLoad, setPicLoad] = useState(false);
  const mint = async (id: number) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const audiopiumContract = new ethers.Contract(
          address,
          AudioContractABI.abi,
          signer
        );

        let audioContract = await audiopiumContract.mint(id);
        console.log("New NFT minted: ", audioContract.hash);
        return audioContract;
      } else {
        console.log("Artist ontract creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="audioCardContainer mx-auto">
      <div className="audioCardBox bg-slate-200 hover:bg-slate-300">
        <div className="audioCardImage">
          <img
            style={picLoad ? {} : { display: "none" }}
            src={image}
            className="audioCardImageFile min-w-full"
            onLoad={() => setPicLoad(true)}
          />
          {!picLoad && (
            <Skeleton variant="rectangular" className="min-w-full w-full" />
          )}
        </div>
        <div className="audioCardText">
          <div className="audioCardTitle text-lg font-medium">{name}</div>

          {userCTX?.address && mode === "mint" && (
            <div className="flex">
              <div className="audioCardButton bg-purple-500 hover:bg-purple-600 text-white max-w-fit p-2 px-4 rounded-lg mx-auto">
                <button onClick={() => mint(id)}>Mint</button>
              </div>
              <div className="audioCardButton bg-purple-500 hover:bg-purple-600 text-white max-w-fit p-2 px-4 rounded-lg mx-auto">
                <a
                  href={
                    "https://testnets.opensea.io/assets/mumbai/" +
                    address +
                    "/" +
                    token_id
                  }
                  target="_blank"
                >
                  <button>View</button>
                </a>
              </div>
            </div>
          )}
          {mode === "view" && (
            <div className="flex">
              <div className="audioCardButton bg-purple-500 hover:bg-purple-600 text-white max-w-fit p-2 px-4 rounded-lg mx-auto">
                <button onClick={() => mint(id)}>
                  <PlayCircleIcon />
                </button>
              </div>
              <div className="audioCardButton bg-purple-500 hover:bg-purple-600 text-white max-w-fit p-2 px-4 rounded-lg mx-auto">
                <a
                  href={
                    "https://testnets.opensea.io/assets/mumbai/" +
                    address +
                    "/" +
                    token_id
                  }
                  target="_blank"
                >
                  <button>View</button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// https://i.imgur.com/POV3d3m.jpg
// https://i.imgur.com/RipoHLd.jpg
