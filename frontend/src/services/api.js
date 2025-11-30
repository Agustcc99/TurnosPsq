// frontend/src/services/api.js

// En producción, usamos "/api" (mismo dominio).
// En desarrollo, Vite va a hacer proxy de "/api" a http://localhost:4000
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = res.headers.get("content-type");
  const data =
    contentType?.includes("application/json")
      ? await res.json()
      : null;

  if (!res.ok) {
    throw new Error(data?.message || "Error en la solicitud");
  }

  return data;
}

export const api = {
  login(username, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
  },
  logout() {
    return request("/auth/logout", { method: "POST" });
  },
  getMe() {
    return request("/auth/me", { method: "GET" });
  },
  getTurnos({ fecha, nombre, siniestro }) {
    const params = new URLSearchParams();
    if (fecha) params.append("fecha", fecha);
    if (nombre) params.append("nombre", nombre);
    if (siniestro) params.append("siniestro", siniestro);

    const query = params.toString() ? `?${params.toString()}` : "";
    return request(`/turnos${query}`, { method: "GET" });
  },
  crearTurno(turno) {
    return request("/turnos", {
      method: "POST",
      body: JSON.stringify(turno)
    });
  },
  actualizarEstado(id, estado) {
    return request(`/turnos/${id}/estado`, {
      method: "PATCH",
      body: JSON.stringify({ estado })
    });
  },
  eliminarTurno(id) {
    return request(`/turnos/${id}`, {
      method: "DELETE"
    });
  }
};
