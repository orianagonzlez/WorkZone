import React, { useState } from "react";
import { RiScreenshot2Fill } from "react-icons/ri";

export const TakeScreenShot = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState([]);

  const canIRun = navigator.mediaDevices.getDisplayMedia;

  const takeScreenShot = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();
    track.stop();

    const canvas = document.getElementById("fake");

    // this could be a document.createElement('canvas') if you want
    // draw weird image type to canvas so we can get a useful image
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
    const image = canvas.toDataURL();

    // this turns the base 64 string to a [File] object
    const res = await fetch(image);
    const buff = await res.arrayBuffer();

    // clone so we can rename, and put into array for easy proccessing
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, {
        type: "image/jpeg",
      }),
    ];
    // return file
    setImageUrl(res.url);
    setImageFile(file)
    console.log(imageFile)
    return file;
  };

  // const button = document.getElementById('cake').onClick = () => canIRun ? takeScreenShot() : {}

  return (
    <div>
      <button className="btn-create" onClick={() => (canIRun ? takeScreenShot() : {})}>
        <RiScreenshot2Fill size={25}/> Tomar Captura 
      </button>
      <a href={imageUrl}>
        <canvas style={{ width: "0px", height: "0px" }} id="fake"></canvas>
      </a>

    {/* <div>{imageFile[0].name}</div> */}
    </div>
  );
};
