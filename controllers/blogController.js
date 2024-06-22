import Users from '../models/userModel.js'

const createBlog = async (req, res) => {
    try {
        const  username  = req.params.username
        const user = await Users.findOne({ username: username })
        console.log(req.body)
        if (!user) return res.status(400).json({ message: `User ${username} not found` })
        

        const { title, content} = req.body
        const newBlog = {
            title,
            content,
        }
        
        user.blogs.push(newBlog)
        user.updatedAt = Date.now()

        await user.save()
        
        res.redirect(`/myprofile/@${user.username}`)



    } catch (error) {
        res.status(500).json({ message: "An error occurred", error })
    }
}

export { createBlog }