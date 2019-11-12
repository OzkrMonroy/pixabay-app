import React from 'react';
import Imagen from './Imagen'

const ListadoImagenes = ({imagenes}) => {
  return ( 
    <div className="col-12 row">
      {imagenes.map((imagen, index) => (
        <Imagen
          key={index}
          imagen={imagen} />
      ))}
    </div>
   );
}
 
export default ListadoImagenes;