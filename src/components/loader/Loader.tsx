import styles from './Loader.module.scss';

export default function Loader(){
  return (
    <div 
      className={styles.loading}
      data-testid="loader"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className={styles.ldsDualRing}
        data-testid="loader-svg"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#167ABC"
          strokeWidth="4"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};