import { ethers } from "ethers";
import AudioContractABI from "../../utils/artist.json";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  image: string;
  id: number;
  address: string;
  profile: string;
  mode: "view" | "mint";
  handlePlayClick?: any;
};
export default function TrendingAudioCard({
  name,
  image,
  id,
  address,
  mode,
  profile,
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
    <div className="mx-auto">
      <Link to="/profile/0x2f23ca22e77ed6691aa4c945874d2d6eaf155a34">
        <div className=" bg-slate-200 hover:bg-slate-300 m-2 p-2 rounded-lg">
          <div className="">
            <img
              src={image || "https://i.imgur.com/POV3d3m.jpg"}
              className=" min-w-full"
            />
          </div>
          <div className="">
            <div className=" text-lg font-medium text-center">{name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// https://i.imgur.com/POV3d3m.jpg
// https://i.imgur.com/RipoHLd.jpg
