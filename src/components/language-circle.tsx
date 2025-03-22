import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Code, Code2, Braces, FileCode, Hash } from 'lucide-react';
import { GrReactjs } from 'react-icons/gr';
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

interface ProgrammingLanguage {
  name: string;
  color: string;
  icon: React.ReactNode;
}

interface RotatingLanguagesProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  rotationSpeed?: number;
}

const RotatingLanguages: React.FC<RotatingLanguagesProps> = ({
  width = "100%",
  height = 400,
  className = "",
  rotationSpeed = 60 // seconds per full rotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const languages: ProgrammingLanguage[] = [
    { name: 'JS', color: '#f7df1e', icon: <Braces color="#000000" /> },
    { name: 'TS', color: '#3178c6', icon: <Code color="#ffffff" /> },
    { name: 'Next.js', color: '#000000', icon: <Code2 color="#ffffff" /> },
    { name: 'Golang', color: '#00ADD8', icon: <FileCode color="#ffffff" /> },
    { name: 'C#', color: '#9B4F96', icon: <Hash color="#ffffff" /> },
    { name: "React.JS", icon: <GrReactjs />, color: "#3178c6" }
  ];

  // Get and update container dimensions
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    // Initial size calculation
    updateSize();

    // Update on resize
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate responsive dimensions
  const getResponsiveDimensions = () => {
    const minDimension = Math.min(containerSize.width, containerSize.height);

    // Scale everything based on container size
    return {
      radius: minDimension * 0.32,
      itemSize: minDimension * 0.18,
      centerSize: minDimension * 0.22,
      iconSize: minDimension < 300 ? 16 : minDimension < 500 ? 20 : 24,
      fontSize: minDimension < 300 ? "xs" : "sm"
    };
  };

  const { radius, itemSize, centerSize, iconSize, fontSize } = getResponsiveDimensions();

  // Animation effect for constant rotation
  useEffect(() => {
    const intervalTime = 20; // Update every 20ms for smooth animation
    const rotationIncrement = (360 / (rotationSpeed * 1000)) * intervalTime;

    const interval = setInterval(() => {
      setRotation(prevRotation => (prevRotation + rotationIncrement) % 360);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [rotationSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl  ${className}`}
      style={{
        width,
        height,
        minHeight: 200,
        aspectRatio: width === "100%" ? "1/1" : "auto"
      }}
    >
      {/* 3D perspective container */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
        {/* 3D scene container */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%"
          }}
        >
          {/* Center sphere */}
          <motion.div
            className="rounded-full bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center shadow-xl"
            style={{
              width: centerSize,
              height: centerSize,
              boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)",
              transformStyle: "preserve-3d"
            }}

            transition={{
              type: "tween",
              ease: "linear",
              duration: 0
            }}
          >
            <motion.div
              className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold"
              style={{
                width: centerSize * 0.75,
                height: centerSize * 0.75,
                transformStyle: "preserve-3d"
              }}
            >
              <span className={`text-${fontSize} font-bold text-white`}>Code</span>
            </motion.div>
          </motion.div>

          {/* Rotating items */}
          {containerSize.width > 0 && languages.map((lang, index) => {
            const baseAngle = index * (360 / languages.length);
            const currentAngle = (baseAngle + rotation) * (Math.PI / 180);
            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;
            const isHovered = index === hoverIndex;

            // Skip rendering if container is too small
            if (containerSize.width < 200) return null;

            // Resize icon based on container dimensions
            const IconComponent = React.cloneElement(lang.icon as React.ReactElement, {
              size: iconSize
            });

            return (


              <motion.div
                key={lang.name}
                className="absolute flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer"
                style={{
                  width: itemSize,
                  height: itemSize,
                  backgroundColor: lang.color,
                  color: lang.color === '#f7df1e' ? 'black' : 'white',
                  transformStyle: "preserve-3d",
                  boxShadow: isHovered
                    ? `0 0 15px ${lang.color}88, 0 0 20px ${lang.color}44`
                    : `0 8px 12px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
                }}
                animate={{
                  x,
                  y,
                  rotate: -rotation, // Keep text upright
                }}
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "tween",
                  ease: "linear",
                  duration: 0
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                    <div className="flex flex-col items-center justify-center">

                    <div className="mb-1">{IconComponent}</div>

                    <span className={`font-bold text-xs md:text-md`}>{containerSize.width < 300 ? '' : lang.name}</span>
                    
                    </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{lang.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>

            );
          })}

          {/* Orbit ring */}
          <motion.div
            className="absolute rounded-full border-2 border-blue-400 opacity-20"
            style={{
              width: radius * 2.1,
              height: radius * 2.1,
              transformStyle: "preserve-3d"
            }}
            animate={{
              rotateX: 75,
              rotateY: rotation * 0.5 // Rotate with the orbit
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RotatingLanguages;