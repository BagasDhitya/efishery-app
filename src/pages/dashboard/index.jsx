import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ListComodity from "../list_comodity";
import ListCity from "../list_city";

const Dashboard = () => {
  const path = window.location.href;
  const [page, setPage] = useState("");

  const getPage = () => {
    if (path.includes("list_comodity")) {
      setPage("List Comodity");
    } else if (path.includes("list_city")) {
      setPage("List City");
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "flex-row",
      }}
    >
      <div
        style={{
          width: "16.66667%",
          backgroundColor: "gray",
          position: "absolute",
          zIndex: 50,
        }}
      >
        <Sidebar />
      </div>
      <div style={{ width: "83.33333%" }}>
        <div style={{ position: "fixed", width: "100%", zIndex: 10 }}>
          <Navbar page={page} />
        </div>
        <div
          style={{
            margin: "auto",
            width: "100vh",
            height: "100vh",
          }}
        >
          {path.includes("list_comodity") ? (
            <ListComodity />
          ) : (
            path.includes("list_city") && <ListCity />
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
