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
        <h2 className="explora__h2__sub">
          ¿Sabes cocinar, diseñar, tocar un instrumento, o enseñar un idioma? ¿O
          tal vez estás buscando aprender algo nuevo? En Better Barter,
          puedes intercambiar tus habilidades directamente con otras personas,
          sin necesidad de dinero, solo talento, tiempo y pasión.
        </h2>
        <h2 className="explora__subtitulo">
          En este espacio encont los anuncios publicados por otros usuarios
        </h2>

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
