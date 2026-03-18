import { useState, useCallback, useRef, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "VitalHealth",
    category: "Real-Time Health Monitoring System",
    tools: "Update with your tech stack",
    image: "/images/vitalwatch.png",
  },
  {
    title: "QuickFix",
    category: "Real-Time Mechanic Finder",
    tools: "Update with your tech stack",
    image: "/images/quickfix.png",
  },
  {
    title: "YouTube Clone",
    category: "Video Streaming App",
    tools: "Update with your tech stack",
    image: "/images/youtube.png",
  },
  {
    title: "TaskFlow",
    category: "Smarter Task Management",
    tools: "Update with your tech stack",
    image: "/images/taskflow.png",
  },
  {
    title: "DevTinder",
    category: "Ongoing Project",
    tools: "Update with your tech stack",
    image: "/images/devtinder.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationLockRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (animationLockRef.current || index === currentIndex) return;
      animationLockRef.current = true;
      setCurrentIndex(index);
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }
      unlockTimerRef.current = setTimeout(() => {
        animationLockRef.current = false;
      }, 380);
    },
    [currentIndex]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const startX = event.changedTouches[0]?.clientX;
      touchStartXRef.current = startX ?? null;
      touchCurrentXRef.current = startX ?? null;
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      touchCurrentXRef.current = event.changedTouches[0]?.clientX ?? null;
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartXRef.current === null || touchCurrentXRef.current === null) {
      return;
    }

    const swipeDistance = touchStartXRef.current - touchCurrentXRef.current;
    const swipeThreshold = 45;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  }, [goToNext, goToPrev]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
