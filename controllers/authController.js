import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

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

const authController = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) res.status(400).send("Tüm alanları doldurunuz");

    const newUser = usersDB.users.find(user => user.email === email);
    if (!newUser) return res.status(404).send("Kullanıcı bulunamadı");

    const matchPwd = await bcrypt.compare(password, newUser.password)
    try {
        if (matchPwd) {
            const token = jwt.sign({ email: newUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ email: newUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            
            const otherUsers = usersDB.users.filter(person => person.username !== newUser.username);
            const currentUser = { ...newUser, refreshToken };
            
            usersDB.setUsers([...otherUsers, currentUser]);
            
            await fsPromises.writeFile(
                path.join(__dirname, '..', 'db', 'user-data-base.json'),
                JSON.stringify(usersDB.users)
            )
            res.send({ token });
        }

        res.status(401).send("Hatalı şifre");


    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default authController 