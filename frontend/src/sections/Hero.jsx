
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Code2,
  Sparkles,
  Mail,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { getProfile } from "../services/api";
import Loader from "../components/Loader";

const BACKEND_URL = "http://127.0.0.1:8000";

function getMediaUrl(value) {
  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BACKEND_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function Hero() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        if (isMounted) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Profile API error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const name = profile?.name || "Ezhilan";
  const title =
    "Python Developer | AI & Machine Learning Engineer";

  const tagline =
    profile?.tagline ||
    "Python developer specializing in backend development, REST API engineering and database management, with a focus on building intelligent solutions using Machine Learning and AI.";

  const location = profile?.location || "Chennai, India";

  const github = profile?.github_url || "https://github.com/Ezhilan2502/";
  const linkedin =
    profile?.linkedin_url ||
    "https://www.linkedin.com/in/ezhilan2502/";

  const email =
    profile?.email || "ezhilanarunachalam25@gmail.com";

  const resumeUrl =
    profile?.resume_url ||
    "https://drive.google.com/uc?export=download&id=1XDCA0iME7CRBHjEHG8mQ1B8MqtWPQ9zO";

  const profileImage = getMediaUrl(profile?.profile_image);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section id="home" className="hero-section">
        <Loader message="Preparing your portfolio..." />
      </section>
    );
  }

  return (
    <section id="home" className="hero-section">
      <div className="glow-orb" style={{ top: "10%", left: "-10%" }} />
      <div className="glow-orb" style={{ bottom: "5%", right: "-10%" }} />

      <div className="hero-container">
        {/* HERO CONTENT */}

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-availability">
            <span className="availability-dot" />
            Python Developer
            <Sparkles size={14} />
          </div>

          <p className="hero-greeting">Hello, I'm</p>

          <h1>
            {name.split(" ").slice(0, -1).join(" ") || name}{" "}
            <span>
              {name.split(" ").length > 1
                ? name.split(" ").slice(-1).join("")
                : ""}
            </span>
          </h1>

          <h2 className="hero-role">{title}</h2>

          <p className="hero-description">{tagline}</p>

          <div className="hero-location">
            <MapPin size={16} />
            <span>{location}</span>
          </div>

          <div className="hero-buttons">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <Download size={18} />
              Download Resume
            </a>

            <button
              className="btn btn-outline"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              View Projects
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="hero-socials">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Email"
  title="Send Email"
>
  <Mail size={19} />
</a>
          </div>
        </motion.div>

        {/* HERO VISUAL */}

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="hero-image-wrapper">
            {profileImage ? (
              <img
                src={profileImage}
                alt={`${name} profile`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="hero-image-placeholder">
                <Code2 size={100} />
              </div>
            )}

            <div className="hero-image-overlay">
              <span>Building with passion</span>
            </div>
          </div>

          <div className="hero-floating-card one">
            <Code2 size={16} />
            Python Developer
          </div>

          <div className="hero-floating-card two">
            <Sparkles size={16} />
            AI & Machine Learning
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}

      <motion.button
        className="hero-scroll"
        onClick={scrollToAbout}
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        aria-label="Scroll to About section"
      >
        <span>Scroll to explore</span>
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
}

export default Hero;
