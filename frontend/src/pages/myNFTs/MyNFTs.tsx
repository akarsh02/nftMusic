import { useUser } from "../../context/userContext";
import { useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import AudioCard from "../../components/audioCard/AudioCard";
import "./myNFTs.css";

type Song = {
  name: string;
  description: string;
  image: string;
  song: string;
  id: number;
};

export default function MyNFTs() {
  const { userCTX } = useUser();
  const Web3Api = useMoralisWeb3Api();
  const [myNFTs, setMyNFTs] = useState<Song[]>();
  const [playSong, setPlaySong] = useState<number>();
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);

  const fetchNFTs = async () => {
    if (userCTX?.address) {
      const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
        chain: "mumbai",
        address: userCTX?.address,
      });

      const dataArray: Song[] = [];
      if (testnetNFTs.result) {
        for (let i = 0; i < testnetNFTs?.result?.length; i++) {
          if (testnetNFTs.result[i].metadata) {
            const data: any = testnetNFTs.result[i].token_uri?.slice(34, 93);
            const res: any = await fetch(
              "https://" + data + ".ipfs.dweb.link/metadata.json"
            )
              .then((response) => response.json())
              .then((data) => dataArray.push({ ...data, id: i }));
          }
        }
        setMyNFTs(dataArray);
      }
    }
  };

  useEffect(() => {
    const getData = fetchNFTs();
  }, []);

  const handlePlayClick = async (song: number) => {
    if (!myNFTs) {
      return;
    }
    const nowSong = myNFTs[song];
    console.log("Now Playing :", nowSong);
    const audio = new Audio(
      "https://" + nowSong.song.slice(7, 66) + ".ipfs.dweb.link/blob"
    );
    audio.play();
  };

  return (
    <div>
      <Topbar />

      <div className="mynftsContainer">
        <div className="mynftsBox">
          <div className="mynftsTitle">My NFTs</div>
          <div className="mynftsContent">
            {myNFTs &&
              myNFTs.map((s) => (
                <AudioCard
                  mode="view"
                  key={s.id}
                  id={s.id}
                  name={s.name}
                  address={""}
                  handlePlayClick={handlePlayClick}
                  image={
                    "https://" + s.image.slice(7, 66) + ".ipfs.dweb.link/blob"
                  }
                  song={
                    "https://" + s.song.slice(7, 66) + ".ipfs.dweb.link/blob"
                  }
                />
              ))}
          </div>
        </div>
      </div>
      {/* <PlayBar song={nowPlaying} /> */}
    </div>
  );
}
