import React, { useState, useEffect } from 'react';
import SlideViewer from './components/SlideViewer';
import ResultsViewer from './components/ResultsViewer';
import api from './services/api';
import UnifiedGameTimer from "./components/UnifiedGameTimer"; // Импортируем новый компонент

function DataController() {
    const [slides, setSlides] = useState([]);
    const [results, setResults] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);

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
            try {
                const response = await api.get('/lottery-results/');
                const sortedResults = response.data.sort((a, b) => new Date(b.result_date) - new Date(a.result_date));
                const latestResults = {
                    "Game 4": sortedResults.find(result => result.game_name === "Game 4"),
                    "Game 16": sortedResults.find(result => result.game_name === "Game 16"),
                };
                console.log('Fetched!!! ', latestResults);
                setResults(latestResults);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        }

        fetchSlides();
        fetchResults();
        const resultsInterval = setInterval(fetchResults, 300000);
        return () => clearInterval(resultsInterval);
    }, []);

    function handleTimerEnd(gameName) {
        setShowResults(true);
        setCurrentGame(gameName);
    }

    return (
        <div>
            {showResults ? (
                <ResultsViewer results={results[currentGame]} />
            ) : (
                <SlideViewer slides={slides} />
            )}
            <UnifiedGameTimer results={results} onTimerEnd={handleTimerEnd} />
        </div>
    );
}

export default DataController;