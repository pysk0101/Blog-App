import express from "express"
const router = express.Router()

import  refreshTokenController from "../middleware/refreshToken.js"

router.get("/", refreshTokenController)

export default router
