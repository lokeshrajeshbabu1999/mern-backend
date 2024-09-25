const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const app = express();
app.use(cors());


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const connectToMongoDB = () => {
    const mongoURI = process.env.MONGO_URI;
    console.log('MongoDB URI:', process.env.MONGO_URI);

    if (!mongoURI) {
        console.error('MongoDB URI is missing from environment variables.');
        process.exit(1);
    }

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
};

connectToMongoDB();

app.use('/api/student', loginRoutes);
app.use('/api/student', userRoutes);
app.use('/api/student', studentRoutes);


app.get('/', (req, res) => {
    res.send('MongoDB Atlas connected successfully!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// lokesh-user//C6poNDBr4QyrJ528
// V8wlGyNyZeui2djx