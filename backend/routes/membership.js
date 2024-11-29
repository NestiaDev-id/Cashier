import express from "express";
import { getAllMembers, getMemberById, createMember, updateMember, deleteMember } from "../controllers/membershipController.js";

const router = express.Router();

router.get("/getall", getAllMembers);
router.get("/:id", getMemberById);
router.post("/createmember", createMember);
router.put("/updateMember", updateMember);
router.delete("/deleteMember", deleteMember);

export default router;
