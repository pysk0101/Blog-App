import express from "express"
const router = express.Router()

import {createBlog} from "../../controllers/blogController.js"

router.post("/:username", createBlog)
 
export default router