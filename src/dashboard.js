import React, { useState, useEffect } from 'react';

const Dashboard = ({ bannerVisible, toggleBanner }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(10);
    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/banner')
            .then(response => response.json())
            .then(data => {
                setDescription(data.description);
                setTimer(data.timer);
                setLink(data.link);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/banner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, timer, link }),
        })
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => setMessage('Error updating banner'));
    };

    return (
        <div className="dashboard">
            <h2>Banner Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Timer (seconds):</label>
                    <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />
                </div>
                <div>
                    <label>Link:</label>
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                </div>
                <button type="submit">Update Banner</button>
            </form>

            {/* Toggle Button for Banner Visibility */}
            <button onClick={toggleBanner} style={{ marginTop: '20px' }}>
                {bannerVisible ? 'Hide Banner' : 'Show Banner'}
            </button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Dashboard;
