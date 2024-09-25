const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    Country: { type: String, required: true },
    State: { type: String, required: true },
    Hobbies: { type: String, required: true },
    Mobile_Number: { type: Number, required: true },
    Email_Id: { type: String, required: true, unique: true },
    DOB: { type: String, required: true },
    // Photo: { type: String, required: true },
    Educational_Qualification: { type: String, required: true },
});
module.exports = mongoose.model('Student', StudentSchema);
