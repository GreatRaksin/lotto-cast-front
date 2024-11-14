// UnifiedGameTimer.js
import React, { useEffect, useState } from 'react';
import './GameTimers.css';

function UnifiedGameTimer({ results, onTimerEnd }) {
    const [timers, setTimers] = useState({
        "Game 4": { remainingTime: 0 },
        "Game 16": { remainingTime: 0 },
    });

    useEffect(() => {
        const updateTimers = () => {
            const newTimers = { ...timers };
            Object.entries(results).forEach(([gameName, result]) => {
                if (result) {
                    const resultTime = new Date(result.result_date);
                    const currentTime = new Date();
                    const secondsSinceResult = Math.floor((currentTime - resultTime) / 1000);
                    const remainingTime = Math.max(300 - secondsSinceResult, 0); // 300 секунд = 5 минут
                    newTimers[gameName].remainingTime = remainingTime;

                    if (remainingTime <= 0) {
                        onTimerEnd(gameName);
                    }
                }
            });
            setTimers(newTimers);
        };

        updateTimers();
        const interval = setInterval(updateTimers, 1000);
        return () => clearInterval(interval);
    }, [results, onTimerEnd]);

    return (
        <div className="game-timers">
            {Object.entries(timers).map(([gameName, timer]) => (
                <div className="game-timer" key={gameName}>
                    <img src={`/img/${gameName.toLowerCase().replace(" ", "_")}.svg`} alt={`${gameName} Logo`} className="game-logo" />
                    <p className="timer-display">
                        {Math.floor(timer.remainingTime / 60).toString().padStart(2, '0')}:
                        {(timer.remainingTime % 60).toString().padStart(2, '0')}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default UnifiedGameTimer;