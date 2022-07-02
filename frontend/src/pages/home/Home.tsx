import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Homefeed from "../../components/homefeed/Homefeed";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Homefeed />
    </div>
  );
}
