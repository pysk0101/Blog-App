import Users from '../models/userModel.js' 


const logoutController = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);


    const foundUser = await  Users.findOne( { refreshToken: refreshToken});
    if (!foundUser) return res.sendStatus(403);

    
    foundUser.refreshToken = ""; // refresh token'ı sıfırla
    
    await foundUser.save();
    res.redirect("/");
}

export default logoutController
