// Backend (server.js)
const express = require('express');
// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const mongoURI = 'mongodb://localhost:27017/newsdb'; // Local MongoDB URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,         // Use the new URL parser (this is required)
    useUnifiedTopology: true,     // Use the new connection management engine
    serverSelectionTimeoutMS: 30000,  // Optional: 30 seconds timeout for server selection
    socketTimeoutMS: 45000,       // Optional: 45 seconds timeout for socket connections
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });
app.use(express.json());
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 3600000 }  // Set session expiry to 1 hour (3600000 ms)
//   }));

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));


// MongoDB user model
const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}), 'userrr');


app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'login.html');
    res.sendFile(filePath)
})

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if(user){

               
        // Directly compare password (no hashing)
        if (user.password != password) {
            res.redirect('/login');
            // res.send('hi')
        }
        // Successful login, redirect to /news page
        res.redirect('/news');
    }else{
        res.redirect('/login');
    }
    // res.send('hi')
});


app.get('/news', (req, res) => {
    const filePath = path.join(__dirname, 'newss.html');
    res.sendFile(filePath)
})

// Start the server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
    // const cors = require('cors');
    // app.use(cors());

});
