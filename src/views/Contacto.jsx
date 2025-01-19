import React from "react";
import { useNavigate } from "react-router-dom";

function Contacto() {
  const navigate = useNavigate();
  
  // al hacer click en el botón 'cancelar', vuelvo al área personal
  const goBack = () => {
    let _id = localStorage.getItem("_id");
    navigate(`/welcome/${_id}`);
  };

  return (
    <div className="contacto__div">
      <h2 className="contacto__h2">Formulario de contacto</h2>

      {/* ------- FORM CONTACTO -------- */}

      <form className="formularioContacto">
        
        <input
          type="text"
          name="correo"
          placeholder="Tu correo"
          className="formularioContact__input"
        />
        <input
          type="text"
          name="mensaje"
          placeholder="Tu mensaje"
          className="formularioContact__input"
        />

        <button className="formularioContact__button" onClick={goBack}>
          Envía mensaje
        </button>
        <button onClick={goBack} className="formularioContact__button__cancelar">Cancelar</button>
      </form>
    </div>
  );
}

export default Contacto;
