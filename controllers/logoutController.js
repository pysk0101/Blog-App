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

const logoutController = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);


    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403);

    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' }
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        filePath, 
        JSON.stringify(usersDB.users)
    )
    res.sendStatus(200);
}

export default logoutController