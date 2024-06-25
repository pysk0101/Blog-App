import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        id: {
            type: Number,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        }}]
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})




const User = mongoose.model('User', userSchema);


export default User;

