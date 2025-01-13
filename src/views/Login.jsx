// LOGIN

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    correo: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { correo, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== "" && correo !== "") {
      const User = {
        correo,
        password,
      };

      setLoading(true);
      await axios
        .post(`${VITE_URL_EXPRESS_VERCEL}/login`, User)
        .then(({ data }) => {
          setMensaje(data.mensaje);
          setInputs({ correo: "", password: "" });
          setTimeout(() => {
            if (data?.user._id === "NOTFOUND") {
              localStorage.removeItem("user");
              localStorage.removeItem("_id");
              navigate(`/loginError/${data?.user._id}?msg=${data.mensaje}`);
            } else {
              setMensaje("");
              console.log("Guardo en localstorage ", data.user.nombre);
              localStorage.setItem("user", data.user.nombre);
              localStorage.setItem("_id", data.user._id);
              navigate(`/welcome/${data?.user._id}`);
            }
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setMensaje("Error");
        });

      setLoading(false);
    }
  };

  return (
    <div className="register__div">
      <h3 className="register__h3">Tienes ya una cuenta?</h3>
      <h2 className="register__h2">Login:</h2>

      <form
        action=""
        method="POST"
        className="register__form"
        onSubmit={onSubmit}
      >
        <label htmlFor="correo" className="register__formLabel">
          Correo:{" "}
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo..."
          value={correo}
          className="register__formInput"
          onChange={onChange}
        />

        <label htmlFor="password" className="register__formLabel">
          Password:{" "}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password..."
          value={password}
          className="register__formInput"
          onChange={onChange}
        />

        <button type="submit" className="register__formButton">
          {loading ? "Cargando..." : "Login! "}{" "}
        </button>
        <br />
        <p className="register__p">No tienes una cuenta?</p>
        <b
          onClick={() => {
            navigate("/home");
          }}
          className="register__iniciaSesion"
        >
          Registrate!
        </b>
      </form>
    </div>
  );
}

export default Login;
