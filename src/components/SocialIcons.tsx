import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const EXTERNAL_LINK_REL = "noopener noreferrer";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;
      if (!link) return;

      let mouseX = elem.clientWidth / 2;
      let mouseY = elem.clientHeight / 2;
      let currentX = 0;
      let currentY = 0;
      let rafId = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        rafId = window.requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      elem.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanups.push(() => {
        elem.removeEventListener("mousemove", onMouseMove);
        window.cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/Samakshg11" target="_blank" rel={EXTERNAL_LINK_REL}>
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/samaksh-garg-/"
            target="_blank"
            rel={EXTERNAL_LINK_REL}
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/samaksh.____"
            target="_blank"
            rel={EXTERNAL_LINK_REL}
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/SamakshlatestCV1.pdf" download="SamakshlatestCV1.pdf">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
