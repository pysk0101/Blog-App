import Users from '../models/userModel.js'
import bcrypt, { hash } from "bcrypt"

const deleteUser = async (req, res) => {
    try {
        const result = await Users.deleteOne({ username: req.params.username });
        if (result.deletedCount === 0) return res.status(400).json({ "message": "User not found" })
        res.redirect("/")
            
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}

const readUser = async (req, res) => {
    const username = req.params.username;
    const user = await Users.findOne({ username: username });
    if (!user) return res.status(400).json({ "message": `User ${req.params.username} not found` })

    res.render("user-profile", { user: user })
}

const getUsers = async (req, res) => {
    const users = await Users.find()
    res.render("users", { users: users })
}

const updateUsername = async (req, res) => {
    const user = await Users.findOne({ username: req.params.username })
    user.username = req.body.newUsername
    await user.save()

    if (!user) return res.status(400).json({ "message": `User  ${req.params.username} not found` });
    res.redirect(`/myprofile/@${user.username}`)
}

const updateUserpassword = async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.params.username })

        const matchPwd = await bcrypt.compare(req.body.currentPassword, user.password)
        if (!matchPwd) return res.status(400).send("Hatalı şifre");

        const hashedPwd = await bcrypt.hash(req.body.newPassword, 10)
        user.password = hashedPwd
        await user.save()
        res.redirect(`/myprofile/@${user.username}`)


    } catch (error) {
        res.status(400).send({ message: 'An error occurred', error })
    }
}


export { getUsers, readUser, deleteUser, updateUsername, updateUserpassword }

