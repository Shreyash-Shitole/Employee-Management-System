import axios from "axios";


const REST_API_URL = "http://localhost:8080/api/employees";

export const listEmployee = () => {
    return axios.get(REST_API_URL);
}

export const createEmployee=(employee)=>{
    return axios.post(REST_API_URL,employee)
}

export const getEmployee=(employeeId)=>{
    return axios.get(REST_API_URL+"/"+employeeId)
}

export const deleteEmployee=(employeeId)=>{
    return axios.delete(REST_API_URL+"/"+employeeId)
}