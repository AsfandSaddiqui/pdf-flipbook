import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface PageTurnProps {
  children: React.ReactNode;
  progress: number;
  isRight?: boolean;
}

export const PageTurn: React.FC<PageTurnProps> = ({ children, progress, isRight }) => {
  const { transform, opacity } = useSpring({
    transform: `rotateY(${progress * (isRight ? -180 : 180)}deg)`,
    opacity: progress === 0 ? 1 : Math.cos((progress * Math.PI) / 2),
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.div
      className="absolute inset-0"
      style={{
        perspective: '1500px',
        zIndex: progress === 0 ? 1 : 2,
      }}
    >
      <animated.div
        className="w-full h-full"
        style={{
          transform,
          transformOrigin: isRight ? 'left center' : 'right center',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        <animated.div
          className="absolute inset-0 shadow-lg"
          style={{ opacity }}
        >
          {children}
        </animated.div>
        <animated.div
          className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          style={{
            opacity: progress,
            backfaceVisibility: 'hidden',
          }}
        />
      </animated.div>
    </animated.div>
  );
};