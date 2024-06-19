import express from "express"
const router = express.Router()
import  logoutController from "../controllers/logoutController.js"

router.delete("/", logoutController)

export default router
