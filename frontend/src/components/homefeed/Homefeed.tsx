import FeedCard from "../feedCard/FeedCard";
import "./homefeed.css";
export default function Homefeed() {
  return (
    <div className="homefeedContainer">
      <div className="homefeedBanner">
        <div className="homefeedTitle">Create With Audiopium 🎶</div>
        <div className="homefeedSubTitle">Audio NFT platform</div>
      </div>
      <FeedCard />
    </div>
  );
}
