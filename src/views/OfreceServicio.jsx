import React from "react";
import Header2 from "../components/Header2";
import { useRef, useState, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";

function OfreceServicio() {

  const navigate = useNavigate()

  const formularioPost = useRef();

  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env;

  const [anuncios, setAnuncios] = useState([]); 

  
  // al hacer click en el botón 'cancelar', vuelvo al área personal
  const goBack = () => {
    let local = localStorage.getItem("_id");
    navigate(`/welcome/${local}`);
  }

  let crearAnuncio = async (e) => {
    e.preventDefault();

    let userid = sessionStorage.getItem("_id");

    const { title, description, useridInput } = formularioPost.current;

    const nuevo = {
      title: title.value,
      description: description.value,
      userid: useridInput.value,
    };
    title.value = nuevo.title;
    description.value = nuevo.description;
    useridInput.value = nuevo.userid

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

    let options = { method: "GET" };

    let peticion = await fetch(
      `${VITE_URL_EXPRESS_VERCEL}/anuncios/${userid}`,
      options
    );
    let datos = await peticion.json();

    setAnuncios(datos);
  };

  useEffect(() => {
    getAnunciosById();
  }, [0]);

  const setLocalStorage = (_id) => {
    localStorage.setItem("idAnuncio", anuncios._id);
  };

  setLocalStorage();

  return (
    <>
      <Header2 />

      <div className="nuevoAnuncio__div">
        <h2 className="nuevoAnuncio__h2"> Publica un nuevo anuncio</h2>
    
        {/* ------------ FORM PARA AÑADIR ------- */}

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
            type="text"
            name="useridInput"
            placeholder={`${localStorage.getItem('_id')}`}
            value = {`${localStorage.getItem('_id')}`}
            className="formularioPost__input formularioPost__inputId"
          />

          <input
            type="submit"
            value="Publica un nuevo anuncio"
            className="formularioPost__submit"
          />

<button className="formularioPost__button" onClick={goBack}>Cancelar</button>
        </form>

        <h3 className="nuevoAnuncio__h3">Todos mis anuncios</h3>

        <ul className="nuevoAnuncio__list">
          {anuncios.map((anuncio) => (
            <li key={anuncio.title} className="nuevoAnuncio__listItem">
              {anuncio.title}, {anuncio.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OfreceServicio;
