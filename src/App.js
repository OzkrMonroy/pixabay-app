import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {
    consultarApi()
  }, [busqueda, paginaActual])

  const consultarApi = async () => {

    if(busqueda === '') return

    const imagePage = 30
    const key = '14245629-08abe8c6d5a8ec1d8c325a6a8'
    const url = `https://pixabay.com/api/?key=${key}&per_page=${imagePage}&q=${busqueda}&page=${paginaActual}`

    const consulta = await fetch(url)
    const respuesta = await consulta.json()

    // console.log(respuesta);
    guardarImagenes(respuesta.hits)

    // Cantidad de paginas para la paginacion
    const cantidadPaginas = Math.ceil(respuesta.totalHits / imagePage)
    guardarTotalPaginas(cantidadPaginas)

    // Creamos el effecto de scroll
    const jumbotron = document.querySelector('.jumbotron')
    jumbotron.scrollIntoView({behavior : 'smooth', block : 'end'})
    
  }

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual -1

    guardarPaginaActual(nuevaPaginaActual)
  }
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual +1

    guardarPaginaActual(nuevaPaginaActual) 
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
          guardarPaginaActual={guardarPaginaActual}/>
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}/>
      </div>
      {(paginaActual === 1 ) ? null : (
        <button onClick={paginaAnterior} className="btn btn-info mr-1">Anterior &laquo;</button>
      )}
      {(paginaActual === totalPaginas) ? null : (
        <button onClick={paginaSiguiente} className="btn btn-info">Siguiente &raquo;</button>
      )}
    </div>
  );
}

export default App;
