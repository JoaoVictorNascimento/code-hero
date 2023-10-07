import { useEffect, useState } from 'react';

function useIsCurrentScreenWidth(screenWidth: number) {
  const [isCurrentScreenWidth, setIsCurrentScreenWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMatchingScreenWidth = window.innerWidth === screenWidth;

      setIsCurrentScreenWidth(isMatchingScreenWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  return isCurrentScreenWidth;
}

export default useIsCurrentScreenWidth;