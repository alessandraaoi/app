import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import OfreceServicio from '../views/OfreceServicio';

import Explora from '../views/Explora';
import Welcome from '../views/Welcome';


function Header2() {

    const navigate = useNavigate()

    const handleClick = () => {

        let local = localStorage.getItem('_id')
        navigate(`/welcome/${local}`)
    }

  return (
    <header className="header2">
      <h1 className="header2__title"><Link to = {'/'} className="header__link">Better Barter</Link></h1>
      <ul className="header2__list">
        <li className="header__listItem"><Link to = {'/explora'} element = {<Explora/>} className="header2__link">Explora</Link></li>

        {/* {localStorage.getItem('user')==null?     */}
        {/* <li className="header__listItem"><button className='header__button'><Link to = {'/login'} element = {<Login/>} className="header__link">INICIA SESIÓN</Link></button></li> */}
        
        <li className="header__listItem"><Link to = {'/servicios'} element = {<OfreceServicio/>} className="header__link">Ofrece un servicio</Link></li>
        {/* <li className="header2__listItem"><button className='header__button'><Link to = {'/welcome/:_id'} element = {<Welcome/>} className="header2__link">Area Personal</Link></button></li> */}
        <li className="header2__listItem"><button className='header__button' onClick = {handleClick}>Area Personal</button></li>
      </ul>
    </header>
  )
}

export default Header2

