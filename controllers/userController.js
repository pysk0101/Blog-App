import Users from '../models/userModel.js'

const deleteUser = async (req, res) => {
    try {
        const result = await Users.deleteOne({ id: req.params.id });
        if (result.deleteCount === 0) return res.status(400).json({ "message": "User not found" })

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}

const readUser = async (req, res) => {
    const user = await Users.findOne({ id: req.params.id });
    if (!user) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    res.send(user)
}

const getUsers = async (req, res) => {
    const users = await Users.find()
    res.send(users)
}


const updateUser = async (req, res) => {
    const user = await Users.updateOne({ id: req.params.id }, {
        $set: {
            username: req.body.username,
        }
    });

    if (!user) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    res.send(user)
}
export { getUsers, readUser, deleteUser, updateUser }

