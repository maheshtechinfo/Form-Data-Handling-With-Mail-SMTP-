import axios from "axios";

const BASE_URL = "http://localhost:8081/api/employees";

export const getEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createEmployee = (emp) =>
  axios.post(BASE_URL, emp);

export const updateEmployee = (id, emp) =>
  axios.put(`${BASE_URL}/${id}`, emp);

export const deleteEmployee = (id) =>
  axios.delete(`${BASE_URL}/${id}`);