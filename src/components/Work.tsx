import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "VitalHealth",
    category: "Real-Time Health Monitoring System",
    tools: "Update with your tech stack",
    image: "/images/vitalwatch.png",
    link: "https://health-monitor-p8jz.onrender.com",
    githubLink: "https://github.com/Samakshg11/health-monitor",
  },
  {
    title: "QuickFix",
    category: "Real-Time Mechanic Finder",
    tools: "Update with your tech stack",
    image: "/images/quickfix.png",
    githubLink: "https://github.com/Samakshg11/quickfix-client",
  },
  {
    title: "YouTube Clone",
    category: "Video Streaming App",
    tools: "Update with your tech stack",
    image: "/images/youtube.png",
    link: "https://youtube-clone-459hed950-ssmaksh-gargs-projects.vercel.app",
    githubLink: "https://github.com/Samakshg11/youtube-clone",
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
    githubLink: "https://github.com/Samakshg11/DevTinder-web",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;

      setCurrentIndex(index);

      const container = trackContainerRef.current;
      if (!container) return;

      const slideWidth = container.clientWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
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

  const handleScroll = useCallback(() => {
    const container = trackContainerRef.current;
    if (!container) return;

    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      const slideWidth = container.clientWidth;
      if (slideWidth > 0) {
        const snappedIndex = Math.round(container.scrollLeft / slideWidth);
        const normalizedIndex = Math.min(
          Math.max(snappedIndex, 0),
          projects.length - 1
        );

        setCurrentIndex((prev) =>
          prev === normalizedIndex ? prev : normalizedIndex
        );
      }
      scrollRafRef.current = null;
    });
  }, []);

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
            ref={trackContainerRef}
            onScroll={handleScroll}
          >
            <div className="carousel-track">
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
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                        githubLink={project.githubLink}
                      />
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
