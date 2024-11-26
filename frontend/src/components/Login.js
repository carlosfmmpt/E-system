import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);// Obtiene el error del AuthSlice


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, user } = response.data;

      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;
        dispatch({
          type: 'auth/setError', // Usar un tipo de acción en el slice para manejar el error
          payload: errorMessage
        });
      } else {
        dispatch({
          type: 'auth/setError',
          payload: 'Ha ocurrido un error en la conexión'
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              required="required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Ingresar
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>} {/* Mostrar el error */}
        </div>
    </div>
  );
};

export default Login;
