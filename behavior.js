// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('Received signup request:', { email, password }); // Log request details

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email); // Log if user exists
            return res.status(5500).json({ message: 'User already exists' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const newUser = new User({
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();
        console.log('User successfully created:', email); // Log user creation

        // Respond to the client
        res.status(5500).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during signup:', err.message); // Log any error
        res.status(5500).json({ message: 'Error registering user', error: err.message });
    }
});
