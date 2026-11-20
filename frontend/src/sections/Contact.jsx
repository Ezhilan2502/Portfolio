
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { sendContactMessage } from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const email = "ezhilanarunachalam25@gmail.com";
  const linkedin = "https://www.linkedin.com/in/ezhilan2502/";
  const github = "https://github.com/Ezhilan2502/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessageStatus("");
    setStatusType("");

    try {
      await sendContactMessage(formData);

      setMessageStatus(
        "Your message has been sent successfully. Thank you for reaching out!"
      );
      setStatusType("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact API error:", error);

      const responseData = error.response?.data;

      let errorMessage =
        "Unable to send your message. Please try again.";

      if (responseData && typeof responseData === "object") {
        const messages = Object.values(responseData)
          .flat()
          .filter((value) => typeof value === "string");

        if (messages.length > 0) {
          errorMessage = messages.join(" ");
        }
      }

      if (error.response?.status === 429) {
        errorMessage =
          "Too many messages have been submitted. Please try again later.";
      }

      setMessageStatus(errorMessage);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        {/* SECTION HEADING */}

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">GET IN TOUCH</span>

          <h2>
            Let's Work <span>Together</span>
          </h2>

          <p>
            Have a project, job opportunity or collaboration in mind?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">

          {/* CONTACT INFORMATION */}

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Let's start a conversation</h3>

            <p>
              I'm interested in Python development, backend engineering,
              Machine Learning and AI opportunities. Feel free to contact
              me for professional discussions and collaborations.
            </p>

            {/* EMAIL */}
            <div className="contact-info-item">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ezhilanarunachalam25@gmail.com&su=Portfolio%20Contact"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-icon"
            aria-label="Send email"
            title="Send Email"
            >
            <Mail size={21} />
            </a>

            <div>
            <h4>Email</h4>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ezhilanarunachalam25@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              >
              ezhilanarunachalam25@gmail.com
              </a>
            </div>
            </div>

            {/* LOCATION */}

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <MapPin size={21} />
              </div>

              <div>
                <h4>Location</h4>
                <p>Chennai, India</p>
              </div>
            </div>

            {/* LINKEDIN */}

            <div className="contact-info-item">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-icon"
                aria-label="Visit LinkedIn profile"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

              <div>
                <h4>LinkedIn</h4>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* GITHUB */}

            <div className="contact-info-item">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-icon"
                aria-label="Visit GitHub profile"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>

              <div>
                <h4>GitHub</h4>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore my repositories
                </a>
              </div>
            </div>

          </motion.div>

          {/* CONTACT FORM */}

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Send Me a Message</h3>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={5000}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={17} />
              </button>

              {messageStatus && (
                <div
                  className={`contact-status ${statusType}`}
                  role="status"
                  aria-live="polite"
                >
                  {statusType === "success" ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <AlertCircle size={17} />
                  )}

                  <span>{messageStatus}</span>
                </div>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
