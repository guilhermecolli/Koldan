import express from "express";
import * as attendanceController from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/scan", attendanceController.scan);

export default router;