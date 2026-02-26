import express from "express";
import { zones_parc } from "../datas/attractions-zones-data.js";

const router = express.Router();
// GET /api/zones - Toutes les informations sur les zones

router.get("/", (req, res) => {
  res.json(zones_parc);
});

export default router;
