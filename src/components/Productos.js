import React, { useEffect, useState } from 'react';
import '../css/Productos.css'
import { Link, useNavigate } from 'react-router-dom';

const Productos = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoriaFiltro,setCategoriaFiltro] = useState('');
  const [cant,setCant] = useState(4);
  const [categorias, setCategorias] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCategorias();
  },[cant,paginaActual,categoriaFiltro]);

  const fetchData = () => {
    const startPagina = (paginaActual - 1 ) * cant;
    const endPagina = (startPagina + cant);
    var url = 'https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos';

    if(categoriaFiltro){
      url += `?categoria=${categoriaFiltro}`;   
    }

    fetch(url)
    .then((Listado) => Listado.json())
    .then((Listado) => { 
      const paginasData = Listado.slice(startPagina,endPagina);
      setProducts(paginasData);
      setTotalRegistros(Listado.length);
    })
  }

  const fetchCategorias = () => {
    fetch('https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos')
    .then((datos) => datos.json())
    .then((datos) => {
        const catUnicas = [...new Set(datos.map((prod) => prod.categoria))];
        setCategorias(catUnicas);
    })
  }

  const sigPagina = () => {
    setPaginaActual(paginaActual+1);
  }

  const antPagina = () => {
    setPaginaActual(paginaActual-1);
  }

  const editarProducto = (prodID) => {
    navigate(`/productos/editar/${prodID}`);
  }

  const deleteProducto = (prodID) => {
    fetch(`https://646e5db89c677e23218b94aa.mockapi.io/api/v1/productos/${prodID}`,{
      method: 'DELETE',
      headers: {'Content-type':'application/json'}
    })
    .then( respuesta => fetchData())
    .catch(error => {console.log(error)})
    .finally(() => {
      if(products.length === 1 && paginaActual > 1){
        setPaginaActual(paginaActual - 1);
      }
    })
  }  

  return (
    <div className='container1'>
      <h2> Listado de productos </h2>
      <div className='categoria'> Categoria:
      <select value={categoriaFiltro} onChange={(event) => setCategoriaFiltro(event.target.value)}>
        <option value=""> Todos </option>
        {categorias.map((cat, index) => (
            <option key={index} value={cat}> {cat}</option>
        ))}
      </select>
      Mostrar <select value={cant} onChange={(event) => setCant(event.target.value)}>
        <option value="4"> 4 </option>
        <option value="10"> 10 </option>
        <option value="15"> 15 </option>
        <option value="20"> 20 </option>
        <option value={totalRegistros}> Todos </option>
      </select>
      <br></br><br></br>
      </div>
      
      <div className='cardContainer1'>
        {products.map( prod => (
          <div key={prod.id} className='card1'>
            <h3><Link to={`/productos/${prod.id}`} className='enlace'>{prod.name}</Link></h3>             
            <img src={prod.url} width="50px" height="50px" className='imagen1'/>
            <p> ${prod.precio}</p>
            <button onClick={() => editarProducto(prod.id)}> Editar</button>
            <button onClick={() => deleteProducto(prod.id)}> Eliminar</button>
          </div>
        ) )}
      </div>
      <p>Pagina {paginaActual} de {Math.ceil(totalRegistros/cant)} </p>
      <button onClick={antPagina} disabled={paginaActual===1}> Anterior </button>
      <button onClick={sigPagina} disabled={paginaActual=== Math.ceil(totalRegistros/cant)}> Siguiente </button>
    </div>
  )
}

export default Productos