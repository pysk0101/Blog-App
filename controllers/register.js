import Users from '../models/userModel.js' 
import bcrypt from 'bcrypt'

const registerController = async (req, res) => {
    const {  username, email, password } =  req.body;
    if (!username || !email || !password) res.status(400).send("Tüm alanları doldurunuz")

    const duplicate = await  Users.findOne({ email: email });
    if (duplicate) return res.status(409).send("Bu email zaten kayıtlı");

    try {
        const hashedPwd= await bcrypt.hash(password, 10);
        
        const users = await Users.find()
        const lastId = users[users.length-1].id
        console.log(users)
        const newUser = new Users({
            id: lastId + 1,
            username,
            email,
            password,
            hasPassword : hashedPwd
        })

         newUser.save().then(() => {
            res.status(201).json({ 'message': 'User registered successfully' })
        })
        
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}


export  {registerController}