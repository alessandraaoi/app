import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './views/Login'
import LoginError from './views/LoginError'
import Welcome from './views/Welcome'
import OfreceServicio from './views/OfreceServicio'

import './App.css'
import Explora from './views/Explora'
import UpdateForm from './views/UpdateForm'
import Contacto from './views/Contacto'


function App() {


  return (
    <BrowserRouter>
    <>

    <Routes>

    <Route path = '/' element = {<Login/>}/>
    <Route path = '/explora' element = {<Explora/>}/>
    <Route path = '/servicios' element = { <OfreceServicio/>} />
    <Route path = '/contacto' element = { <Contacto/>} />
    

    <Route path = '/loginError/:_id' element = {<LoginError/>} />
    <Route path = '/welcome/:_id' element = {<Welcome/>} />
    <Route path = '/anuncios/:userid' element = {<OfreceServicio/>}/>
    <Route path = '/edit/:idAnuncio' element = {<UpdateForm/>}/>

    </Routes>
      
    </>
    </BrowserRouter>
  )
}

export default App
