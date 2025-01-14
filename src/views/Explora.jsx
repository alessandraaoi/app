import React from "react";
import Header2 from "../components/Header2";

import { useEffect } from "react";
import { useState } from "react";

function Explora() {
  const [anuncios, setAnuncios] = useState([]);

  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env;

  let getAnuncios = async () => {
    let options = { method: "GET" };

    let peticion = await fetch(`${VITE_URL_EXPRESS_VERCEL}/anuncios`, options);
    let datos = await peticion.json();
    console.log("FETCH OK");

    setAnuncios(datos);
  };

  useEffect(() => {
    getAnuncios();
  }, []);

  return (
    <>
      <Header2 />

      <div className="explora__div">
        <h2 className="explora__h2"> Explora tu comunidad! </h2>
        <h3 className="explora__h3">Explora los anuncios de todos los usuarios, seguramente puedan ayudarse mutuamente! </h3>

        <ul className="explora__list">
          {anuncios.map((anuncio) => (
            <li key={anuncio._id} className="explora__listItem">
              <p className="explora__listItemTitle">{anuncio.title}</p>
              <p className="explora__listItemText">{anuncio.description}</p>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default Explora;
