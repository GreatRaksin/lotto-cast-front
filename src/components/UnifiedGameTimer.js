// UnifiedGameTimer.js
import React, { useEffect, useState } from 'react';
import './GameTimers.css';

/**
 * Компонент отображает таймеры для нескольких игр и отслеживает оставшееся время.
 *
 * @param {Object} results - Объект, содержащий результаты для каждой игры.
 *                           Ключ - название игры, значение - булево значение,
 *                           указывающее, запущена ли игра.
 * @param {function} onTimerEnd - Функция, которая вызывается, когда у таймера заканчивается время.
 *                               Принимает название игры в качестве аргумента.
 * @returns {JSX.Element} - Компонент React, который отображает таймеры.
 */
function UnifiedGameTimer({ results, onTimerEnd }) {
    // Состояние, хранящее информацию о таймерах для каждой игры
    const [timers, setTimers] = useState({
        "Game 4": { remainingTime: 300 }, // Начальное значение 5 минут
        "Game 16": { remainingTime: 300 },
    });

    // Хук для обновления таймеров каждую секунду
    useEffect(() => {
        // Функция, которая обновляет таймеры
        const updateTimers = () => {
            // Создает копию состояния таймеров
            const newTimers = { ...timers };
            // Флаг, указывающий, закончился ли таймер хотя бы у одной игры
            let timerEnded = false;

            // Проходит по каждой игре в объекте results
            Object.entries(results).forEach(([gameName, result]) => {
                // Если игра запущена (result = true)
                if (result) {
                    // Получает оставшееся время для игры
                    const remainingTime = newTimers[gameName].remainingTime;
                    // Если оставшееся время больше 0, уменьшает его на 1 секунду
                    if (remainingTime > 0) {
                        newTimers[gameName].remainingTime -= 1;
                    }

                    // Если таймер заканчивается (оставшееся время <= 1)
                    if (remainingTime <= 1 && !timerEnded) {
                        // Устанавливает флаг, чтобы предотвратить срабатывание
                        // функции onTimerEnd несколько раз
                        timerEnded = true;
                        // Вызывает функцию onTimerEnd, передавая название игры
                        onTimerEnd(gameName);
                    }
                }
            });

            // Обновляет состояние таймеров новыми данными
            setTimers(newTimers);
        };

        // Настраивает интервал для обновления таймеров каждую секунду
        const interval = setInterval(updateTimers, 1000);

        // Очищает интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, [results, onTimerEnd, timers]); // Зависимости

    // Отображение таймеров
    return (
        <div className="game-timers">
            {/* Карта для отображения таймеров для каждой игры */}
            {Object.entries(timers).map(([gameName, timer]) => (
                <div className="game-timer" key={gameName}>
                    {/* Отображает логотип игры */}
                    <img src={`/img/${gameName.toLowerCase().replace(" ", "_")}.svg`} alt={`${gameName} Logo`} className="game-logo" />
                    {/* Отображает оставшее время в формате MM:SS */}
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