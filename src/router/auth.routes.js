import express from "express";
const router = express.Router();

import { loginAdmin } from "../controller/auth.controller.js";

router.post("/login", loginAdmin);

export default router;
