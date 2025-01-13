import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UpdateForm() {
  const formularioPut = useRef();

  const [anuncios, setAnuncios] = useState([]);

  const { idAnuncio } = useParams(); //idanuncio

  const navigate = useNavigate();

  // GET ANUNCIO POR ID (id anuncio)

  let getAnuncio = async () => {
    let options = {
      method: "GET",
    };

    let peticion = await fetch(
      `${VITE_URL_EXPRESS_VERCEL}/edit/${idAnuncio}`,
      options
    );
    let datos = await peticion.json();
    setAnuncios(datos);
  };

  useEffect(() => {
    getAnuncio();
  }, [anuncios._id]);

  useEffect(() => {
    localStorage.setItem("idAnuncio", anuncios._id);
    localStorage.setItem("title", anuncios.title);
    localStorage.setItem("description", anuncios.description);
  }, [anuncios._id]);

  let idParam = localStorage.getItem("idAnuncio");

  let idTitle = localStorage.getItem("title");

  let idDescription = localStorage.getItem("description");

  // ----- UPDATE PT 1, LEER ANUNCIO EN EL FORM (GET)-------
  let leerAnuncio = (idParam) => {
    const { _idAnuncio, title, description } = formularioPut.current;

    const nuevo = {
      idParams: _idAnuncio.value,
      idTitle: title.value,
      idDescription: description.value,
    };
    console.log("nuevo", nuevo);

    formularioPut.current.reset();
  };

  useEffect(() => {
    leerAnuncio(idParam);
  }, []);

  // ----- UPDATE PT 2, ENVIO DE DATOS ACTUALIZADOS DESDE EL FORM (PUT)-------

  // updateAnuncio: controlador de evento submit
  const updateAnuncio = async (e) => {
    e.preventDefault();

    const { _idAnuncio, title, description } = formularioPut.current;

    const nuevo = {
      _id: _idAnuncio.value,
      title: title.value,
      description: description.value,
    };

    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    };

    let peticion = await fetch(
      `${VITE_URL_EXPRESS_VERCEL}/edit/${idAnuncio}`,
      options
    );
    let datos = await peticion.json();
    setAnuncios(datos);

    console.log("idAnuncio", idAnuncio);
    console.log("idParams", idParam);

    formularioPut.current.reset();

    console.log("PUT OK");

    navigate(`/welcome/${localStorage.getItem("_id")}`);
  }

  return (
    <div className="updateForm__div">
      <h2 className="updateForm__h2">Update Anuncio</h2>

      {/* ------- FORM PARA ACTUALIZAR -------- */}
      <form onSubmit={updateAnuncio} ref={formularioPut} className="formularioPut">
        {/* <form> */}
        <input type="text" name="_idAnuncio" value={`${idParam}`} className="formularioPut__input"/>
        <input type="text" name="title" defaultValue={`${idTitle}`} className="formularioPut__input" />
        <input
          type="text"
          name="description"
          defaultValue={`${idDescription}`}
          className="formularioPut__input"
        />
        <input type="submit" value="Actualizar" className="formularioPut__submit"/>
      </form>
    </div>
  );
}

export default UpdateForm;
