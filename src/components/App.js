import { Link, Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Login from './Login';
import Productos from './Productos';
import ProductoDetalle from './ProductoDetalle';
import EditarProducto from './EditarProducto';
import AddProducto from './AddProducto';
import { inject } from '@vercel/analytics';

function App() {

  inject();
  
  return (
    <div>
      <nav className='menu'>
        <Link to='/'>Inicio</Link>
        <Link to='/productos'>Productos</Link>
        <Link to='/add'> Añadir </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/add" element={<AddProducto />}></Route>
        <Route path="/productos" element={<Productos />}></Route>
        <Route path="/productos/:prodID" element={<ProductoDetalle />}></Route>
        <Route path="/productos/editar/:prodID" element={<EditarProducto />}></Route>
      </Routes>
    </div>
  );
}

export default App;
