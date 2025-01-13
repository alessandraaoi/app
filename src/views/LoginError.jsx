import React from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";

function LoginError() {
  const [searchParams, setSearchParams] = useSearchParams();

  const msg = searchParams.get("msg");
  console.log(msg);
  console.log(localStorage.getItem("user"));

  return (
    <>
      <Header />

      <div className="loginError__div">
        <h3 className="loginError__h3">Login Error:{msg}`</h3>
      </div>
    </>
  );
}

export default LoginError;
