import express from "express";
import { attractions } from "../datas/attractions-zones-data.js";

const router = express.Router();

// GET /api/attractions - Toutes les attractions
router.get("/", (req, res) => {
  res.json(attractions);
});

export default router;
