import { useState } from "react";
import { TextField, Input } from "@mui/material";
import "./trackCard.css";

type track = {
  id: number;
  name: string;
  file: string;
};

type props = {
  track: track;
  edit: boolean;
  setTracks: React.Dispatch<React.SetStateAction<track[]>>;
};

export default function TrackCard({ track, edit, setTracks }: props) {
  const [showEdit, setShowEdit] = useState(edit);

  return (
    <div className="createTrackCard">
      <div className="createTrackImage">
        <img
          src="https://i.imgur.com/POV3d3m.jpg"
          className="createTrackImageFile"
        ></img>
      </div>
      {showEdit ? (
        <div className="createTrackDetails">
          <TextField
            id="outlined-basic"
            label={track.name}
            variant="outlined"
            size="small"
            className="createTextfield"
          />
          <TextField
            id="outlined-basic"
            label="Track File"
            variant="outlined"
            size="small"
            className="createTextfield"
          />
          <div className="createTrackSave">
            <button
              className="createTrackSaveButton"
              onClick={() => setShowEdit(false)}
            >
              Save Track
            </button>
          </div>
        </div>
      ) : (
        <div className="createTrackDetails">
          <h2>{track.name}</h2>
          <div className="createTrackSave">
            <button
              className="createTrackSaveButton"
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
