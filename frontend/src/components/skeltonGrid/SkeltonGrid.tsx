import { Skeleton } from "@mui/material";
import "./skeltonGrid.css";

export default function SkeltonGrid() {
  return (
    <div className="profileFeedCards">
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
      <Skeleton variant="rectangular" className="rounded-lg m-2" height={250} />
    </div>
  );
}
