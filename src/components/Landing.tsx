import { MouseEvent, PropsWithChildren, useCallback } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleDownloadCV = useCallback(async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/SamakshlatestCV1.pdf");
      if (!response.ok) {
        window.open("/SamakshlatestCV1.pdf", "_blank", "noopener,noreferrer");
        return;
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "SamakshlatestCV1.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open("/SamakshlatestCV1.pdf", "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              <div>SAMAKSH</div>
              <div><span>GARG</span></div>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Full Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Developer</div>
              <div className="landing-h2-2">Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Developer</div>
            </h2>
            <a
              href="/SamakshlatestCV1.pdf"
              download="SamakshlatestCV1.pdf"
              className="landing-cv-btn"
              data-cursor="disable"
              onClick={handleDownloadCV}
            >
              Download CV
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
