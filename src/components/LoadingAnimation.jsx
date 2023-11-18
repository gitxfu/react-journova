import './LoadingAnimation.css'
// Credit: https://codepen.io/ABSamma/pen/NWxpmNR
const LoadingAnimation = () => {
  return (
    <div className="container">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
              floodColor="#6DAA7F"/>
          </filter>
        </defs>
        <circle id="spinner" style={{ fill: 'transparent', stroke: '#6DAA7F', strokeWidth: 7, strokeLinecap: 'round', filter: 'url(#shadow)' }} cx="50" cy="50" r="45"/>
      </svg>
      <h2> Loading ... </h2>
    </div>
  );
};

export default LoadingAnimation;
