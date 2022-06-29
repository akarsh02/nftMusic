import "./audioCard.css";
import { ethers } from "ethers";
import AudioContractABI from "../../utils/artist.json";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

type Props = {
  name: string;
  image: string;
  id: number;
  address: string;
  song: string;
  mode: "view" | "mint";
  handlePlayClick?: any;
};
export default function AudioCard({
  name,
  image,
  id,
  address,
  mode,
  song,
  handlePlayClick,
}: Props) {
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
            src={image || "https://i.imgur.com/POV3d3m.jpg"}
            className="audioCardImageFile min-w-full"
          />
        </div>
        <div className="audioCardText">
          <div className="audioCardTitle text-lg font-medium">{name}</div>
          <div className="audioCardButton bg-purple-500 hover:bg-purple-600 text-white max-w-fit p-2 px-4 rounded-lg mx-auto">
            {mode == "mint" && <button onClick={() => mint(id)}>Mint</button>}
            {mode == "view" && (
              <button onClick={() => handlePlayClick(id)}>
                <PlayCircleIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// https://i.imgur.com/POV3d3m.jpg
// https://i.imgur.com/RipoHLd.jpg
