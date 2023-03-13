import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { db, storage } from "../../Configs/Firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [useCamera, setUseCamera] = useState(false);

  const webcamRef = React.useRef(null);
  console.log(uploadedData);

  useEffect(() => {
    const imagesRef = collection(db, "images");
    const unsubscribe = onSnapshot(imagesRef, (querySnapshot) => {
      const images = [];
      querySnapshot.forEach((doc) => {
        images.push({
          id: doc.id,
          url: doc.data().url,
        });
      });
      setUploadedData(images);
    });

    return unsubscribe;
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowPreview(true);
    setShowSubmit(true);
    setUseCamera(false);
  }, [webcamRef]);

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
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

  const handleSubmit = async () => {
    // Convert the base64-encoded image to a binary format
    const blob = await fetch(image).then((r) => r.blob());

    // Get a reference to the storage location where the image will be uploaded
    const storageRef = ref(storage, "images/" + uuidv4() + ".jpg");

    try {
      // Upload the image to the storage location as a JPEG file
      const snapshot = await uploadBytes(storageRef, blob, {
        contentType: "image/jpeg",
      });

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save the download URL to the database
      const docRef = await addDoc(collection(db, "images"), {
        url: downloadURL,
      });

      // Update the uploadedData state with the new image data
      setUploadedData([...uploadedData, { id: docRef.id, url: downloadURL }]);

      alert("Upload successful!");

      // Reset the image state and hide the preview
      setImage(null);
      setShowPreview(false);
      setShowSubmit(false);

      // Clear the file input
      document.getElementById("file-input").value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center">
        {useCamera ? (
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Take a Photo</h1>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="border-2 border-gray-200 w-full h-auto"
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Choose a File</h1>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="border-2 border-gray-200 w-full h-auto p-4"
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Preview</h1>
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
          <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedData.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4"
                >
                  <img
                    src={data.url}
                    alt="Uploaded"
                    className="w-full h-auto object-contain mb-4"
                  />
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    View Full Size
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
