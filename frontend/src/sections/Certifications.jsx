
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  ExternalLink,
  BadgeCheck,
  Clock,
} from "lucide-react";

import { getCertifications } from "../services/api";
import Loader from "../components/Loader";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchCertifications = async () => {
      try {
        const response = await getCertifications();

        if (active) {
          setCertifications(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error("Certifications API error:", err);

        if (active) {
          setError("Unable to load certifications.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCertifications();

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
    <section id="certifications" className="certifications-section">
      <div className="container">

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">
            CONTINUOUS LEARNING
          </span>

          <h2>
            Certifications & <span>Achievements</span>
          </h2>

          <p>
            Professional certifications and courses that support
            my technical growth and continuous learning.
          </p>
        </motion.div>

        {loading ? (
          <Loader message="Loading certifications..." />
        ) : error ? (
          <p className="section-status">{error}</p>
        ) : certifications.length === 0 ? (
          <p className="section-status">
            Certifications will be displayed here once added.
          </p>
        ) : (
          <div className="certifications-grid">

            {certifications.map((item, index) => (
              <motion.article
                className="certification-card"
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >

                <div className="certification-icon">
                  <Award size={25} />
                </div>

                <div className="certification-status">
                  {item.is_completed ? (
                    <>
                      <BadgeCheck size={15} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock size={15} />
                      In Progress
                    </>
                  )}
                </div>

                <h3>{item.name}</h3>

                <h4>{item.provider}</h4>

                {item.issue_date && (
                  <div className="certification-date">
                    <CalendarDays size={14} />
                    <span>{formatDate(item.issue_date)}</span>
                  </div>
                )}

                {item.credential_id && (
                  <p className="credential-id">
                    Credential ID: {item.credential_id}
                  </p>
                )}

                {item.description && (
                  <p>{item.description}</p>
                )}

                {item.credential_url && (
                  <a
                    href={item.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="certification-link"
                  >
                    View Credential
                    <ExternalLink size={15} />
                  </a>
                )}

              </motion.article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Certifications;
