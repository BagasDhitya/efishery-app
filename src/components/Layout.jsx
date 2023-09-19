import React from "react";
import "../../src/styles/components/layout.scss";

const Layout = ({ children }) => {
  return <section className="container">{children}</section>;
};

export default Layout;
