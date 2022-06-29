import FeedCard from "../feedCard/FeedCard";
import "./homefeed.css";
export default function Homefeed() {
  return (
    <div className="homefeedContainer">
      <div className="homefeedBanner">
        <div className="pt-4">
          <div className="homefeedTitle">Create With Audiopium 🎶</div>
          <div className="homefeedSubTitle">Audio NFT platform</div>
        </div>
        <div className="flex">
          <div className="flex-1 p-4 text-center text-2xl text-white my-10">
            <div className="font-medium">For artists</div>
            <div className="">Create audio NFTs</div>
          </div>
          <div className="flex-1 p-4 text-center text-2xl text-white my-10">
            <div className="font-medium">For fans</div>
            <div className="">Own audio NFTs</div>
          </div>
        </div>
      </div>
      <FeedCard />
    </div>
  );
}
