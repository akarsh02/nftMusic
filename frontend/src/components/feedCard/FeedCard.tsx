import TrendingAudioCard from "../trendingAudioCard/TrendingAudioCard";
import "./feedCard.css";

export default function FeedCard() {
  return (
    <div className="feedCardContainer">
      <div className="feedCardTitle">Trending 🚀</div>
      <div className="feedCardCards">
        <TrendingAudioCard
          mode="view"
          id={1}
          name={"Snoopy"}
          address={""}
          image={"https://i.imgur.com/gX0mcjl.jpeg"}
          profile={"https://ipfs.dweb.link/blob"}
        />
        <TrendingAudioCard
          mode="view"
          id={1}
          name={"Jane Doe"}
          address={""}
          image={"https://i.imgur.com/sLIOWdu.jpeg"}
          profile={"https://ipfs.dweb.link/blob"}
        />
        <TrendingAudioCard
          mode="view"
          id={1}
          name={"Retro Moon"}
          address={""}
          image={"https://i.imgur.com/LG6wyFM.jpeg"}
          profile={"https://ipfs.dweb.link/blob"}
        />

        <TrendingAudioCard
          mode="view"
          id={1}
          name={"DJ Squid"}
          address={""}
          image={"https://i.imgur.com/sJsFdUB.jpeg"}
          profile={"https://ipfs.dweb.link/blob"}
        />
      </div>
    </div>
  );
}
