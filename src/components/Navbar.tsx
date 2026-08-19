import { useEffect, type MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

type SmootherController = {
  paused: (_value: boolean) => void;
  scrollTop: (value: number) => void;
  scrollTo: (section: string | null) => void;
  refresh: () => void;
};

export const smoother: SmootherController = {
  paused: () => {},
  scrollTop: (value: number) => window.scrollTo({ top: value, behavior: "auto" }),
  scrollTo: (section) => {
    if (!section) return;
    const target = document.querySelector(section);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  refresh: () => ScrollTrigger.refresh(),
};

const Navbar = () => {
  useEffect(() => {
    smoother.scrollTop(0);
    smoother.paused(true);

    const handleResize = () => smoother.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSectionNavigation = (section: string) => (
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    if (window.innerWidth <= 1024) return;
    e.preventDefault();
    smoother.scrollTo(section);
  };

  return (
    <>
      <nav className="header" aria-label="Main navigation">
        <a href="/#" className="navbar-title" data-cursor="disable" aria-label="Go to top">
          SG
        </a>
        <a
          href="mailto:samakshgarg2005@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          aria-label="Email Samaksh Garg"
        >
          samakshgarg2005@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about" onClick={handleSectionNavigation("#about")}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={handleSectionNavigation("#work")}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              data-href="#contact"
              href="#contact"
              onClick={handleSectionNavigation("#contact")}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
