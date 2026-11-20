
import {
  ArrowUp,
  Mail,
  Code2,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const EMAIL = "ezhilanarunachalam25@gmail.com";

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

const quickLinks = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">
            <button
              className="footer-logo"
              onClick={() => scrollToSection("home")}
            >
              <Code2 size={22} />
              Ezhilan<span></span>
            </button>

            <p>
              Building intelligent applications and modern digital
              experiences with Python, AI and Machine Learning.
            </p>

            {/* SOCIAL LINKS */}

            <div className="footer-socials">
              <a
                href="https://github.com/Ezhilan2502/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>

              <a
                href="https://www.linkedin.com/in/ezhilan2502/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                title="Send Email"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div className="footer-navigation">
            <h3>Quick Links</h3>

            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CONTACT */}

          <div className="footer-contact">
            <h3>Let's Connect</h3>

            <p>
              Have an interesting project or opportunity?
            </p>

            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {EMAIL}
            </a>

            <p className="footer-location">
              Chennai, India
            </p>
          </div>

        </div>

        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Ezhilan. All rights reserved.
          </p>

          <button
            className="back-to-top"
            onClick={() => scrollToSection("home")}
            aria-label="Back to top"
          >
            <ArrowUp size={19} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
