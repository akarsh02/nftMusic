import { ethers } from "ethers";
import AudioContractABI from "../../utils/artist.json";
import { useEffect, useState } from "react";
import { StackTypeMap } from "@mui/material";
import AudioCard from "../../components/audioCard/AudioCard";
import { AudioFileOutlined } from "@mui/icons-material";
import "./profileFeed.css";

type Props = {
  address: string;
};

type Song = {
  name: string;
  description: string;
  image: string;
  song: string;
  id: number;
};

export default function ProfileFeed({ address }: Props) {
  const [metadataURIs, setMetadataURIs] = useState<string[]>();
  const [songData, setSongData] = useState<Song[] | null>(null);
  const getMetadata = async () => {
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

        let metadata = await audiopiumContract.getSongs();
        setMetadataURIs(metadata);
      } else {
        console.log("Receiving metadata failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    const viewMetadata = async () => {
      if (metadataURIs) {
        const dataArray: Song[] = [];
        for (let i = 0; i < metadataURIs?.length; i++) {
          let metadata = metadataURIs[i].slice(7, 66);
          const res: any = await fetch(
            "https://" + metadata + ".ipfs.dweb.link/metadata.json"
          )
            .then((response) => response.json())
            .then((data) => dataArray.push({ ...data, id: i }));
        }
        setSongData(dataArray);
      }
    };
    viewMetadata();
  }, [metadataURIs]);
  return (
    <div className="profileFeedContainer">
      <div className="profileFeedCards">
        {songData &&
          songData.map((s) => (
            <AudioCard
              mode="mint"
              key={s.id}
              id={s.id}
              name={s.name}
              address={address}
              image={"https://" + s.image.slice(7, 66) + ".ipfs.dweb.link/blob"}
              song={"https://" + s.song.slice(7, 66) + ".ipfs.dweb.link/blob"}
            />
          ))}
      </div>
    </div>
  );
}
