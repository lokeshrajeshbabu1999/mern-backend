const express = require('express');
const Login = require('../models/Login');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const login = new Login({ email, password });
        await login.save();
        res.status(201).json(login);
    } catch (error) {
        console.error('Error login:', error);
        res.status(400).send(error.message);
    }
});
router.get('/login', async (req, res) => {

    try {
        const login = await Login.find();
        res.status(200).json(login);
    } catch (error) {
        console.error('Error get login:', error);
        res.status(500).send(error.message);
    }
});
module.exports = router;
