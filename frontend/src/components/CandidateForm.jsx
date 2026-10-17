import React, { useState } from 'react';

function CandidateForm({ onAdd }) {
    const [name, setName] = useState('');
    const [party, setParty] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !party) return alert('Please fill all fields');
        onAdd({ name, party });
        setName(''); setParty('');
    };

    return (
        <div className="card">
            <h3>Register New Candidate</h3>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Candidate Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Party Name" value={party} onChange={(e) => setParty(e.target.value)} />
                <button type="submit" className="btn">Add Candidate</button>
            </form>
        </div>
    );
}
export default CandidateForm;
