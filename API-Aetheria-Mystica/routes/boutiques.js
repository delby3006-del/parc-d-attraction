import express from "express";
import { boutiques } from "../datas/restaurents-boutique-data.js";

const router = express.Router();

// GET /api/boutiques - Toutes les boutiques
router.get("/", (req, res) => {
  res.json(boutiques);
});

export default router;
