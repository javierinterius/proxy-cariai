export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "https://info.fanosa.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // IMPORTANTE

  // Manejar preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Validar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Enviar a Cari AI
  try {
    const response = await fetch("https://cariai.com/crudapi/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CariSec": "TU_TOKEN_AQUI"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al conectar con Cari AI",
      detalle: error.message
    });
  }
}
