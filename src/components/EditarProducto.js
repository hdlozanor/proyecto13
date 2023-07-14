import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditarProducto = () => {

    const { prodID } = useParams();
    const navigate = useNavigate();
    const [datos, setDatos] = useState({});

    useEffect(() => {
        fetch(`https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos/${prodID}`)
            .then((Producto) => Producto.json())
            .then((Producto) => { setDatos(Producto) })
    }, [prodID])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos/${prodID}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(datos)
        })
            .then(respuesta => { navigate('/productos'); })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(antDatos => ({ ...antDatos, [name]: value }));
    }

    return (
        <div>
            <h2>EditarProducto</h2>
            <form onSubmit={handleSubmit}>
                Nombre: <input type='text' name="name" value={datos.name || ''} onChange={handleChange} /><br></br>
                Categoria: <input type='text' name="categoria" value={datos.categoria || ''} onChange={handleChange} /><br></br>
                URL: <input type='text' name="url" value={datos.url || ''} onChange={handleChange} /><br></br>
                Precio: <input type='text' name="precio" value={datos.precio || ''} onChange={handleChange} /><br></br>
                <button type='submit'> Actualizar </button>
                <button onClick={() => navigate('/productos')}> Cancelar </button>
            </form>
        </div>
    )
}

export default EditarProducto