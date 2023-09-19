import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import ListCity from "../pages/list_city";
import ListComodity from "../pages/list_comodity";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="efishery/auth/login" element={<Login />} />
        <Route path="/efishery/" element={<Dashboard />}>
          <Route path="list_comodity" element={<ListComodity />} />
          <Route path="list_city" element={<ListCity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
