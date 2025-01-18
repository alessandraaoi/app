import React from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// Componente que se muestra al haber un error en el login

function LoginError() {

  const navigate = useNavigate()

  const goLogin = () => {
    navigate('/')
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const msg = searchParams.get("msg");

  // leer el mensaje de error en consola
  console.log(msg);

  console.log(localStorage.getItem("user"));


  return (
    <>

      <div className="loginError__div">
        <h3 className="loginError__h3">Login Error: {msg}</h3>
        <button className= 'loginError__button' onClick = {goLogin}>Login</button>
      </div>
    </>
  );
}

export default LoginError;
