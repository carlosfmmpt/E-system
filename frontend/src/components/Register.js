import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '../slices/registerSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado del slice de registro
  const { loading, success, error } = useSelector((state) => state.register);

  // Redirigir después de un registro exitoso
  useEffect(() => {
    if (success) {
      alert('¡Registro exitoso!');
      dispatch(resetState()); // Reinicia el estado después del registro
      dispatch(logout());
      navigate('/login'); // Redirige al login
    }
  }, [success, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Por favor, completa todos los campos component.');
      return;
    }
    dispatch(resetState());
    dispatch(registerUser({ username, password }));
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Registro de Usuario</h1>
        {loading && <p>Registrando...</p>}
        <form onSubmit={handleRegister} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Usuario</label>
            <input
              type="email"
              required="required"
              placeholder="Email"
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
            Registrar
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}


      </div>
    </div>
  );
};

export default Register;
