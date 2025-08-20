import express from "express";
import {
  createRequest,getRequests,updateRequestStatus,deleteRequest} from "../controllers/AllowanceController.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getRequests);
router.put("/:id", updateRequestStatus);
router.delete("/:id", deleteRequest);

export default router;