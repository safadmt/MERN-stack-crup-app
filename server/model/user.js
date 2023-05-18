import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type: String , required: true},
    password : {type: String , required: true},
    image : {type: String , required: true},
    address : {type:String , required: true},

})

const User = mongoose.model("User", userSchema);

export default User;