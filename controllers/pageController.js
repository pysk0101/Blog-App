import Users from "../models/userModel.js"


const getHomepage = async (req, res) => {
    res.render("homepage")
}

const openLogin = async (req, res) => {
    res.render("login")
}

const openRegister = async (req, res) => {
    res.render("register")
}


const getProfile = async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.params.username })
        res.render("profile", { user: user })
    } catch (error) {
        res.status(400).send("User not found")
    
    }
}


const blogPage = async (req, res) => {
    const users = await Users.find({})
    res.render("blog", { users: users })
}

const bannedPage = async (req, res) => {
    res.status(400).render("banned")
}

const noFound = async (req, res) => {
    res.status(400).render("404")
}


export { getHomepage, blogPage, openLogin, openRegister, bannedPage, noFound, getProfile }