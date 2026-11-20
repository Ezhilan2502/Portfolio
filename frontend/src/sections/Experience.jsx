
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Code2,
} from "lucide-react";

import { getExperience } from "../services/api";
import Loader from "../components/Loader";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchExperience = async () => {
      try {
        const response = await getExperience();

        if (active) {
          setExperiences(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error("Experience API error:", err);
        if (active) setError("Unable to load experience details.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchExperience();

    return () => {
      active = false;
    };
  }, []);

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">MY CAREER JOURNEY</span>
          <h2>Professional <span>Experience</span></h2>
          <p>
            My professional journey, responsibilities and experience
            in software development.
          </p>
        </motion.div>

        {loading ? (
          <Loader message="Loading experience..." />
        ) : error ? (
          <p className="section-status">{error}</p>
        ) : experiences.length === 0 ? (
          <p className="section-status">
            Experience details will be displayed here soon.
          </p>
        ) : (
          <div className="experience-timeline">
            {experiences.map((item, index) => {
              const responsibilities = item.responsibilities
                ? item.responsibilities
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                : [];

              return (
                <motion.article
                  className="experience-card"
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                >
                  <span className="experience-dot" />

                  <div className="experience-date">
                    <CalendarDays size={15} />

                    {formatDate(item.start_date)}
                    {" – "}
                    {item.currently_working
                      ? "Present"
                      : formatDate(item.end_date)}
                  </div>

                  <h3>{item.role}</h3>

                  <h4>
                    <BriefcaseBusiness
                      size={15}
                      style={{
                        display: "inline",
                        marginRight: "7px",
                      }}
                    />
                    {item.company}
                  </h4>

                  {item.location && (
                    <p className="experience-location">
                      <MapPin
                        size={14}
                        style={{
                          display: "inline",
                          marginRight: "6px",
                        }}
                      />
                      {item.location}
                    </p>
                  )}

                  {item.description && (
                    <p>{item.description}</p>
                  )}

                  {responsibilities.length > 0 && (
                    <ul className="experience-responsibilities">
                      {responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  )}

                  {item.technologies && (
                    <div className="experience-technologies">
                      <Code2 size={15} />
                      <span>{item.technologies}</span>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
