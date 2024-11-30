import { useState, useCallback } from 'react';
import { useDrag } from '@use-gesture/react';
import { useSpring } from '@react-spring/web';

export const usePageTurn = (initialPage: number, totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [{ turnProgress }, api] = useSpring(() => ({
    turnProgress: 0,
    config: { tension: 200, friction: 20 }
  }));

  const bind = useDrag(({ movement: [mx], down, cancel }) => {
    if (!down && Math.abs(mx) > 50) {
      const direction = mx > 0 ? 'prev' : 'next';
      turnPage(direction);
      cancel();
    } else {
      api.start({
        turnProgress: down ? Math.min(Math.max(-mx / 100, -1), 1) : 0,
        immediate: down
      });
    }
  });

  const turnPage = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    if (direction === 'next' && currentPage < totalPages) {
      setIsAnimating(true);
      api.start({
        turnProgress: -1,
        onRest: () => {
          setCurrentPage(prev => prev + 1);
          api.start({
            turnProgress: 0,
            immediate: true,
            onRest: () => setIsAnimating(false)
          });
        }
      });
    } else if (direction === 'prev' && currentPage > 1) {
      setIsAnimating(true);
      api.start({
        turnProgress: 1,
        onRest: () => {
          setCurrentPage(prev => prev - 1);
          api.start({
            turnProgress: 0,
            immediate: true,
            onRest: () => setIsAnimating(false)
          });
        }
      });
    }
  }, [currentPage, totalPages, isAnimating, api]);

  return {
    currentPage,
    turnPage,
    bind,
    turnProgress: turnProgress.get(),
    isAnimating
  };
};