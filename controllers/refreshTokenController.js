import fs from "fs";
import path from "path";

import jwt from "jsonwebtoken";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromises = fs.promises;

const filePath = path.join(__dirname, '..', 'db', 'user-data-base.json');

async function loadUsers() {
    const data = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

const usersDB = {
    users: await loadUsers(),
    setUsers: function (data) {
        this.users = data;
    }
};

const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(403);
    
    try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        
        const token = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        console.log(decoded)
        res.json({ token });
    })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default refreshTokenController