import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";
import { handlePictureSelection } from "./utils";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

export interface IProps {
  isEditable: boolean;
  preLoadedBlobPic?: string;
}

export const ProfilePicture: FunctionComponent<IProps> = ({
  isEditable,
  //   preLoadedBlobPic,
}) => {
  //TODO: Resolve preloaded picture and set it as default
  const [pic, setPic] = useState({
    preview: profilePicturePlaceholder,
    blob: "",
  });

  const pictureInputRef = useRef<HTMLInputElement>(null);

  const editPicture = () => pictureInputRef.current?.click();

  const removePicture = () => {
    setPic({
      preview: profilePicturePlaceholder,
      blob: "",
    });
    if (pictureInputRef.current) {
      pictureInputRef.current.value = "";
    }
  };

  return (
    <div className="profilePicture">
      <input
        id="profilePicture_input"
        ref={pictureInputRef}
        style={{ display: "none" }}
        disabled={!isEditable}
        type="file"
        onChange={handlePictureSelection(setPic)}
      />
      <div className="profilePicture_mask">
        <img src={pic.preview} alt="profilePicture" />
      </div>
      {isEditable && (
        <Fragment>
          <div className="profilePicture_removeIcon" onClick={removePicture}>
            <DeleteRoundedIcon fontSize="small" style={{ color: "white" }} />
          </div>
          <div className="profilePicture_editIcon" onClick={editPicture}>
            <EditRoundedIcon fontSize="small" style={{ color: "white" }} />
          </div>
        </Fragment>
      )}
    </div>
  );
};
