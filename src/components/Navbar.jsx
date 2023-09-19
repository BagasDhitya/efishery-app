import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import "../styles/components/navbar.scss";

const Header = ({ page, username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="header">
      <div className="header-left">
        <p className="page-title">{page}</p>
      </div>
      <div className="header-right">
        <div className="user-name">
          <p>Hello, {username ? username : "John Doe"}</p>
        </div>
        <div
          className="dropdown-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <UserIcon className="user-icon" />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul className="menu-style">
              <li className="menu-item" onClick={() => handleLogout()}>
                Logout
              </li>
              <li className="menu-item" onClick={() => handleLogout()}>
                Setting
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
