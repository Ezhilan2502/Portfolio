
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Code2,
  Monitor,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  ShieldCheck,
  TestTube,
  GitBranch,
  Blocks,
  DatabaseZap,
  Wrench,
} from "lucide-react";

import { getSkills } from "../services/api";
import Loader from "../components/Loader";

// Category configuration

const categoryConfig = {
  machine_learning: {
    title: "AI & Machine Learning",
    subtitle: "INTELLIGENT SYSTEMS & DATA SCIENCE",
    icon: BrainCircuit,
  },

  programming: {
    title: "Programming Language",
    icon: Code2,
  },

  backend: {
    title: "Backend Development",
    icon: Server,
  },

  database: {
    title: "Databases",
    icon: Database,
  },

  nosql: {
    title: "NoSQL Database",
    icon: DatabaseZap,
  },

  frontend: {
    title: "Frontend Development",
    icon: Monitor,
  },

  apis: {
    title: "APIs & Authentication",
    icon: ShieldCheck,
  },

  cloud: {
    title: "Cloud",
    icon: Cloud,
  },

  api_testing: {
    title: "API Testing",
    icon: TestTube,
  },

  version_control: {
    title: "Version Control",
    icon: GitBranch,
  },

  core_concepts: {
    title: "Core Concepts",
    icon: Blocks,
  },

  tools: {
    title: "Tools & Platforms",
    icon: Wrench,
  },
};

// Category display order

const categoryOrder = [
  "machine_learning",
  "programming",
  "backend",
  "database",
  "nosql",
  "frontend",
  "apis",
  "cloud",
  "api_testing",
  "version_control",
  "core_concepts",
  "tools",
];

// Split comma-separated skills into individual names.
// Commas inside parentheses are preserved.

const splitSkillNames = (skills) => {
  return skills.flatMap((skill) => {
    const names = [];
    let current = "";
    let parentheses = 0;

    for (const char of skill.name) {
      if (char === "(") parentheses++;
      if (char === ")") parentheses--;

      if (char === "," && parentheses === 0) {
        if (current.trim()) {
          names.push(current.trim());
        }

        current = "";
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      names.push(current.trim());
    }

    return names;
  });
};

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch skills from Django API

  useEffect(() => {
    let active = true;

    const fetchSkills = async () => {
      try {
        const response = await getSkills();

        if (active) {
          setSkills(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error("Skills API error:", err);

        if (active) {
          setError(
            "Unable to load skills. Please try again later."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      active = false;
    };
  }, []);

  // Group skills by category

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category || "tools";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  // Sort categories according to preferred order

  const sortedCategories = Object.keys(groupedSkills).sort(
    (a, b) => {
      const aIndex = categoryOrder.indexOf(a);
      const bIndex = categoryOrder.indexOf(b);

      return (
        (aIndex === -1 ? 999 : aIndex) -
        (bIndex === -1 ? 999 : bIndex)
      );
    }
  );

  return (
    <section id="skills" className="skills-section">
      <div className="container">

        {/* Section Heading */}

        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">
            MY TECHNICAL EXPERTISE
          </span>

          <h2>
            Skills & <span>Technologies</span>
          </h2>

          <p>
            My technical expertise and technology stack
          </p>
        </motion.div>

        {/* Loading State */}

        {loading ? (
          <Loader message="Loading technical skills..." />

        ) : error ? (

          <p className="section-status">{error}</p>

        ) : skills.length === 0 ? (

          <p className="section-status">
            Skills will be displayed here once added through Django Admin.
          </p>

        ) : (

          <div className="skills-grid">

            {sortedCategories.map((category, index) => {

              const config =
                categoryConfig[category] ||
                categoryConfig.tools;

              const Icon = config.icon;

              const isAI =
                category === "machine_learning";

              // Convert comma-separated names into individual pills

              const skillNames = splitSkillNames(
                groupedSkills[category]
              );

              return (
                <motion.div
                  key={category}
                  className={`skill-category skill-category--${category} ${
                    isAI ? "skill-category-ai" : ""
                  }`}

                  initial={{ opacity: 0, y: 20 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  viewport={{ once: true }}

                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                >

                  {/* Card Header */}

                  <div className="skill-card-top">

                    <div className="skill-card-heading">

                      <div className="skill-category-icon">
                        <Icon
                          size={21}
                          strokeWidth={1.8}
                        />
                      </div>

                      {isAI && (
                        <h3 className="skill-card-title">
                          {config.title}
                        </h3>
                      )}

                    </div>

                    <span className="skill-category-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  {/* Category Title */}

                  {!isAI && (
                    <h3 className="skill-card-title">
                      {config.title}
                    </h3>
                  )}

                  {/* AI Subtitle */}

                  {isAI && (
                    <p className="skill-category-subtitle">
                      {config.subtitle}
                    </p>
                  )}

                  {/* Individual Skill Pills */}

                  <div className="skill-tags">

                    {skillNames.map((name, skillIndex) => (

                      <span
                        className="skill-tag"
                        key={`${category}-${skillIndex}`}
                      >
                        {name}
                      </span>

                    ))}

                  </div>

                </motion.div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;
