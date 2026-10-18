import React, { useState } from 'react';
import axios from 'axios';

function Auth({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? 'login' : 'register';
        const payload = isLogin ? { voterId, password } : { name, voterId, password };

        try {
            // 🚀 Localhost ko hata kar Render ka live production URL laga diya hai
            const res = await axios.post(`https://onrender.com{endpoint}`, payload);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            onAuthSuccess(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check backend.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>{isLogin ? '🔐 Voter Login' : '📝 Voter Registration'}</h2>
                {error && <div className="error-alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    )}
                    <input type="text" placeholder="Voter ID" value={voterId} onChange={(e) => setVoterId(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn auth-btn">{isLogin ? 'Login to Vote' : 'Register Now'}</button>
                </form>
                <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "New voter? Create an account" : "Already registered? Login here"}
                </p>
            </div>
        </div>
    );
}

export default Auth;
