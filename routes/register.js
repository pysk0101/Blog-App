import express from "express"
const router = express.Router()
import  {registerController, showRegisterPage} from "../controllers/register.js" 
router.get("/", showRegisterPage).post("/", registerController)


export default router
