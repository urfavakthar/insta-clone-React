import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const topMenu = [
  { id: "home", label: "Home", icon: "bi-house-door-fill", path: "/" },
  { id: "search", label: "Search", icon: "bi-search" },
  { id: "explore", label: "Explore", icon: "bi-compass" },
  { id: "reels", label: "Reels", icon: "bi-file-play-fill" },
  { id: "messages", label: "Messages", icon: "bi-send" },
  { id: "notifications", label: "Notifications", icon: "bi-heart" },
  { id: "create", label: "Create", icon: "bi-plus-lg" },
  { id: "profile", label: "Profile", icon: "bi-person-circle", path: "/profile" },
];

const bottomMenu = [
  { id: "threads", label: "Threads", icon: "bi-threads" },
  { id: "more", label: "More", icon: "bi-list" },
];

export default function Sidebar({ profile, followers }) {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActive(item.id);
    if (item.path) {
      navigate(item.path, { state: { profile, followers } });
    }
  };

  const renderMenu = (menu) =>
    menu.map((item) => (
      <div
        key={item.id}
        className={`sidebar-item ${active === item.id ? "active" : ""}`}
        onClick={() => handleClick(item)}
      >
        <i className={`bi ${item.icon}`}></i>
        <span>{item.label}</span>
      </div>
    ));

  return (
    <div className="sidebar position-fixed m-3">
      <img
        className="logo-text mb-4"
        src="./src/assets/instaTextimg.png"
        alt="Instagram"
      />

      <div className="d-flex flex-column gap-3">
        {renderMenu(topMenu)}
      </div>

      <div className="sidebar-bottom d-flex flex-column gap-3">
        {renderMenu(bottomMenu)}
      </div>
    </div>
  );
}
