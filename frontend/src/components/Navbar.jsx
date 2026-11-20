
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Certifications", id: "certifications" },
  { name: "Contact", id: "contact" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);

        if (section && window.scrollY >= section.offsetTop - 180) {
          current = link.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <button
          className="navbar-logo"
          onClick={() => handleNavigation("home")}
          aria-label="Go to home"
        >
          <span className="logo-icon">
            <Code2 size={21} />
          </span>
          <span>Ezhilan<span className="logo-highlight"></span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={
                activeSection === link.id
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={() => handleNavigation(link.id)}
            >
              {link.name}
            </button>
          ))}

          <button
            className="mobile-talk-button"
            onClick={() => handleNavigation("contact")}
          >
            Let's Talk <ArrowUpRight size={16} />
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            className="talk-button"
            onClick={() => handleNavigation("contact")}
          >
            Let's Talk <ArrowUpRight size={16} />
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
