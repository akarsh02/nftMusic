import AudioCard from "../audioCard/AudioCard";
import "./feedCard.css";

export default function FeedCard() {
  return (
    <div className="feedCardContainer">
      <div className="feedCardTitle">Trending 🚀</div>
      <div className="feedCardCards">
        <AudioCard
          mode="view"
          id={1}
          name={"Perfectly Imperfect"}
          address={""}
          image={"https://i.imgur.com/hFxlFhJ.png"}
          song={"https://ipfs.dweb.link/blob"}
        />
        <AudioCard
          mode="view"
          id={1}
          name={"Hello Summer"}
          address={""}
          image={"https://i.imgur.com/jhlv3V1.png"}
          song={"https://ipfs.dweb.link/blob"}
        />
        <AudioCard
          mode="view"
          id={1}
          name={"Party Time"}
          address={""}
          image={"https://i.imgur.com/P4hHD1D.png"}
          song={"https://ipfs.dweb.link/blob"}
        />
        <AudioCard
          mode="view"
          id={1}
          name={"Happy Day"}
          address={""}
          image={"https://i.imgur.com/CcPU9a7.png"}
          song={"https://ipfs.dweb.link/blob"}
        />
      </div>
    </div>
  );
}
