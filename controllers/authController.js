import Users from '../models/userModel.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authController = async (req, res) => {
    
    const {  email, password } = req.body;
    if ( !email || !password) res.status(400).send("Tüm alanları doldurunuz");

    const newUser = await Users.findOne({email:email});
    if (!newUser) return res.status(404).send("Kullanıcı bulunamadı");
    console.log(password)
    console.log(newUser.hasPassword)

    const matchPwd = await bcrypt.compare(password, newUser.hasPassword) // ilk önce loginde girilen password, sonraki bizim db'deki hashlenmiş password

    if (!matchPwd) return res.status(400).send("Hatalı şifre");

//material them ocean
    
    try {
        if (matchPwd) {
            
            const token = jwt.sign({ email: newUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ email: newUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

            
            newUser.refreshToken = refreshToken;
            await newUser.save();
            
            res.send({token});
        }
        res.status(401).send("Hatalı şifre");


    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export default authController 