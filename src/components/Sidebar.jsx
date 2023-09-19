import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import "../styles/components/sidebar.scss";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  const sidebarToggle = () => {
    setToggle(!toggle);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className={`sidebar ${toggle === true ? "active" : ""}`}>
      <div className="sidebar-toggle">
        <h2
          style={{ display: `${toggle === false ? "none" : ""}` }}
          onClick={() => navigateTo("/admin/")}
        >
          Dashboard
        </h2>
        <a className="sidebar-icon" onClick={() => sidebarToggle()}>
          <Bars3Icon color={"white"} width={24} height={24} />
        </a>
      </div>
      <nav className={`sidebar-nav`}>
        <ul>
          <li>
            <button onClick={() => navigateTo("/admin/list_kuisioner")}>
              List Comodity
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/admin/list_pasien")}>
              List City
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
