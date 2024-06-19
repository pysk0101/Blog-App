import express from "express"
const router = express.Router()




import  {deleteUser,updateUser} from "../../controllers/userController.js"

router.delete("/", deleteUser).put("/", updateUser)


export default router