import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const BannerSection = ({
  imageUrl,
  height = "90vh",
  className = "",
  children,
  overlay = true,
  overlayStyle = "from-black/80 to-black/60",
  contentPosition = 'center',
  accent = false,
  parallax = false,
  ambientMovement = false,
  glowEffect = false,
  dark = false,
}) => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  const positionClass = {
    'left': 'justify-start text-left',
    'center': 'justify-center text-center',
    'right': 'justify-end text-right',
  }[contentPosition];
  
  useEffect(() => {
    if (!ambientMovement) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ambientMovement]);

  const ambientMovementStyle = ambientMovement ? {
    transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`
  } : {};

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${dark ? 'bg-black' : ''} ${className}`} 
      style={{ height }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={parallax ? { y, scale } : {}}
      >
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            className="w-full h-full"
            style={ambientMovementStyle}
            initial={{ scale: parallax ? 1.1 : 1, opacity: 0.7 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img 
              src={imageUrl} 
              alt="" 
              className={`w-full h-full object-cover ${glowEffect ? 'animate-subtle-glow' : ''}`}
            />
          </motion.div>
          
          {overlay && (
            <div className={`absolute inset-0 bg-gradient-to-b ${overlayStyle}`}></div>
          )}
        </div>
      </motion.div>
      
      {accent && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      )}
      
      {children && (
        <motion.div 
          className={`absolute inset-0 flex items-center ${positionClass} px-4 z-10`}
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default BannerSection;