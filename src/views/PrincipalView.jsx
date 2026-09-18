import React, { useState } from "react";
import { Box, Typography, Button, TextField, Stack, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  fetchTodos as fetchTodosApi,
  fetchPorId as fetchPorIdApi,
  crearAprendiz as crearAprendizApi,
  actualizarAprendiz as actualizarAprendizApi,
  eliminarAprendiz as eliminarAprendizApi,
} from "../service/aprendizService";
import TablaAprendices from "../componentes/TablaAprendices";
import FormularioAprendiz from "../componentes/FormularioAprendiz";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },
    secondary: { main: "#a78bfa" },
    error: { main: "#ef4444" },
    background: { default: "#0b1220", paper: "#111827" },
    text: { primary: "#e5e7eb", secondary: "#94a3b8" }
  }
});

const inputSX = {
  bgcolor: "#f3f4f6",
  borderRadius: 1,
  input: { color: "#111827" },
  "& .MuiInputLabel-root": { color: "#374151" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94a3b8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" }
};

const ListaAprendices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", telefono: "", direccion: "", fechaNacimiento: "", genero: "", programa: "", ficha: "", numeroDocumento: "",});
  const [idFiltro, setIdFiltro] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const datos = await fetchTodosApi();
      setData(datos);
    } catch (e) {
      console.error("Error cargando aprendices:", e);
      setData([]);
    } finally { setLoading(false); }
  };

  const fetchPorId = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      const datos = await fetchPorIdApi(idFiltro);
      if (datos) {
        setData([datos]);
        setForm(datos);
      } else {
        setData([]);
      }
    } catch { setData([]); } finally { setLoading(false); }
  };

  const crearAprendiz = async () => {
    try {
      setLoading(true);
      await crearAprendizApi(form);
      setForm({ nombre: "", apellido: "", email: "", telefono: "", direccion: "", fechaNacimiento: "", genero: "", programa: "", ficha: "", numeroDocumento: "" });
      await fetchTodos();
    } catch (e) { console.error("Error creando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const actualizarAprendiz = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await actualizarAprendizApi(idFiltro, form);
      await fetchTodos();
    } catch (e) { console.error("Error actualizando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const eliminarPorId = async () => {
    if (!idFiltro) return;
    try { setLoading(true); await eliminarAprendizApi(idFiltro); await fetchTodos(); }
    catch (e) { console.error("Error eliminando aprendiz:", e); }
    finally { setLoading(false); }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700, color: "text.primary" }}>
            Aprendices
          </Typography>
          <Button variant="contained" color="primary" onClick={fetchTodos} disabled={loading}>
            {loading ? "Cargando..." : "VER TODOS"}
          </Button>
          <TextField
            size="small" label="ID" value={idFiltro} onChange={(e) => setIdFiltro(e.target.value)}
            sx={{ ...inputSX, width: 140 }}
          />
          <Button variant="contained" color="secondary" onClick={fetchPorId} disabled={loading || !idFiltro}>
            BUSCAR POR ID
          </Button>
          <Button variant="contained" color="error" onClick={eliminarPorId} disabled={loading || !idFiltro}>
            ELIMINAR POR ID
          </Button>
          <Button variant="contained" color="primary" onClick={actualizarAprendiz} disabled={loading || !idFiltro}>
             ACTUALIZAR DATOS
          </Button>
        </Stack>

        <FormularioAprendiz form={form} setForm={setForm} onCrear={crearAprendiz} loading={loading} />

        <TablaAprendices data={data} />
      </Box>
    </ThemeProvider>
  );
};

export default ListaAprendices;