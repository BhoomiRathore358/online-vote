import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, voterId, password } = req.body;
    try {
        const userExists = await User.findOne({ voterId });
        if (userExists) return res.status(400).json({ message: 'Voter ID already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, voterId, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, voterId: user.voterId, hasVoted: user.hasVoted } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { voterId, password } = req.body;
    try {
        const user = await User.findOne({ voterId });
        if (!user) return res.status(400).json({ message: 'Invalid Voter ID or Password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Voter ID or Password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, voterId: user.voterId, hasVoted: user.hasVoted } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
