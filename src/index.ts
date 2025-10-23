import express from "express";
import router from "./api";
import { PORT } from "./config";

const app = express();

//middleware
app.use(express.json());

//Rutas
app.use("/api", router);

//Ruta de test
app.get("/", (req, res) => {
  res.json({ message: "API de contactos funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
