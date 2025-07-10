// src/components/ImageSlider.tsx
import { useEffect, useState, useRef } from "react";

const images = [
  "/login1.png",
  "login2.jpg",
];

const ImageSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const scrollWidth = 596; // 👉 Slightly less than 616px to show partial next image
      containerRef.current.scrollTo({
        left: index * scrollWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="overflow-x-scroll scrollbar-hide"
      style={{
        width: "616px",
        height: "744px",
        scrollSnapType: "x mandatory",
      }}
      ref={containerRef}
    >
      <div
        className="flex gap-5 pr-5"
        style={{ width: `${images.length * 620}px`, height: "744px" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0  scrollbar-hide"
            style={{
              width: "596px", // 👈 Slightly less to peek next image
              height: "744px",
              scrollSnapAlign: "start",
            }}
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover rounded-3xl shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
