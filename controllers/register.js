import Users from '../models/userModel.js' 
import bcrypt from 'bcrypt'

const registerController = async (req, res) => {
    const {  username, email, password } =  req.body;
    console.log(req.body)
    if (!username || !email || !password) res.status(400).send("Tüm alanları doldurunuz")

    const duplicate = await  Users.findOne({ email: email });
    if (duplicate) return res.status(409).send("Bu email zaten kayıtlı");

    try {
        const hashedPwd= await bcrypt.hash(password, 10);
        
        const users = await Users.find()
        const lastId = users[users.length-1].id
       
        const newUser = new Users({
            id: lastId + 1,
            username,
            email,
            password: hashedPwd
        })

        await newUser.save()
        res.redirect("/login")
    } catch (error) {
        res.status(500).redirect("/register")
    }
}


export  {registerController}