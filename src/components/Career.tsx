import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Started Learning Web Development</h4>
                <h5>Self Taught</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Began learning HTML, CSS & JavaScript. Built initial
              projects to understand frontend fundamentals and responsive
              design principles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Development</h4>
                <h5>Personal Projects</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Learned React.js, Node.js & MongoDB. Built multiple
              full-stack applications including authentication systems,
              REST APIs, and database-driven apps.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Advanced Projects & 3D Web</h4>
                <h5>Portfolio & Open Source</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building production-ready projects using Next.js, Three.js
              & TypeScript. Exploring 3D web experiences, animations with
              GSAP, and physics-based interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;