import express from "express"
const router = express.Router()

import verifyJWT from '../../middleware/verifyJWT.js';


import  {getUsers, readUser ,deleteUser,updateUser} from "../../controllers/userController.js"
 
router.get("/", verifyJWT ,getUsers ).get("/:id", readUser).delete("/:id", deleteUser).put("/:id", updateUser)


export default router