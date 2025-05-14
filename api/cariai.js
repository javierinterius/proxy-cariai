export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "https://info.fanosa.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder al preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Validar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Enviar a la API de Cari AI
  try {
    const response = await fetch("https://cariai.com/crudapi/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CariSec": "cTLP2ZI4cTQ4SThSUy83VE1pWnNSQ25tM01TaWZSMjRiME9yR3c2e1EZWXFjL2FkSTU0WWU3a"
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
// Versión corregida con CORS - 100% funcional
