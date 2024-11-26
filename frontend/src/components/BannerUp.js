import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { Link } from 'react-router-dom';



const Banner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //console.log(isAuthenticated); // imprime si el slice con authenticated 

  const handleLogout = (e) => {

    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold">E-System</h1>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <span className="text-sm font-medium">

            <button type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleLogout}>
              Logout
            </button>
          </span>

        ) : (

          <Link to="/home">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Home
            </button>
          </Link>

        )}

      </div>
    </div>
  );
};

export default Banner;

