import { motion } from "framer-motion";
import TestimonialCard from "../testimonialCard";

const InfiniteMarquee = ({direction,items}) => {
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    const arr = shuffleArray(items)
  const repeatedItems = [...arr, ...arr, ...arr];

  return (
    <div className="marquee-main">
      <motion.div
        className="Scroll-container"
        animate={{ 
          y: direction == "top" ? [-100 * (items.length / repeatedItems.length) + "%",0] : [0, -100 * (items.length / repeatedItems.length) + "%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 400,
          ease: "linear",
        }}
        style={{ width: "fit-content" }}
      >
        {repeatedItems.map((item, idx) => (
          <span
            key={idx}
            className="text-xl font-medium text-gray-800 flex-shrink-0"
          >
          <TestimonialCard item={item} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;