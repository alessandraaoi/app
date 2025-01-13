import React from "react";
import Header2 from "../components/Header2";
import { useRef, useState, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";

function OfreceServicio() {
  const formularioPost = useRef();

  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env;

  // const userid = useParams

  // const navigate = useNavigate()

  const [anuncios, setAnuncios] = useState([]); // post

  const [anuncios2, setAnuncios2] = useState([]); //get

  let crearAnuncio = async (e) => {
    e.preventDefault();

    let userid = sessionStorage.getItem("_id");

    const { title, description } = formularioPost.current;

    const nuevo = {
      title: title.value,
      description: description.value,
      userid,
    };
    title.value = nuevo.title;
    description.value = nuevo.description;

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    };

    let peticion = await fetch(`${VITE_URL_EXPRESS_VERCEL}/anuncios`, options);
    let datos = await peticion.json();
    setAnuncios(datos);

    console.log("Nuevo anuncio creado correctamente");

    formularioPost.current.reset();
  };

  let getAnunciosById = async () => {
    // creo var para guardar los datos recuperados del localStorage
    
    let userid = localStorage.getItem("_id");

    // navigate(`/anuncios/${userid}`)

    let options = { method: "GET" };

    let peticion = await fetch(
      `${VITE_URL_EXPRESS_VERCEL}/anuncios/${userid}`,
      options
    );
    let datos = await peticion.json();

    setAnuncios2(datos);
  };

  useEffect(() => {
    getAnunciosById();
  });

  const setLocalStorage = (_id) => {
    localStorage.setItem("idAnuncio", anuncios._id);
  };

  setLocalStorage();

  return (
    <>
      <Header2 />

      <div className="servicio__div nuevoAnuncio__div">
        <h2 className="div__p nuevoAnuncio__h2"> Publica un nuevo anuncio </h2>
      </div>

      {/* ------------ FORM PARA AÑADIR ------- */}
      <div className="formularioPost__div">
        <form
          onSubmit={crearAnuncio}
          ref={formularioPost}
          className="formularioPost"
        >
          <input
            type="text"
            name="title"
            placeholder="Titulo"
            className="formularioPost__input"
          />
          <input
            type="text"
            name="description"
            placeholder="Descripcion"
            className="formularioPost__input"
          />
          <input
            type="submit"
            value="Publica un nuevo anuncio"
            className="formularioPost__submit"
          />
        </form>
      </div>

      <h3>Todos mis anuncios</h3>

      <ul>
        {anuncios2.map((anuncio2) => (
          <li key={anuncio2._id}>{anuncio2.title}</li>
        ))}
      </ul>
    </>
  );
}

export default OfreceServicio;
