import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    
    fetch('https://646e5db89c677e23218b94aa.mockapi.io/api/v1/Usuarios', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          navigate('/productos');
        } else {
          console.log("No hubo conexión");
        }
      })
  }

  return (
    <div className='container'>
      <div className='card'>
        <h2 className='text'>Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nombre de usuario'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className='input'
          />
          <input
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='input'
          />
          <button type='submit' className='button'> Ingresar </button>
        </form>
      </div>
    </div>
  )
}

export default Login