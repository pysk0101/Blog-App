import express from "express"
const router = express.Router()
import  logoutController from "../controllers/logoutController.js"

router.get("/", logoutController)

export default router
