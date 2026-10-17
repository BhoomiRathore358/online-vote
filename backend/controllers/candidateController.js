import Candidate from '../models/Candidate.js';

export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ votes: -1 });
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addCandidate = async (req, res) => {
    const { name, party } = req.body;
    try {
        const newCandidate = new Candidate({ name, party });
        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const voteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
        
        candidate.votes += 1;
        await candidate.save();
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
