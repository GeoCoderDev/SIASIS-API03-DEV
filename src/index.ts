import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
  res.json({message:"Bienvenido a API03 de SIASIS"}).status(200)
})

// Endpoint para obtener la hora actual del servidor en una zona horaria especificada
app.get("/api/time", (req: Request, res: Response) => {
  try {
    // Obtener la zona horaria desde los parámetros de consulta, por defecto 'America/Lima' (Perú)
    const timezone = (req.query.timezone as string) || "America/Lima";

    // Obtener la hora actual del servidor
    const serverTime = new Date();

    // Formatear la fecha según la zona horaria especificada
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZoneName: "short",
    };

    const formatter = new Intl.DateTimeFormat("es-PE", options);
    const localTime = formatter.format(serverTime);

    // Responder con la información de tiempo
    res.json({
      serverTime: serverTime.toISOString(),
      timezone: timezone,
      localTime: localTime,
    });
  } catch (error) {
    // Manejar errores, como zona horaria inválida
    res.status(400).json({
      error: "Error al procesar la zona horaria",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Para iniciar el servidor (código de muestra)
const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


