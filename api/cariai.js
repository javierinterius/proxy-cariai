export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "https://info.fanosa.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Validar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const response = await fetch("https://cariai.com/crudapi/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CariSec": "CTlPZ2I4cTQ4SThs8uy83VE1pWnNSQ25tM01TaWZSMjRiME9yR3c2e1EZWXFjL2FkSTU0WWU3a"
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al conectar con Cari AI",
      detalle: error.message,
    });
  }
}
