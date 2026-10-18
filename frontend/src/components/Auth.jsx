import React, { useState } from 'react';
import axios from 'axios';

// Note: Agar aapne react-axios install kiya hai aur error aaye, to upar 'import axios from "axios";' hi use karein.

function Auth({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = isLogin ? { voterId, password } : { name, voterId, password };

        try {
            // ✅ Aapka asli live Render backend URL yahan set kar diya hai
            const BASE_URL = 'https://online-vote-9.onrender.com'; 

            // Backend routes ke hisab se sahi endpoint mapping
            let url = isLogin 
                ? `${BASE_URL}/api/auth/login` 
                : `${BASE_URL}/api/auth/register`;

            const res = await axios.post(url, payload);

            // Token aur User data ko browser ki LocalStorage me save karne ke liye
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            // Success hone par state handle hogi
            onAuthSuccess(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check backend.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>{isLogin ? '🔐 Voter Login' : '📝 Voter Registration'}</h2>
                {error && <div className="error-alert" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    )}
                    <input 
                        type="text" 
                        placeholder="Voter ID" 
                        value={voterId} 
                        onChange={(e) => setVoterId(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="btn auth-btn" style={{ marginTop: '10px' }}>
                        {isLogin ? 'Login to Vote' : 'Register Now'}
                    </button>
                </form>
                <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: '15px', color: '#0070f3' }}>
                    {isLogin ? "New voter? Create an account" : "Already registered? Login here"}
                </p>
            </div>
        </div>
    );
}

export default Auth;
