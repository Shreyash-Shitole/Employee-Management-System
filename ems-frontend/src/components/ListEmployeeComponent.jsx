import React, { useEffect, useState } from "react";
import { listEmployee, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  }

  function addEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-center text-4xl font-bold text-indigo-900 mb-6 underline underline-offset-4 decoration-indigo-500">
        <h2>Employee List</h2>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={addEmployee}
          className="bg-indigo-700/90 text-white px-4 py-2 rounded hover:bg-indigo-800 transition duration-200 shadow"
        >
          + Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden shadow-lg border border-white/20">
          <thead className="bg-indigo-900/80 text-slate-100">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody  style={{ color: "#4B0082" }}>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-white/20 hover:bg-white/10 transition"
              >
                <td className="py-3 px-6">{employee.id}</td>
                <td className="py-3 px-6">{employee.firstName}</td>
                <td className="py-3 px-6">{employee.lastName}</td>
                <td className="py-3 px-6">{employee.email}</td>
                <td className="py-3 px-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateEmployee(employee.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => removeEmployee(employee.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEmployeeComponent;
