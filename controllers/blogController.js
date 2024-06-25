import Users from '../models/userModel.js'

const createBlog = async (req, res) => {
    try {
        const username = req.params.username
        const user = await Users.findOne({ username: username })
        console.log(req.body)
        if (!user) return res.status(400).json({ message: `User ${username} not found` })


        const { title, content } = req.body
        const newBlog = {
            id: user.blogs.length + 1,
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

const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body
        
        const username = req.query.username
        const id = req.query.id

        const user = await Users.findOne({ username: username })
        console.log(user)
        if (!user) return res.status(400).json({ message: `User ${username} not found` })

        const blog = user.blogs.find(blog => blog.id == id)
        console.log(blog)
        blog.title= title
        blog.content = content
        console.log(blog)
        
        await user.save()
        res.redirect(`/myprofile/@${user.username}`)
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error})
    }

}

export { createBlog, updateBlog }