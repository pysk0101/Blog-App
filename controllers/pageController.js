


const getHomepage = async (req, res) => {
    res.send("Welcome to the homepage!")
}

const openLogin = async (req, res) => {
    res.send("Login page")
}


const openRegister = async (req, res) => {
    res.send("Welcome to the registration page!")
}

const noFound = async (req, res) => {
    res.status(400).send("The page you are looking for does not exist!")
}

export { getHomepage, openLogin, openRegister,noFound }