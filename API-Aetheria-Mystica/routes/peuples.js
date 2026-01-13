import express from "express";
import { peuples } from "../datas/peuples-data.js";
const router = express.Router();

// GET /api/peuples - Toutes les informations sur les peuples
router.get("/", (req, res) => {
  res.json(peuples);
});

export default router;
