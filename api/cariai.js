export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const response = await fetch("https://cariai.com/crudapi/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CariSec": "cTlPZ2I4cTQ4SThSUy83VE1pWnN5Q25tM01TaWZSMjRiME9yR3c2elE2WXFjL2FkSTU0WWU3aldXN2NJTENhdnRIL2FCWWhQU1VDbDhMNHZ3bTQ9"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con Cari AI", detalle: error.message });
  }
}
