import React, { useState, useEffect } from 'react';

const Banner = ({ visible }) => {
    const [data, setData] = useState({ description: '', timer: 0, link: '' });
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/banner')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setTimeLeft(data.timer);
            });
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && visible) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, visible]);

    if (!visible || timeLeft <= 0) return null;

    return (
        <div className="banner">
            <h1>{data.description}</h1>
            <p>Time left: {timeLeft} seconds</p>
            {data.link && (
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                    <img src={data.link} alt={data.description} className="banner-image" />
                </a>
            )}
        </div>
    );
};

export default Banner;
