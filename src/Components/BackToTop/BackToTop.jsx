import React, { useEffect, useState } from 'react';
import './BackToTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function BackToTop() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        // Show button after scrolling 300px down
            if (window.scrollY > 700) {
                setIsVisible(true);
            }else {
                setIsVisible(false);
            }
        };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <button
      className={`scrollToTop ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className=' text-white' />
    </button>
  );
}
