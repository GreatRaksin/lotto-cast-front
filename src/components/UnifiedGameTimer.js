// UnifiedGameTimer.js
import React, { useEffect, useState } from 'react';
import './GameTimers.css';

function UnifiedGameTimer({ results, onTimerEnd }) {
    const [timers, setTimers] = useState({
        "Game 4": { remainingTime: 300 }, // Начальное значение 5 минут
        "Game 16": { remainingTime: 300 },
    });

    useEffect(() => {
        const updateTimers = () => {
            const newTimers = { ...timers };
            let timerEnded = false;

            Object.entries(results).forEach(([gameName, result]) => {
                if (result) {
                    const remainingTime = newTimers[gameName].remainingTime;
                    if (remainingTime > 0) {
                        newTimers[gameName].remainingTime -= 1; // Уменьшаем оставшееся время на 1 секунду
                    }

                    if (remainingTime <= 1 && !timerEnded) {
                        timerEnded = true; // Убедимся, что только один таймер сработал
                        onTimerEnd(gameName);
                    }
                }
            });

            setTimers(newTimers);
        };

        const interval = setInterval(updateTimers, 1000); // Обновляем каждую секунду
        return () => clearInterval(interval); // Очищаем интервал при размонтировании
    }, [results, onTimerEnd, timers]); // Зависимости

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