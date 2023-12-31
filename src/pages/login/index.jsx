import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Welcome, ${username}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#0d9488",
      }).then((res) => {
        if (res.isConfirmed) {
          Cookies.set("username", username);
          navigate("/efishery/list_comodity");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `Username/password cannot be empty`,
        confirmButtonText: "OK",
        confirmButtonColor: "#0d9488",
      });
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleLogin}
        style={{
          width: 250,
          height: 200,
          display: "flex",
          flexDirection: "column",
          rowGap: 35,
        }}
      >
        <Input
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="type your username here ..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="type your password here ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button id="login" type="submit" label="Login" />
      </form>
    </Layout>
  );
};

export default Login;
