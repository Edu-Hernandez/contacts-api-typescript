import express from "express";
import contactRoutes from "./routes/contactRoutes";

const app = express();

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

//Rutas
app.use("/contacts", contactRoutes);

//Ruta de test
app.get("/", (req, res) => {
  res.json({ message: "API de contactos funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
