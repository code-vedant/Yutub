import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import "../../style/animated.css";

const Heading = ({ children, type = "h2" }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)", y: 0 },
      {
        duration: 0.4,
        ease: "easeInOut",
        delay: stagger(0.02),
      }
    );
  }, [animate]);

  const HeadingTag = type; 

  return (
    <HeadingTag ref={scope} className="animated-para">
      {children.split(" ").map((word, index) => (
        <motion.span
          key={index}
          style={{
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(10px)",
            display: "inline-block",
            marginRight: "6px",
          }}
        >
          {word}
        </motion.span>
      ))}
    </HeadingTag>
  );
};

export default Heading;
