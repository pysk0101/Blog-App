import express from "express"
const router = express.Router() 


import { getHomepage, openLogin, openRegister, noFound } from "../../controllers/pageController.js"

router.get("/", getHomepage).get("/register", openRegister).get("/login", openLogin).get("*", noFound)

export default router