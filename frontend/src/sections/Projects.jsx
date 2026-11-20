
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  FolderCode,
  ArrowUpRight,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { getProjects } from "../services/api";
import Loader from "../components/Loader";

const BACKEND_URL = "http://127.0.0.1:8000";

function getMediaUrl(value) {
  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BACKEND_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProjects = async () => {
      try {
        const response = await getProjects();

        if (active) {
          setProjects(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Projects API error:", err);
        if (active) setError("Unable to load projects.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">MY RECENT WORK</span>
          <h2>Featured <span>Projects</span></h2>
          <p>
            Practical applications and projects demonstrating my
            development skills and technical knowledge.
          </p>
        </motion.div>

        {loading ? (
          <Loader message="Loading projects..." />
        ) : error ? (
          <p className="section-status">{error}</p>
        ) : projects.length === 0 ? (
          <p className="section-status">
            No featured projects available yet.
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-image">
                  {project.image ? (
                    <img
                      src={getMediaUrl(project.image)}
                      alt={project.title}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <FolderCode
                      className="project-image-placeholder"
                      size={65}
                    />
                  )}
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  {project.technologies?.length > 0 && (
                    <div className="project-tech">
                      {project.technologies.map((technology) => (
                        <span key={technology.id}>
                          {technology.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                        Source Code
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
