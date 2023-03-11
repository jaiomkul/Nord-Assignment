import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [cameraStarted, setCameraStarted] = useState(false);

  const startCamera = useCallback(() => {
    setCameraStarted(true);
  }, [setCameraStarted]);

  const stopCamera = useCallback(() => {
    setCameraStarted(false);
  }, [setCameraStarted]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      {!cameraStarted ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            minScreenshotWidth={180}
            minScreenshotHeight={180}
          />
          <button onClick={capture}>Capture Photo</button>
          <button onClick={stopCamera}>Stop Camera</button>
          {imgSrc && <img src={imgSrc} alt="img" />}
        </>
      )}
    </>
  );
};
export default WebcamCapture;
