import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeComponent() {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!employee.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!employee.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!employee.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(employee.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    createEmployee(employee).then((response) => {
      console.log("Employee created successfully:", response.data);
      navigator("/employees");
    });
  };

  function pagetitle() {
    return (
      <h2 className="text-3xl font-semibold mb-6 text-[#4B0082] drop-shadow-md">
        {id ? "Update Employee" : "Add Employee"}
      </h2>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30 text-[#4B0082]">
      {pagetitle()}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white/40 backdrop-blur-sm p-2 rounded text-[#4B0082]"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white/40 backdrop-blur-sm p-2 rounded text-[#4B0082]"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white/40 backdrop-blur-sm p-2 rounded text-[#4B0082]"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#4B0082] text-white px-4 py-2 rounded hover:bg-purple-900 transition duration-200 shadow-md"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EmployeeComponent;
