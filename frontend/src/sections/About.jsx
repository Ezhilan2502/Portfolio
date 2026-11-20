
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  BrainCircuit,
  Server,
  Rocket,
} from "lucide-react";

import { getProfile } from "../services/api";
import Loader from "../components/Loader";

const highlights = [
  {
    icon: Code2,
    title: "Python Development",
    description:
      "Building scalable applications, backend systems and REST APIs.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description:
      "Exploring predictive models and intelligent AI-powered solutions.",
  },
  {
    icon: Database,
    title: "Database Management",
    description:
      "Working with SQL, PostgreSQL and relational databases.",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Developing robust applications using Django and Django REST Framework.",
  },
];

const strengths = [
  "Python Programming",
  "Django & REST APIs",
  "SQL & Database Management",
  "Machine Learning",
  "Deep Learning"
];

function About() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        if (active) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("About profile API error:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  const aboutText =
    profile?.about ||
    "I am an AI and Machine Learning enthusiast with a strong foundation in Python development, SQL and backend engineering. I enjoy building reliable applications, developing REST APIs, exploring Machine Learning algorithms and transforming ideas into practical intelligent solutions.";

  return (
    <section id="about" className="about-section">
      <div className="container">

        {/* SECTION HEADING */}

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">
            GET TO KNOW ME
          </span>

          <h2>
            About <span>Me</span>
          </h2>

          <p>
            A little about my professional journey, technical
            interests and the things I enjoy building.
          </p>
        </motion.div>

        <div className="about-grid">

          {/* ABOUT VISUAL */}

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-visual-card">
              <div className="about-code-visual">

                <BrainCircuit
                  size={90}
                  strokeWidth={1.3}
                />

                <div className="about-code-caption">
                  <span>Python</span>
                  <span>Machine Learning</span>
                  <span>Deep Learning</span>
                </div>

              </div>
            </div>

            <div className="about-floating-badge">
              <Rocket size={17} />
              Always Learning
            </div>
          </motion.div>

          {/* ABOUT CONTENT */}

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-subtitle">
              WHO I AM
            </span>

            <h3>
              Passionate about building
              <span className="gradient-text">
                {" "}intelligent solutions.
              </span>
            </h3>

            {loading ? (
              <Loader message="Loading introduction..." />
            ) : (
              <p>{aboutText}</p>
            )}

            <p>
              My interests include Python development, backend
              engineering, API development, database systems,
              Machine Learning, Deep Learning and emerging AI
              technologies. I continuously improve my technical
              skills through practical projects and hands-on learning.
            </p>

            <div className="about-strengths">
              {strengths.map((strength) => (
                <div
                  className="about-strength"
                  key={strength}
                >
                  <span className="strength-dot" />
                  {strength}
                </div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* TECHNICAL HIGHLIGHTS */}

        <div className="about-highlights-grid">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="about-highlight-card"
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
              >
                <div className="about-highlight-icon">
                  <Icon size={24} />
                </div>

                <h4>{item.title}</h4>

                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default About;
