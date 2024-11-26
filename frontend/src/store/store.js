import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice'; // Asegúrate de importar correctamente
import employeesReducer from '../slices/employeesSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    auth: authReducer,
    register: registerReducer, // Aquí se configura el slice de registro
    
  },
});



export default store;
