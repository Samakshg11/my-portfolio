import { type MouseEvent, type PropsWithChildren, useCallback } from "react";
import "./styles/Landing.css";

const CV_FILE_PATH = "/SamakshlatestCV1.pdf";
const CV_DOWNLOAD_NAME = "SamakshlatestCV1.pdf";

const Landing = ({ children }: PropsWithChildren) => {
  const handleDownloadCV = useCallback(async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(CV_FILE_PATH);
      if (!response.ok) {
        window.open(CV_FILE_PATH, "_blank", "noopener,noreferrer");
        return;
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = CV_DOWNLOAD_NAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(CV_FILE_PATH, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1>
            <span>SAMAKSH</span>
            <span>
              <span>GARG</span>
            </span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>A Full Stack</h3>
          <h2 className="landing-info-h2">
            <span className="landing-h2-1">Developer</span>
            <span className="landing-h2-2">Engineer</span>
          </h2>
          <h2>
            <span className="landing-h2-info">Engineer</span>
            <span className="landing-h2-info-1">Developer</span>
          </h2>
          <a
            href={CV_FILE_PATH}
            download={CV_DOWNLOAD_NAME}
            className="landing-cv-btn"
            data-cursor="enable"
            aria-label="Download Samaksh Garg CV"
            onClick={handleDownloadCV}
          >
            Download CV
          </a>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
