// src/components/SlideViewer.js
import React, { useState, useEffect } from 'react';
import './SlideViewer.css?v=1';

function SlideViewer({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Отладка загрузки слайдов
        console.log("Slides loaded:", slides);

        if (slides.length === 0) {
            console.log("No slides available. Waiting for slides to load...");
            return;
        }

        const duration = slides[currentSlide].display_duration * 1000;
        console.log(`Displaying slide ${currentSlide} for ${duration / 1000} seconds`);

        const timer = setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            console.log(`Transitioning to slide ${(currentSlide + 1) % slides.length}`);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentSlide, slides]);

    if (slides.length === 0) {
        return <div>Loading slides...</div>;
    }

    return (
        <div id="carouselExampleCaptions" className="slide-viewer">

            {/* Слайды */}
            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={slide.media_file} className="d-block w-100" alt={slide.title} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{slide.title}</h5>
                            <p>{slide.description || "Placeholder content for this slide."}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SlideViewer;
