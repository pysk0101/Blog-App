import Users from '../models/userModel.js'

const deleteUser = async (req, res) => {
    try {
        const result = await Users.deleteOne({ id: req.params.id });
        if(result.deleteCount===0) return res.status(400).json({"message": "User not found"})

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}
const getUser = async (req, res) => {
    const user = await Users.findOne({ id: req.params.id });
    if (!user) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    res.send(user)
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
export { deleteUser, updateUser }

