import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import ListCity from "../pages/list_city";
import ListComodity from "../pages/list_comodity";

const App = () => {
  axios.defaults.baseURL =
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="efishery/auth/login" element={<Login />} />
        <Route path="/efishery/" element={<Dashboard />}>
          <Route index path="list_comodity" element={<ListComodity />} />
          <Route path="list_city" element={<ListCity />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to="/efishery/list_comodity" replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
