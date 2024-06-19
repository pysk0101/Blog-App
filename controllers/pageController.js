


const getHomepage = async (req, res) => {
    res.render("homepage.ejs")
}

const openLogin = async (req, res) => {
    res.render("login.ejs")
}

const getUserPage = async (req, res) => {
    res.render("user.ejs")
}

const openRegister = async (req, res) => {
    res.render("register.ejs")
}

const getUsers = async (req, res) => {
    res.render("users.ejs")
}

const noFound = async (req, res) => {
    res.render("404.ejs")
}

export { getHomepage, openLogin, openRegister, getUsers,getUserPage ,noFound }