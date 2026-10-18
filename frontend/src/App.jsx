import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import Auth from './components/Auth';
import './App.css';

// ✅ CORE PRODUCTION LIVE BACKEND CONFIGURATION
const API_URL = 'https://onrender.com';

function App() {
    const [user, setUser] = useState(null);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get(API_URL);
            setCandidates(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addCandidate = async (data) => {
        try {
            const res = await axios.post(API_URL, data);
            setCandidates([...candidates, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const castVote = async (id) => {
        try {
            const res = await axios.put(`${API_URL}/vote/${id}`);
            setCandidates(candidates.map(c => c._id === id ? res.data : c).sort((a,b) => b.votes - a.votes));
            alert("Your vote has been cast successfully! 🗳️");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

    if (!user) {
        return <Auth onAuthSuccess={(userData) => setUser(userData)} />;
    }

    return (
        <div className="container">
            <div className="header-actions">
                <span>👋 Welcome, <strong>{user.name}</strong></span>
                <button onClick={handleLogout} className="logout-btn">Logout 🚪</button>
            </div>
            <h1>🗳️ Secure Online Voting App</h1>
            <div className="votes-card">
                <h3>Total Votes Polled</h3>
                <h1>{totalVotes}</h1>
            </div>
            <CandidateForm onAdd={addCandidate} />
            <CandidateList candidates={candidates} onVote={castVote} />
        </div>
    );
}

export default App;
