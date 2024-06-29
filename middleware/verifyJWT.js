import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

import refreshToken from './refreshToken.js';

const verifyJWT = async (req, res, next) => {
    
    try {
       
        const token = req.cookies.at    
       
        // if (!token) return res.status(403).redirect("/login")
        if (!token) return res.status(403).render("banned")
        
        
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) refreshToken(req, res)
            next() //bir sonraki middleware e geçiriyor
        })
    }
    catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default verifyJWT

