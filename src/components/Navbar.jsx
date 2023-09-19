import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import "../styles/components/navbar.scss";

const Header = ({ page }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const store = {
    username: Cookies.get("username"),
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah kamu ingin logout?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Logout",
      confirmButtonColor: "#004A7C",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("username");
        Swal.fire({
          title: "Sukses Logout",
          icon: "success",
          confirmButtonColor: "#004A7C",
        });
        navigate("/efishery/auth/login");
      }
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <p className="page-title">{page}</p>
      </div>
      <div className="header-right">
        <div className="user-name">
          {store.username ? (
            <p>Hello, {store.username}</p>
          ) : (
            <p>You have not logged in, sign in here</p>
          )}
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
