import React, { useState, useEffect } from "react";
import { db } from "../../Configs/Firebase";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const WriteText = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save the text to Firestore
    await addDoc(collection(db, "messages"), {
      text: inputValue,
    });

    // Clear the input field
    setInputValue("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  useEffect(() => {
    // Fetch the messages from Firestore and display them in the frontend
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="bg-white px-6 py-8">
          <h2 className="text-gray-800 font-semibold text-2xl tracking-wide mb-2">
            Write Text
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="text"
              >
                Text
              </label>
              <input
                id="text"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Send
            </button>
          </form>
          <ul className="list-disc mt-4">
            {messages.map((message) => (
              <li
                key={message.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>{message.text}</span>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
