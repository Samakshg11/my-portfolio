import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const CONTACT_LINK_REL = "noopener noreferrer";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:samakshgarg2005@gmail.com" data-cursor="disable">
                samakshgarg2005@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>BTech in Computer Science</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Samakshg11"
              target="_blank"
              rel={CONTACT_LINK_REL}
              data-cursor="disable"
              className="contact-social"
              aria-label="Open GitHub profile"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/samaksh-garg-/"
              target="_blank"
              rel={CONTACT_LINK_REL}
              data-cursor="disable"
              className="contact-social"
              aria-label="Open LinkedIn profile"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/samaksh.____"
              target="_blank"
              rel={CONTACT_LINK_REL}
              data-cursor="disable"
              className="contact-social"
              aria-label="Open Instagram profile"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Samaksh Garg</span>
            </h2>
            <h5>
              <MdCopyright /> {currentYear}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
