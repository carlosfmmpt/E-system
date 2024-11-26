
import React, { useState } from "react";
import Register from "./Register";
import EmployeeRegistration from "./EmployeeRegistration";

const SidebarLayout = () => {
  const [activeOption, setActiveOption] = useState("opcion1"); // Estado para manejar la opción activa

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Opciones
        </div>
        <nav className="flex-1 mt-4">
          <ul>
            <li>
              <button
                onClick={() => setActiveOption("opcion1")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 rounded ${activeOption === "opcion1" ? "bg-gray-700" : ""
                  }`}
              >
                Registro de usuario
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveOption("opcion2")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 rounded ${activeOption === "opcion2" ? "bg-gray-700" : ""
                  }`}
              >
                Registro de Empleados
              </button>
            </li>
           
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeOption === "opcion1" && (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-6">Formulario de Registro</h1>
            <Register /> {/* Aquí se renderiza tu componente de registro */}
          </div>
        )}
        {activeOption === "opcion2" && (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-6">Formulario de Empleados</h1>
            <EmployeeRegistration /> {/* Aquí se renderiza tu componente de registro */}
          </div>
        )}
      
      </div>
    </div>
  );
};

export default SidebarLayout;
