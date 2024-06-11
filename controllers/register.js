import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";


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
    setUsers: function(data) {
        this.users = data;
    }
};


const registerController = async (req, res) => {
    const {  username, email, password } =  req.body;
    if (!username || !email || !password) res.status(400).send("Tüm alanları doldurunuz")

    const deplicate = usersDB.users.find(user => user.email === email)
    const copyPassword = password
    
    if (deplicate) return res.sendStatus(409);

    try {
        const hashedPwd= await bcrypt.hash(password, 10);
        const newUser = {
            id: usersDB.users[usersDB.users.length-1].id+ 1, 
            username,
            email,
            copyPassword,
            password: hashedPwd
        }

        usersDB.setUsers([...usersDB.users, newUser])
        
        await fsPromises.writeFile(
            filePath,
            JSON.stringify(usersDB.users)
        );
        
        res.status(201).send("Kullanıcı oluşturuldu")
    

    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
}

export  {registerController,showRegisterPage}