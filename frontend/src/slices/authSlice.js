import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!tokenFromStorage, // Verifica si el token existe
  user: null,
  token: tokenFromStorage || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated=true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      //console.log(action.payload);
      state.error = null; // Limpiar error al hacer logout
    },
    logout: (state) => {
      state.isAuthenticated=false;
      state.user = null;
      state.token = null;
      state.error = null; // Limpiar error al hacer logout
      localStorage.removeItem('token'); // Limpia el token

    },
    setError: (state, action) => {
      state.error = action.payload; // Establecer el mensaje de error
    },
    
  },
});

export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;



