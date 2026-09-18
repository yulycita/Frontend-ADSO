import React from "react";
import { Paper, Typography, Stack, TextField, Button } from "@mui/material";

const inputSX = {
  bgcolor: "#f3f4f6",
  borderRadius: 1,
  input: { color: "#111827" },
  "& .MuiInputLabel-root": { color: "#374151" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94a3b8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" }
};

const FormularioAprendiz = ({ form, setForm, onCrear, loading }) => {
  return (
    <Paper elevation={4} sx={{ p: 2, mb: 3, border: "1px solid #334155", bgcolor: "background.paper" }}>
      <Typography sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>Crear aprendiz</Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField label="Nombre" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} sx={{ ...inputSX, flex: 1 }} />
        <TextField label="Apellido" value={form.apellido}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })} sx={{ ...inputSX, flex: 1 }} />
        <TextField label="Número de Documento" value={form.numeroDocumento}
          onChange={(e) => setForm({ ...form, numeroDocumento: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />
        <TextField label="Fecha de Nacimiento" value={form.fechaNacimiento}
          onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />
        <TextField label="Género" value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />
        <TextField label="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} sx={{ ...inputSX, flex: 1.2 }} />
        <TextField label="Teléfono" value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })} sx={{ ...inputSX, flex: 1 }} />
        <TextField label="Dirección" value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />
        <TextField label="Programa" value={form.programa}
          onChange={(e) => setForm({ ...form, programa: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />
        <TextField label="Ficha" value={form.ficha}
          onChange={(e) => setForm({ ...form, ficha: e.target.value })} sx={{ ...inputSX, flex: 1.6 }} />

        <Button variant="contained" color="primary" onClick={onCrear} disabled={loading}>
          CREAR
        </Button>
      </Stack>
    </Paper>
  );
};

export default FormularioAprendiz;