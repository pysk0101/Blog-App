import express from "express"
const router = express.Router()

import {createBlog,updateBlog} from "../../controllers/blogController.js"

router.post("/updateblog", updateBlog).post("/:username", createBlog)


 
export default router