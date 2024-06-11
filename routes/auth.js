import express from "express"
const router = express.Router()
import  authController from "../controllers/authController.js"

router.get("/", authController)

export default router
