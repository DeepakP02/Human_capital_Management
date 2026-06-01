import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

/**
 * StatsCounter - displays an animated number when it comes into view.
 * @param {number} target - final number to count to.
 * @param {string} label - description text displayed below the number.
 * @param {string} suffix - optional suffix to append (e.g., '%').
 * @param {number} duration - animation duration in seconds.
 */
const StatsCounter = ({ target = 0, label = '', suffix = '', prefix = '', duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        count: target,
        transition: { duration, ease: 'easeOut' },
      });
    }
  }, [inView, target, duration, controls]);

  // Animate count when component enters view
  useEffect(() => {
    if (inView) {
      controls.start({
        count: target,
        transition: { duration, ease: 'easeOut' },
        onUpdate: (latest) => {
          if (latest.count !== undefined) setCount(latest.count);
        },
      });
    }
  }, [inView, target, duration, controls]);

  // Format number with commas
  const formatted = new Intl.NumberFormat().format(Math.round(count));

  return (
    <div className="text-center" ref={ref}>
      <p className="text-2xl font-black text-slate-900 dark:text-white">{prefix}
        {formatted}{suffix}
      </p>
      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

export default StatsCounter;
