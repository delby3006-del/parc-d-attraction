import express from "express";
import { restaurants } from "../datas/restaurents-boutique-data.js";

const router = express.Router();

// GET /api/restaurants - Tous les restaurents
router.get("/", (req, res) => {
  res.json(restaurants);
});

export default router;
