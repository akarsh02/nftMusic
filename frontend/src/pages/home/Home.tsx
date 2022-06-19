import Topbar from "../../components/topbar/Topbar";
import Homefeed from "../../components/homefeed/Homefeed";
import "./home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Homefeed />
    </div>
  );
}
