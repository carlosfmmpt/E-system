import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../slices/employeesSlice';

const EmployeeRegistration = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees);
  const status = useSelector(state => state.employees.status);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [showModal, setShowModal] = useState(false); // Para controlar la visibilidad del modal
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Almacena el empleado que se quiere eliminar
  const [error, setError] = useState(''); // Almacena el mensaje de error de validación
  const [formError, setFormError] = useState(''); // Almacena el mensaje de error de formulario general


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  // Validación del email con expresión regular
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  // Validar si el email ya existe
  const isEmailDuplicate = (email) => {
    return employees.some(emp => emp.email.toLowerCase() === email.toLowerCase());
  };

  const handleAddEmployee = () => {
    if (!name || !position || !salary || !email) {
      setFormError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isEmailDuplicate(email)) {
      setError('This email is already registered.');
      return;
    }

    setError('');
    setFormError('');
    dispatch(addEmployee({ name, position, salary, email }));
    setName('');
    setPosition('');
    setSalary('');
    setEmail('');
  };

  const handleEditEmployee = (emp) => {
    setName(emp.name);
    setPosition(emp.position);
    setSalary(emp.salary);
    setEmail(emp.email);
    setEditId(emp.id);
  };

  const handleUpdateEmployee = () => {
    if (!name || !position || !salary || !email) {
      setFormError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }


    setError('');
    dispatch(updateEmployee({ id: editId, name, position, salary, email }))
      .then(() => {
        dispatch(fetchEmployees());
        setName('');
        setPosition('');
        setSalary('');
        setEmail('');
        setEditId(null);
      })
      .catch((error) => {
        console.error('Error updating employee', error);
      });
  };

  // Función que abre el modal de confirmación
  const handleConfirmDelete = (emp) => {
    setEmployeeToDelete(emp);
    setShowModal(true);
  };

  // Función que cierra el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEmployeeToDelete(null);
  };

  // Función que elimina el empleado
  const handleDeleteEmployee = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete.id));
      setShowModal(false);
      setEmployeeToDelete(null);
    }
  };

  // Filtrar empleados basándose en el texto de búsqueda
  const filteredEmployees = employees.filter((emp) => {
    const searchLower = searchText.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchLower) ||
      emp.email.toLowerCase().includes(searchLower) ||
      emp.position.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <br />
      {/* Alert Section for Errors */}
      {(formError || error) && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{formError || error}</p>
        </div>
      )}


      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            value={position}
            onChange={e => setPosition(e.target.value)}
            placeholder="Position"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${editId ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            disabled={!!editId} // Desible si el editId istrue    
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div>
          <input
            type="number"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            placeholder="Salary"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          {editId ? (
            <button
              onClick={handleUpdateEmployee}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Update Employee
            </button>
          ) : (
            <button
              onClick={handleAddEmployee}
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Input para el filtrado */}
      <div className=" mt-8 mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, email or position"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>



      {/* Lista filtrada de empleados */}
      <div className="mt-8">
        <ul className="space-y-4">
          {filteredEmployees.map((emp) => (
            <li key={emp.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-gray-500">{emp.position}</p>
                <p className="text-gray-500">{emp.email}</p>
                <p className="text-gray-700">${emp.salary}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditEmployee(emp)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleConfirmDelete(emp)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>




      {/* Employee List Section sin filtro 
      <div className="mt-8">
        <ul className="space-y-4">
          {employees.map(emp => (
            <li key={emp.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-gray-500">{emp.position}</p>
                <p className="text-gray-500">{emp.email}</p>
                <p className="text-gray-700">${emp.salary}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditEmployee(emp)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleConfirmDelete(emp)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>*/}

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this employee?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDeleteEmployee}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeRegistration;
