import "./createDraft.css";

export type draftAlbum = {
  name: string;
  image: string;
  address: string;
};

type props = {
  draftData: draftAlbum;
  setCreateDetails: React.Dispatch<React.SetStateAction<string | null>>;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

export default function CreateDraft({
  draftData,
  setCreateDetails,
  setShow,
}: props) {
  const handleOnClick = () => {
    setCreateDetails(draftData.address);
    setShow("new");
  };
  return (
    <div className="createDraftCard">
      <div className="draftCardImage">
        <div className="draftCardImageFile">
          <img src={draftData.image} className="draftCardImageFile" />
        </div>
      </div>
      <div className="draftCardDetails">
        <h1>{draftData.name}</h1>
        <div className="draftCardDetailsButtonRow">
          <button
            className="draftCardDetailsButton"
            onClick={() => handleOnClick()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
