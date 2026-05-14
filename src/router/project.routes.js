import express from "express";
const router = express.Router();

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", protect, upload.single("image"), createProject);

router.put("/:id", protect, upload.single("image"), updateProject);

router.delete("/:id", protect, deleteProject);

export default router;
