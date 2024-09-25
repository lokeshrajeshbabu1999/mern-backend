const express = require('express');
const Student = require('../models/Student');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('../models/Users');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/details', upload.single('Photo'), async (req, res) => {
    const { Name, DOB, Gender, Country, State, Email_Id, Mobile_Number, Hobbies, Educational_Qualification,
    } = req.body;
    const Photo = req.file ? req.file.path : null;


    if (!Name || !DOB || !Gender || !Country || !State || !Email_Id || !Mobile_Number || !Hobbies || !Educational_Qualification
        // || !Photo
    ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExit = await User.findOne({ email: Email_Id })
        if (userExit) {
            res.status(400).json({ error: "Email already exits" })
        }
        // const userMobile_number = await User.findOne({ mobile_number: Mobile_Number })
        // if (userMobile_number) {
        //     res.status(400).json({ error: "mobile-number akready exists" })
        // }

        const student = new Student({
            Name, DOB, Gender, Country, State, Email_Id, Mobile_Number, Hobbies, Educational_Qualification,
            // Photo
        });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(400).send(error.message);

    }
});

router.get('/details', async (req, res) => {
    const { status } = req.query;

    try {
        // const filter = status ? { progress: status } : {};
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send(error.message);
    }
});



router.put('/details', async (req, res) => {
    const { Name, DOB, Gender, Country, State, Email_Id, Mobile_Number, Hobbies, Educational_Qualification,
        //  Photo 
    } = req.body;

    if (!Name) {
        console.error('Received data:', req.body);
        return res.status(400).json({ error: 'Name is required to update the student' });
    }

    if (!DOB && !Gender && !Country && !State && !Email_Id && !Mobile_Number && !Hobbies && !Educational_Qualification
        //  && !Photo
    ) {
        return res.status(400).json({ error: 'At least one field is required to update' });
    }

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { Name },
            {
                DOB, Gender, Country, State, Email_Id, Mobile_Number, Hobbies, Educational_Qualification,
                // Photo
            },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).send(error.message);
    }
});




router.delete('/details', async (req, res) => {
    const { name } = req.body;
    console.error('Received data:', req.body);
    if (!name) {
        return res.status(400).send('Name is required');
    }

    try {
        const result = await Student.deleteOne({ Name: name });

        if (result.deletedCount === 0) {
            return res.status(404).send('Student not found');
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
