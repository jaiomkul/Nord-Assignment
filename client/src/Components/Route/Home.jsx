import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "../Auth/SignIn";
import { SingUp } from "../Auth/SingUp";
import Calculator from "../Calculator/Calculator";
import { Navbar } from "../Navigation/Navbar";
import { Notification } from "../Notification/Notification";
import { UploadPhoto } from "../UploadPhoto/UploadPhoto";
import { WriteText } from "../WriteText/WriteText";

export const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="">
        {" "}
        <Routes>
          <Route path="/" element={<SingUp />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/upload" element={<UploadPhoto />}></Route>
          <Route path="/write" element={<WriteText />}></Route>
          <Route path="/calculator" element={<Calculator />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
        </Routes>
      </div>
    </div>
  );
};
