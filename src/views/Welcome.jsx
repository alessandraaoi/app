import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Header2 from "../components/Header2";

function Welcome() {
  const [name, setName] = useState({}); // user

  const [anuncios, setAnuncios] = useState([]);

  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env;

  const navigate = useNavigate();

  const { _id } = useParams(); //userid

  const { idAnuncio } = useParams(); //idanuncio
  console.log("userid", _id);
  console.log("id anuncio:", idAnuncio);

  // función que se ejecuta al hacer click en el botón 'Update'
  const handleUpdateClick = (idAnuncio) => {
    navigate(`/edit/${idAnuncio}`);
  };

  // función que se ejecuta al hacer click en el botón 'Publica un nuevo anuncio'
  const publicaAnuncio = () => {
    navigate("/servicios");
  };

  // // función que se ejecuta al hacer click en el botón 'Contacta con xxx'
  const goContact = () => {
    navigate('/contacto')
  }

  useEffect(() => {
    axios
      .get(`${VITE_URL_EXPRESS_VERCEL}/user/${_id}`)
      .then(({ data }) => setName(data.nombre))
      .catch((error) => console.error(error));
    console.log("_id:", _id);
  }, [_id]); //el useEffect se ejecuta cada vez que cambia el valor de '_id'

  useEffect(() => {
    // Fetch anuncios desde el server con userId
    axios
      .get(`${VITE_URL_EXPRESS_VERCEL}/anuncios/${_id}`)
      .then((res) => setAnuncios(res.data))
      .catch((error) => console.error(error));
  }, []);

  // ELIMINAR ANUNCIO
  let eliminarAnuncio = async (idAnuncio) => {
    let options = { method: "DELETE" };

    let peticion = await fetch(
      `${VITE_URL_EXPRESS_VERCEL}/delete/${idAnuncio}`,
      options
    );
    let datos = await peticion.json();
    setAnuncios(datos);

    console.log("Usuario eliminado correctamente");
  };

  return (
    <>
      <Header2 />

      <div className="welcome__div">
        <h3 className="welcome__h3">
          {name ? `Bienvenido/a ${name}!` : "Login Error"}
        </h3>
        <h2 className="welcome__h2">
          {name ? `${name}, esta es tu area personal de usuario!` : ""}
        </h2>
        <h3 className="welcome__h2sub">
          En este espacio podrás gestionar tu tablón de anuncios y todo lo que
          compartes con la comunidad de Better Barter.
        </h3>

        <button className="welcome__button" onClick={publicaAnuncio}>
          Publica un nuevo anuncio
        </button>

        <div className="welcome__divCard">
          {anuncios.map((element) => {
            return (
              <div className="divCard__content">
                <p className="divCard__user">{`${name}`}</p>
                <p key={element.title} className="divCard__content__title">
                  {element.title}
                </p>
                <p
                  key={element.description}
                  className="divCard__content__description"
                >
                  {element.description}
                </p>

                <div className="div__divCard__button">
                  <button type="button" className="divCard__button" onClick={goContact}>
                    Contacta con {`${name}`}{" "}
                  </button>
                  <button
                    type="button"
                    className="divCard__button"
                    onClick={() => handleUpdateClick(element._id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="divCard__button"
                    onClick={() => eliminarAnuncio(element._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </>
  );
}

export default Welcome;
