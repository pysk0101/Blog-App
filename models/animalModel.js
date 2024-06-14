import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },

})

const Animal = mongoose.model('animal', animalSchema);

export default Animal;