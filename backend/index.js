const express = require('express');
const bodyParser = require('body-parser');
const { hashPassword, comparePassword } = require('./bcrypt');
const jwt = require('jsonwebtoken');
const { DataModel } = require('./datab');
const { JWT_SECRET } = require('./autho');
const cors = require('cors');
const ARouter = require('./routes/index');
const { authMiddleware } = require('./middleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", ARouter); // Ensure ARouter is set up correctly

// Routes
app.post('/sign', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const existingUserWithEmail = await DataModel.findOne({ email });
        if (existingUserWithEmail) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const existingUserWithMobile = await DataModel.findOne({ mobile });
        if (existingUserWithMobile) {
            return res.status(400).json({ error: 'Mobile number already in use' });
        }

        const hashedPassword = await hashPassword(password);

        const user = new DataModel({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: 'Sign up successful!' });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/loginEma', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await DataModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/loginMob', async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await DataModel.findOne({ mobile });

        if (!user) {
            return res.status(401).json({ error: 'Invalid mobile number or password' });
        }

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid mobile number or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await DataModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ name: user.name });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
