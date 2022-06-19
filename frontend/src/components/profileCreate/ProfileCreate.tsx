import "./profileCreate.css";
import { Link } from "react-router-dom";

export default function ProfileCreate() {
  return (
    <div className="profileCreateContainer">
      <div className="profileCreateBox">
        <div className="profileCreateTitle">Not created a profile yet?</div>
        <div className="profileCreateTitleSub">Create a profile here</div>
        <Link to="/createprofile">
          <button className="profileCreateButton">Create profile</button>
        </Link>
      </div>
    </div>
  );
}
