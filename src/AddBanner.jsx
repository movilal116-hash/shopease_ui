import { useState, useEffect } from 'react';
import './AddBanner.css';
// import AddBanner from './AdBanner';
export default function AddBanner() {
  const phrases = [
    "I read your business PDF.",
    "I organize your data so the AI can find it instantly.",
    "When a customer asks a question, the AI reads the exact answer and replies safely."
  ];

  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Animation Effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 50); // Typing speed
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 2500); 
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 25); // Deleting speed
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <div className="ad-container">
      {/* Animated Gradient Background */}
      <div className="animated-bg"></div>
      
      {/* Content */}
      <div className="ad-content">
        <h2 className="typing-text">
          {currentText}
          <span className="cursor">|</span>
        </h2>
        
        <div className="freelance-cta">
          <p> <strong>Available for Freelance Contracts</strong></p>
          <p className="sub-text">
            Need a custom AI chatbot for your business? 
            Contact me, and I will analyze your requirements to provide a complete delivery schedule.
          </p>
          <a href="mailto:movilal892@gmail.com" className="hire-btn">Hire Me Now</a>
        </div>
      </div>
    </div>
  );
}


// import './AddBanner.css';

// export default function AddBanner() {
//   return (
//     <div className="ad-container">
//       <div className="animated-bg"></div>
      
//       <div className="ad-content">
//         {/* All 3 phrases are visible, but they animate colors */}
//         <div className="text-group">
//           <h2 className="highlight-text delay-1">
//             I read your business PDF.
//           </h2>
//           <h2 className="highlight-text delay-2">
//             I organize your data so the AI can find it instantly.
//           </h2>
//           <h2 className="highlight-text delay-3">
//             When a customer asks a question, the AI reads the exact answer and replies safely.
//           </h2>
//         </div>
        
//         <div className="freelance-cta">
//           <p>🚀 <strong>Available for Freelance Contracts</strong></p>
//           <p className="sub-text">
//             Need a custom AI chatbot for your business? 
//             Contact me, and I will analyze your requirements to provide a complete delivery schedule.
//           </p>
//           <a href="mailto:movilal892@gmail.com" className="hire-btn">Hire Me Now</a>
//         </div>
//       </div>
//     </div>
//   );
// }


// #################################         part-3
// import './AddBanner.css';

// export default function AddBanner() {
//   return (
//     <div className="ad-container">
//       <div className="animated-bg"></div>
      
//       <div className="ad-content">
//         {/* Color changing text */}
//         <div className="text-group">
//           <h2 className="highlight-text delay-1">
//             I read your business PDF.
//           </h2>
//           <h2 className="highlight-text delay-2">
//             I organize your data so the AI can find it instantly.
//           </h2>
//           <h2 className="highlight-text delay-3">
//             When a customer asks a question, the AI reads the exact answer and replies safely.
//           </h2>
//         </div>
        
//         {/* Freelance CTA */}
//         <div className="freelance-cta">
//           <p> <strong>Available for Freelance Contracts</strong></p>
//           <p className="sub-text">
//             Need a custom AI chatbot for your business? 
//             Contact me, and I will analyze your requirements to provide a complete delivery schedule.
//           </p>
//           <a href="mailto:movilal892@gmail.com" className="hire-btn">Hire Me Now</a>
//         </div>
//       </div>
//     </div>
//   );
// }