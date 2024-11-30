import { useState, useCallback } from 'react';

export const usePageFlip = (initialPage: number, totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageTransition, setPageTransition] = useState('');

  const flipPage = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages - 1) {
      setPageTransition('animate-flip-right');
      setTimeout(() => {
        setCurrentPage(prev => prev + 2);
        setPageTransition('');
      }, 300);
    } else if (direction === 'prev' && currentPage > 1) {
      setPageTransition('animate-flip-left');
      setTimeout(() => {
        setCurrentPage(prev => prev - 2);
        setPageTransition('');
      }, 300);
    }
  }, [currentPage, totalPages]);

  return { currentPage, flipPage, pageTransition };
};