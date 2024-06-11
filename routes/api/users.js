import express from "express"
const router = express.Router()

import  {getUsers,deleteUser,getUser,updateUser} from "../../controllers/userController.js"

router.get("/", getUsers).delete("/", deleteUser).put("/", updateUser)
router.get("/:id", getUser)

export default router