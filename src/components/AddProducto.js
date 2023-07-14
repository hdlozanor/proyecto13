import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProducto = () => {

    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        name: '',
        precio: '',
        url:'',
        categoria:''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(respuesta => { navigate('/productos'); })
    }

    const handleChange = (event) => {
        setDatos ({...datos, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <h2>Añadir Producto</h2>
            <form onSubmit={handleSubmit}>
                Nombre: <input type='text' name="name" value={datos.name} onChange={handleChange} /><br></br>
                Categoria: <input type='text' name="categoria" value={datos.categoria} onChange={handleChange} /><br></br>
                URL: <input type='text' name="url" value={datos.url} onChange={handleChange} /><br></br>
                Precio: <input type='text' name="precio" value={datos.precio} onChange={handleChange} /><br></br>
                <button type='submit'> Crear </button>
                <button onClick={() => navigate('/productos')}> Cancelar </button>
            </form>
        </div>
    )
}

export default AddProducto