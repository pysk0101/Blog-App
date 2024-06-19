import express from "express"
const router = express.Router() 

import verifyJWT from '../../middleware/verifyJWT.js';

import { getHomepage, openLogin, openRegister,getUserPage, getUsers, noFound } from "../../controllers/pageController.js"

router.get("/", getHomepage).get("/register", openRegister).get("/login", openLogin).get("/users",  verifyJWT, getUsers).get("/users/:id",getUserPage).get("*", noFound)

export default router