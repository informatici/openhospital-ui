/**
 * Toggle fullscreen on DOM Element
 * @param element Element that will be shown in fs mode
 */
export async function toggleFullscreen(element: Element): Promise<void> {
  if (checkFullscreen()) {
    await document
      .exitFullscreen()
      .then(() => console.log("Document Exited from Full screen mode"))
      .catch((err) => console.error(err));
  } else {
    element.requestFullscreen();
  }
}

/**
 * Check if some element is displayed in fs mode
 * @returns Returns true if there's some element displayed is
 * fs mode. Returns false otherwise.
 */
export function checkFullscreen(): boolean {
  return document.fullscreenElement !== null;
}
