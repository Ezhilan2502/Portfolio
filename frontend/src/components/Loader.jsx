
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-container">
      <motion.div
        className="loader-icon"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <Code2 size={32} />
      </motion.div>

      <p>{message}</p>
    </div>
  );
}

export default Loader;
