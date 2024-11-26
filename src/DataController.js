// DataController.js
import React, { useState, useEffect } from 'react';
import SlideViewer from './components/SlideViewer';
import ResultsViewer from './components/ResultsViewer';
import api from './services/api';
import UnifiedGameTimer from "./components/UnifiedGameTimer";

function DataController() {
    const [slides, setSlides] = useState([]);
    const [results, setResults] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);
    const [loadingResults, setLoadingResults] = useState(false);

    useEffect(() => {
        async function fetchSlides() {
            try {
                const response = await api.get('/slides/');
                const sortedSlides = response.data.sort((a, b) => a.display_order - b.display_order);
                setSlides(sortedSlides);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        }

        async function fetchResults() {
            setLoadingResults(true); // Начинаем загрузку результатов
            try {
                const response = await api.get('/lottery-results/');
                const sortedResults = response.data.sort((a, b) => new Date(b.result_date) - new Date(a.result_date));

                // Получаем последние результаты для каждой игры
                const latestResults = {
                    "Game 4": sortedResults.find(result => result.game_name === "Game 4"),
                    "Game 16": sortedResults.find(result => result.game_name === "Game 16"),
                };

                setResults(latestResults);
                setShowResults(true); // Показываем результаты
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoadingResults(false); // Завершаем загрузку результатов
            }
        }

        fetchSlides();
        const resultsInterval = setInterval(fetchResults, 300000); // Запрос результатов каждые 5 минут
        return () => clearInterval(resultsInterval);
    }, []);

    // Обработка окончания таймера
    function handleTimerEnd(gameName) {
        setCurrentGame(gameName);
        // Запрос результатов сразу после окончания таймера
        fetchResults();
    }

    return (
        <div>
            {showResults ? (
                <ResultsViewer results={results[currentGame]} />
            ) : (
                <SlideViewer slides={slides} />
            )}
            <UnifiedGameTimer results={results} onTimerEnd={handleTimerEnd} />
            {loadingResults && <div>Получение результатов...</div>}
        </div>
    );
}

export default DataController;