import React from 'react';
import './App.css';
import DataController from './DataController'; // Импортируем DataController вместо Carousel и DrawResults
import 'bootstrap';

function App() {
    return (
        <div className="App">
            <DataController />  {/* DataController теперь управляет показом слайдов и результатов */}
        </div>
    );
}

export default App;
