import fs from "fs";
import path from "path";
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


const deleteUser = async (req, res) => {
    const user = usersDB.users.find(user => user.id === parseInt(req.body.id));
    if (!user) return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    const filtredUsers = usersDB.users.filter(user => user.id !== parseInt(req.body.id));
    usersDB.setUsers([...filtredUsers]);
    res.json(usersDB.users);
}
const getUser = async (req, res) => {
    const user = usersDB.users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    res.json(user);
}
const getUsers = async (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/userlist.html'))
    res.json(usersDB.users);
}

const updateUser = async (req, res) => {
    const user = usersDB.users.find(user => user.id === parseInt(req.body.id));
    if (!user) return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    const updatedUser = { ...user, ...req.body };
    const otherUsers = usersDB.users.filter(user => user.id !== parseInt(req.body.id))
    usersDB.setUsers([...otherUsers, updatedUser]);
    console.log(usersDB.users)
    res.send(updatedUser)
}
export { getUsers, getUser, deleteUser, updateUser }

