import mongoose from "mongoose";

const newUser = mongoose.Schema({
    username:  { type: String },
    mobile_no: { type: String },
    dob:       { type: String },
    gender:    { type: String },
    pic:       { type: String },
    email:     { type: String },
    password:  { type: String }
})

const addData = mongoose.model('NewUser', newUser)

export default addData 