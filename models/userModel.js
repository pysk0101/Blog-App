import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
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
    createdAt:  {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
        
})

const deneme = new Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    }
})


const Deneme = mongoose.model('Deneme', deneme);
const User = mongoose.model('User', userSchema);


export {User, Deneme};

