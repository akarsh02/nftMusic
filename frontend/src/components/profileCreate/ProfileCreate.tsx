import "./profileCreate.css";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProfileCreate() {
  return (
    <div className="profile">
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <Skeleton
              variant="rectangular"
              width={1000}
              height={250}
              className="skeltonRectangleCover"
            />
            <Skeleton
              variant="circular"
              width={150}
              height={150}
              className="skeltonCircularProfilePicture"
            />
          </div>
          <div className="profileInfo">
            <Skeleton variant="text" className="skeltonTitle" />
            <Skeleton variant="text" className="skeltonIntro" />
          </div>
        </div>
        <div className="profileRightBottom">
          <h1>Do not have a profile yet?</h1>
          <Link to="/create">
            <button className="profileButton">Create Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
