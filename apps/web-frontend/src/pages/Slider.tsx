import { useState, useEffect } from 'react';

export default function Slider() {
  const slides = [
    { id: 1, image: '/1.jpg', title: 'First Slide' },
    { id: 2, image: '/2.jpg', title: 'Second Slide' },
    { id: 3, image: '/3.jpg', title: 'Third Slide' },
    { id: 4, image: '/4.jpg', title: 'Fourth Slide' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 5000; // 5 seconds

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index:any) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let intervalId:any;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(intervalId);
  }, [currentSlide, isAutoPlaying]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-xl group">
      {/* Carousel container */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              className="object-cover w-full h-full"
              alt={slide.title}
              loading={index === currentSlide ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 text-center">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}