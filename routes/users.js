const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/users', async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = new User({ email, password, username });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error login:', error);
        res.status(400).send(error.message);
    }
});
router.get('/users', async (req, res) => {

    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error get login:', error);
        res.status(500).send(error.message);
    }
});
module.exports = router;
