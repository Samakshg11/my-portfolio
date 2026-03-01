import { useEffect } from "react";
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

    const links = document.querySelectorAll(".header ul a");
    const handleResize = () => smoother.refresh();

    const linkHandlers: Array<{
      element: HTMLAnchorElement;
      handleClick: (e: Event) => void;
    }> = [];

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handleClick = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const link = e.currentTarget as HTMLAnchorElement;
          const section = link.getAttribute("data-href");
          smoother.scrollTo(section);
        }
      };
      element.addEventListener("click", handleClick);
      linkHandlers.push({ element, handleClick });
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      linkHandlers.forEach(({ element, handleClick }) => {
        element.removeEventListener("click", handleClick);
      });
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SG
        </a>
        <a
          href="mailto:rajeshchittyal21@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          samakshgarg2005@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
