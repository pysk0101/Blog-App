import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const verifyJWT = async (req, res, next) => {
    
    try {

        const token = req.headers["authorization"]?.split(" ")[1];
       
        if (!token) return res.status(403).send("Pls login first")

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).send("Invalid Token")
            next()
        })
    }
    catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default verifyJWT

