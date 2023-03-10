import React from "react";
import { Link } from "react-router-dom";

const navData = [
  { title: "Auth", to: "/" },
  { title: "Notification", to: "/notification" },
  { title: "Upload Photo", to: "/upload" },
  { title: "Write Text", to: "/write" },
  { title: "Calculator", to: "/calculator" },
];

export const Navbar = () => {
  return (
    <div className="text-center">
      <ul>
        <li>
          {navData.map((e) => (
            <Link key={e.title} to={e.to} className="navLink">
              {e.title}
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
};
