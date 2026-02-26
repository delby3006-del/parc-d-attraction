import express from "express";
import parcRouter from "./routes/index.js";
import zonesRouter from "./routes/zones.js";
import attractionsRouter from "./routes/attractions.js";
import peuplesRouter from "./routes/peuples.js";
import restaurantsRouter from "./routes/restaurents.js";
import boutiquesRouter from "./routes/boutiques.js";

import path from "path";
import logger from "morgan";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5555;

// Recréer __dirname pour ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permet de diffuser les fichiers qui sont dans le dossier public
app.use(express.static(path.join(__dirname, "public")));

// Middleware
// Permet de convertir les données en json
app.use(express.json());
// Afficher dans la console les requetes recues
app.use(logger("dev"));
//Permet d'utiliser les formData (peut-etre)
//app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/parc", parcRouter);
app.use("/api/zones", zonesRouter);
app.use("/api/attractions", attractionsRouter);
app.use("/api/peuples", peuplesRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/boutiques", boutiquesRouter);

// Route racine
app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenue à l'API Aetheria Mystica",
    endpoints: {
      parc: "/api/parc",
      zones: "/api/zones",
      attractions: "/api/attractions",
      peuples: "/api/peuples",
      restaurants: "/api/restaurants",
      boutiques: "/api/boutiques",
    },
  });
});

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Gestion des erreurs
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🎢 Serveur Aetheria Mystica démarré sur http://localhost:${PORT}`);
});
