import React from "react";
import { getMessaging, getToken } from "firebase/messaging";
export const Notification = () => {
  const handleButtonClick = async () => {
    try {
      const messaging = getMessaging();
      const currentToken = await getToken(messaging);
      console.log("Current token:", currentToken);
      alert("Notification sent to yourself!");
    } catch (error) {
      console.error(error);
      alert("Failed to send notification!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <button
        onClick={handleButtonClick}
        className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Send Notification
      </button>
    </div>
  );
};
