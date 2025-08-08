export const downloadBlob = (blob: Blob, filename: string) => {
  const a = document.createElement("a");
  const blobURL = URL.createObjectURL(blob);
  a.href = blobURL;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(blobURL), 3000);
};
