import express from "express"
const router = express.Router()

import {createBlog,updateBlog, deleteBlog} from "../../controllers/blogController.js"

router.post("/updateblog", updateBlog).post("/delete", deleteBlog).post("/:username", createBlog)


 
export default router