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
  >
) => (e: ChangeEvent<HTMLInputElement>) => {
  const newPic = e.target.files && e.target.files[0];
  if (newPic) {
    const arrayBufferReader = new FileReader();
    arrayBufferReader.readAsArrayBuffer(newPic);
    arrayBufferReader.onload = (e) => {
      const result = e.target?.result || "";
      const blob = new Blob([result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob); // and get it's URL

      const dataURLReader = new FileReader();
      dataURLReader.onload = (e) => {
        const originalBase64 = e.target?.result;
        preprocessImage(setPicture, blobURL, originalBase64 as string);
      };

      dataURLReader.readAsDataURL(newPic);
    };
  }
};

export const preprocessImage = (
  setPicture: Dispatch<
    SetStateAction<{
      preview: string;
      original: string;
    }>
  >,
  blobURL: string,
  originalBase64 = ""
) => {
  const image = new Image();
  image.src = blobURL;

  image.onload = function () {
    const preview = createPreview(image);
    setPicture({ original: originalBase64, preview });
  };
};
