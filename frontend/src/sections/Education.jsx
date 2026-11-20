
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  CalendarDays,
  MapPin,
  BookOpen,
  Trophy,
} from "lucide-react";

import { getEducation } from "../services/api";
import Loader from "../components/Loader";

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchEducation = async () => {
      try {
        const response = await getEducation();

        if (active) {
          setEducation(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error("Education API error:", err);
        if (active) {
          setError("Unable to load education details.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchEducation();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="education" className="education-section">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">
            ACADEMIC BACKGROUND
          </span>

          <h2>
            Education & <span>Learning</span>
          </h2>

          <p>
            My academic foundation and continuous learning journey.
          </p>
        </motion.div>

        {loading ? (
          <Loader message="Loading education details..." />
        ) : error ? (
          <p className="section-status">{error}</p>
        ) : education.length === 0 ? (
          <p className="section-status">
            Education details will be updated soon.
          </p>
        ) : (
          <div className="education-grid">
            {education.map((item, index) => (
              <motion.article
                className="education-card"
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
              >
                <div className="education-icon">
                  <GraduationCap size={25} />
                </div>

                <div className="education-content">
                  <div className="education-year">
                    <CalendarDays size={15} />
                    {item.start_year || ""}
                    {item.end_year
                      ? ` – ${item.end_year}`
                      : ""}
                  </div>

                  <h3>{item.degree}</h3>

                  <h4>
                    <BookOpen
                      size={14}
                      style={{
                        display: "inline",
                        marginRight: "6px",
                      }}
                    />
                    {item.institution}
                  </h4>

                  {item.location && (
                    <p className="education-location">
                      <MapPin size={15} />
                      {item.location}
                    </p>
                  )}

                  {item.cgpa && (
                    <p className="education-cgpa">
                      CGPA: <strong>{item.cgpa}</strong>
                    </p>
                  )}

                  {item.achievement && (
                    <div className="education-achievement">
                      <Trophy size={16} />
                      <span>{item.achievement}</span>
                    </div>
                  )}

                  {item.description && (
                    <p className="education-description">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
