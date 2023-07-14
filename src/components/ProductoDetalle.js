import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductoDetalle.css';

const ProductoDetalle = () => {

    const {prodID} = useParams();
    const [ListadoProductos, setListadoProductos] = useState([]);

    useEffect(() => {
        fetch('https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos')
            .then((Listado) => Listado.json())
            .then((Listado) => { setListadoProductos(Listado) })
    }, [])

    const prodinfo = ListadoProductos.find(product => product.id === prodID)

    if (!prodinfo) {
        return (
            <div>
                <h1> No hay productos</h1>
            </div>
        )
    }
    
        return (
            <div className='contenedor'>
                <h1> {prodinfo.name}</h1>
                <h3> Categoria: {prodinfo.categoria} </h3>
                <img src={prodinfo.url}></img>
                <img src={prodinfo.url}></img>
                <img src={prodinfo.url}></img>
                <p> Precio: {prodinfo.precio} </p>
                <p> Año: {prodinfo.anio} </p>
            </div>
        )
      
}

export default ProductoDetalle