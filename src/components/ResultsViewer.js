import React from 'react';
import {motion} from 'framer-motion';
import './ResultsViewer.css?v=1';

function ResultsViewer({results}) {
    console.log("Results loaded:", results);
    if (!results) {
        return <div className="warning">
            <h1>Внимание!<br />Наблюдаются проблемы с сетью. Сообщите об этом своему руководителю!</h1>
        </div>
    }

    // Определяем тип игры на основе структуры результатов
    const gameType = results.game_name;

    return (
        <div className="results-viewer">
            <img src={`/img/${gameType.toLowerCase().replace(" ", "_")}.svg`} alt={`${gameType} Logo`}
                 className="game-logo-main"/>
            <h1 className='serie'>Тиражная серия № {results.id}</h1>
            <div className="balls-container">
                {gameType === "Game 4" ? (
                    // Отображаем двумерный массив для Game 4
                    <>
                        {results.results[0].map((ball, index) => (
                            <motion.div
                                key={index}
                                initial={{y: -50, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: index * 0.2}}
                                className="ball"
                            >
                                {ball}
                            </motion.div>
                        ))}
                        {/* Отображаем последний шар из второго массива, если он существует */}
                        {results.results[1] && results.results[1].length > 0 && (
                            <motion.div
                                key="highlighted-ball"
                                initial={{y: -50, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: results.results[0].length * 0.2}}
                                className="highlighted-ball"
                            >
                                {results.results[1][0]}
                            </motion.div>
                        )}
                    </>
                ) : (
                    // Отображаем одномерный массив для Game 16
                    <>
                        {results.results[0].map((ball, index) => (
                            <motion.div
                                key={index}
                                initial={{y: -50, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: index * 0.2}}
                                className="ball"
                            >
                                {ball}
                            </motion.div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default ResultsViewer;