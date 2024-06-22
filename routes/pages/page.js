import express from "express"
const router = express.Router() 

import {getUsers} from "../../controllers/userController.js"

import {bannedPage, getHomepage, blogPage,openLogin, openRegister, noFound ,getProfile} from "../../controllers/pageController.js"

import verifyJWT from "../../middleware/verifyJWT.js"

router.get("/", getHomepage).get("/users", getUsers).get("/register", openRegister).get("/login", openLogin).get("/@:username", getProfile
).get("/blogs",blogPage).get("/banned",bannedPage).get("*", noFound)

export default router   