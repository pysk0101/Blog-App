import express from "express"
const router = express.Router()
import  {registerController} from "../controllers/register.js" 
router.post("/", registerController)


export default router
