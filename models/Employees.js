const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Enter the first name"]
    },
    last_name: {
        type: String,
        required: [true, "Enter the last name"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'That is not a valid email']
    },
    gender: {
        type: String,
        required: [true, "Enter the gender"],
        enum: ['Male', 'Female', 'Other']
    },
    salary: {
        type: Number,
        required: [true, "Enter the salary"]
    },
})
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee