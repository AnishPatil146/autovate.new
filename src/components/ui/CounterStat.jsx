import React, { useState, useEffect, useRef } from 'react';

export default function CounterStat({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const cleanTarget = parseInt(target.toString().replace(/[^0-9]/g, ''), 10) || 0;
    
    const startCounter = () => {
      let startTimestamp = null;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * cleanTarget);
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(cleanTarget);
        }
      };
      
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startCounter();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration]);

  // Format with commas (e.g. 10000 -> 10,000)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span ref={elementRef} className="font-mono">
      {formatNumber(count)}{suffix}
    </span>
  );
}
