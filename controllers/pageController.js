


const getHomepage = async (req, res) => {
    res.render("homepage")
}

const openLogin = async (req, res) => {
    res.render("login")
}

const openRegister = async (req, res) => {
    res.render("register")
}
const bannedPage = async (req, res) => {
    res.status(400).render("banned")
}

const noFound = async (req, res) => {
    res.status(400).render("404")
}


export { getHomepage, openLogin, openRegister, bannedPage, noFound }