import React, { ReactNode, useState } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  text?: string;
  children: ReactNode;
  className: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className={styles.tooltipContainer} 
      onMouseEnter={showTooltip} 
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && <div className={`${styles.tooltipText} ${className || ''}`}>{text || children}</div>}
    </div>
  );
};

export default Tooltip;