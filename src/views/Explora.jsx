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

      <div className="community__div">
        <p className="community__p"> Explora </p>

        <ul>
          {anuncios.map((anuncio) => (
            <li key={anuncio._id}>
              <p>{anuncio.title}</p>
              <p>{anuncio.description}</p>
            </li>
          ))}
        </ul>

        {/* <p className='community__p'>{`${titulo}`}</p> */}
      </div>
    </>
  );
}

export default Explora;
