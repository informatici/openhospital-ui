import { ChangeEvent, Dispatch, SetStateAction } from "react";

const createPreview = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;
  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > 180) {
      height = Math.round((height *= 180 / width));
      width = 180;
    }
  } else {
    if (height > 160) {
      width = Math.round((width *= 160 / height));
      height = 160;
    }
  }
  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.7); // get the data from canvas as 70% JPG
};

export const handlePictureSelection = (
  setPicture: Dispatch<
    SetStateAction<{
      preview: string;
      original: string;
    }>
  >, setShowError: React.Dispatch<React.SetStateAction<string>>, maxFileUpload: number
) => (e: ChangeEvent<HTMLInputElement>): void => {
  const newPic = e.target.files && e.target.files[0];
  if (getFileSize(newPic, maxFileUpload)) {
    if (newPic) {
      const dataURLReader = new FileReader();
      dataURLReader.onload = (e) => {
        const pictureURI = e.target?.result;
        if (typeof pictureURI === "string") {
          preprocessImage(setPicture, pictureURI);
        }
      };
      dataURLReader.readAsDataURL(newPic);
    }
  } else {
    setShowError("File is too big! (Max upload file is " + maxFileUpload / 1000 + " KB)");
    return;
  }
};

export const getFileSize = (file: File | null, maxFileUpload: number): boolean => (
  !file || file.size > maxFileUpload ? false : true
);

export const preprocessImage = (
  setPicture: Dispatch<
    SetStateAction<{
      preview: string;
      original: string;
    }>
  >,
  picture: string
): void => {
  let pictureURI = "";
  let pictureData = "";
  if (picture.includes("data:")) {
    pictureURI = picture;
    pictureData = picture.split(",")[1];
  } else {
    pictureURI = "data:image/jpeg;base64," + picture;
    pictureData = picture;
  }

  const image = new Image();
  image.src = pictureURI;

  image.onload = function () {
    const preview = createPreview(image);
    setPicture({ original: pictureData, preview });
  };
};
