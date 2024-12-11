import { useEffect, useState } from 'react'
import './App.css'


// Este componente hace un fetch a localhost:3000 y muestra el resultado en una etiqueta h1
function App() {

  // Import: variable de entorno
  const { VITE_URL_EXPRESS_VERCEL } = import.meta.env

  const [ datos , setDatos ] = useState(null)

  const fetchData = async () => {
    // Añadimos variable de entorno 
    // IMPORTANTE: CAMBIAR EN TODOS LOS LUGARES DONDE HAYAMOS ESCRITO LOCALHOST300
    const response = await fetch(`${VITE_URL_EXPRESS_VERCEL}`)
    const data = await response.json()
    setDatos(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>

        <h1>{datos}</h1>
        <h2>Otra</h2>    
    </>
  )
}

export default App
