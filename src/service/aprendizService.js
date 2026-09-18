import axios from "axios";

export const API_BASE = "http://localhost:8080/api/v1/aprendiz";
// export const API_BASE = "https://backadso-production.up.railway.app/api/v1/aprendiz";

export const fetchTodos = async () => {
  const res = await axios.get(API_BASE);
  return res.data || [];
};

export const fetchPorId = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const crearAprendiz = async (aprendiz) => {
  const res = await axios.post(API_BASE, aprendiz, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const actualizarAprendiz = async (id, aprendiz) => {
  const res = await axios.put(`${API_BASE}/${id}`, aprendiz, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const eliminarAprendiz = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};