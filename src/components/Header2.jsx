import React from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import OfreceServicio from "../views/OfreceServicio";
import Explora from "../views/Explora";

// Header2 se muestra cuando el usuario ha iniciado sesión
function Header2() {
  const navigate = useNavigate();

  const handleClick = () => {
    let local = localStorage.getItem("_id");
    navigate(`/welcome/${local}`);
  };

  const logOut = () => {
    navigate('/')
    localStorage.removeItem('_id', 'user')
  }

  return (
    <header className="header2">
      <h1 className="header2__title">
          Better Barter
      </h1>

      <ul className="header2__list">
        <li className="header__listItem">
          <Link to={"/explora"} element={<Explora />} className="header__link">
            Explora
          </Link>
        </li>

        <li className="header__listItem">
          <Link
            to={"/servicios"}
            element={<OfreceServicio />}
            className="header__link"
          >
            Ofrece un servicio
          </Link>
        </li>
        <li className="header2__listItem">
          <button className="header__button" onClick={handleClick}>
            Area Personal
          </button>
        </li>

        <li className="header2__listItem">
          <button className="logout__button" onClick={logOut}>
            Cierra sesión
          </button>
        </li>

      </ul>
    </header>
  );
}

export default Header2;
