import React, { useState } from "react";
import Webcam from "react-webcam";
import { db, storage } from "../../Configs/Firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref } from "firebase/storage";

export const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [useCamera, setUseCamera] = useState(false);

  const webcamRef = React.useRef(null);
  console.log(storage);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowPreview(true);
    setShowSubmit(true);
    setUseCamera(false);
  }, [webcamRef]);

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setShowPreview(true);
      setShowSubmit(true);
      setUseCamera(false);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setShowPreview(false);
    setShowSubmit(false);
    if (useCamera) {
      setUseCamera(true);
    } else {
      document.getElementById("file-input").value = "";
    }
  };

  const handleSubmit = () => {
    if (image) {
      const imageName = uuidv4();
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              db.collection("photos")
                .add({
                  url,
                })
                .then((docRef) => {
                  setUploadedData((prevData) => [
                    ...prevData,
                    { id: docRef.id, url: url },
                  ]);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {useCamera ? (
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Take a Photo</h1>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border-2 border-gray-200 w-full h-auto"
          />
          <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={capture}
            >
              Capture
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setUseCamera(false)}
            >
              Choose File
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Choose a File</h1>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="border-2 border-gray-200 w-full h-auto p-4"
          /> */}

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="border-2 border-gray-200 w-full h-auto p-4"
          />
          <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setUseCamera(true)}
            >
              Use Camera
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!showSubmit}
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Preview</h1>
          <img src={image} alt="Preview" className="w-full h-auto" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleRetake}
          >
            Retake/Clear
          </button>
        </div>
      )}

      {uploadedData.length > 0 && (
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Uploaded Files</h1>
          <div className="flex flex-wrap justify-start">
            {uploadedData.map((data) => (
              <div key={data.id} className="w-48 h-48 p-2">
                <img
                  src={data.url}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
