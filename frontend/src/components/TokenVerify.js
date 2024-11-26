import { loginSuccess } from '../slices/authSlice';



export const initializeAuth = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        dispatch(loginSuccess({ token, user }));
      } catch (error) {
        dispatch(logout());
        localStorage.removeItem('token');
      }
    }
  };
  