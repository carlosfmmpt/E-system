import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Acción asincrónica para registrar un usuario



export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al registrar usuario'
      );
    }
  }
);


// Slice
const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // Mensaje de error del backend o de la función rejectWithValue
      });
  },
});

// Exportar acciones y reducer
export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
