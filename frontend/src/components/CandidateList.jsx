import React from 'react';

function CandidateList({ candidates, onVote }) {
    return (
        <div className="live-results">
            <h3>Live Voting Dashboard</h3>
            <div className="list-container">
                {candidates.map((c) => (
                    <div key={c._id} className="candidate-row">
                        <div className="info">
                            <strong>{c.name}</strong>
                            <span className="party-tag">{c.party}</span>
                        </div>
                        <div className="actions">
                            <span className="vote-counter">{c.votes} Votes</span>
                            <button onClick={() => onVote(c._id)} className="vote-btn">Vote 🗳️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CandidateList;
