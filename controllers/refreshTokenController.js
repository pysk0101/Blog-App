import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";


const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await  Users.find({ refreshToken });
    
    if (!foundUser) return res.sendStatus(403);
    
    try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        //decoded= paylod kısmı
        const token = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        res.json({ token });
    })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default refreshTokenController