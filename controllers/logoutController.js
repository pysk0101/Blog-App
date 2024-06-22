const logoutController = async (req, res) => {
    res.clearCookie("at");
    res.clearCookie("rt");
    res.redirect("/");
}

export default logoutController
