import express from "express";
import {
  createBarang,
  getAllBarang,
  getBarangByID,
  updateBarang,
  deleteBarang,
} from "../controllers/barangController.js";

const router = express.Router();

router.post("/", createBarang);
router.get("/", getAllBarang);
router.get("/:id", getBarangByID);
router.put("/:id", updateBarang);
router.delete("/:id", deleteBarang);

export default router;