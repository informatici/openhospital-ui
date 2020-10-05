import React, { FunctionComponent, useRef, useState } from "react";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";
import { handlePictureSelection } from "./utils";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

export interface IProps {
  isEditable: boolean;
  preLoadedBlobPic?: string;
}

export const ProfilePicture: FunctionComponent<IProps> = ({
  isEditable,
  //   preLoadedBlobPic,
}) => {
  const pictureInputRef = useRef<HTMLInputElement>(null);

  const performFileInputClick = () => pictureInputRef.current?.click();

  //TODO: Resolve preloaded picture and set it as default

  const [pic, setPic] = useState({
    preview: profilePicturePlaceholder,
    blob: "",
  });

  return (
    <div className="profilePicture">
      <input
        ref={pictureInputRef}
        style={{ display: "none" }}
        disabled={!isEditable}
        type="file"
        onChange={handlePictureSelection(setPic)}
      />
      <div className="profilePicture_mask">
        <img
          src={pic.preview}
          alt="profilePicture"
          onClick={performFileInputClick}
        />
      </div>
      {isEditable && (
        <div
          className="profilePicture_editIcon"
          onClick={performFileInputClick}
        >
          <EditRoundedIcon fontSize="small" style={{ color: "white" }} />
        </div>
      )}
    </div>
  );
};
