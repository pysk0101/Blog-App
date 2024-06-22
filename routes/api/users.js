import express from "express"
const router = express.Router()

import verifyJWT from '../../middleware/verifyJWT.js';


import  {readUser ,deleteUser,updateUsername,updateUserpassword} from "../../controllers/userController.js"
 
router.get("/@:username", verifyJWT, readUser).get("/delete/:username", deleteUser)

router.post("/updateusername/:username", updateUsername).post("/updatepassword/:username", updateUserpassword)


export default router