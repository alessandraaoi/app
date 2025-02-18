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

      const config = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
      };

      await axios
        .post(`${VITE_URL_EXPRESS_VERCEL}/login`, User, config)
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
      <h3 className="register__h3">Bienvenido!</h3>
      <p className="register__p">
        Bienvenido/a a Better Barter, un espacio donde puedes
        conectarte para compartir con los demás lo que sabes hacer y aprender lo que quieres o necesitas.
        
        En Better Barter, cada habilidad tiene valor y todos tienen algo que aportar.
      </p>
      <h2 className="register__h2">Inicia sesión</h2>

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
          {loading ? "Cargando..." : "Login "}{" "}
        </button>
        <br />
      </form>
    </div>
  );
}

export default Login;
