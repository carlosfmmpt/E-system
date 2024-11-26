import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  successMessage: null, // Para manejar mensajes de éxito
};

// Acción para obtener todos los empleados
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/employees');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Acción para agregar un nuevo empleado
export const addEmployee = createAsyncThunk('employees/addEmployee', async (newEmployee, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/employees', newEmployee);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Acción para actualizar un empleado
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (updatedEmployee, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/employees/${updatedEmployee.id}`, updatedEmployee);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Acción para eliminar un empleado
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        state.successMessage = 'Empleado agregado con éxito.';
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
          state.successMessage = 'Empleado actualizado con éxito.';
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
        state.successMessage = 'Empleado eliminado con éxito.';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exportamos las acciones y el reducer
export const { clearMessages } = employeesSlice.actions;
export default employeesSlice.reducer;
