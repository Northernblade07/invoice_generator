import React from 'react';

interface EclipseProps {
  className?: string;
  blur?: string;
  color?: string;
}

const Eclipse: React.FC<EclipseProps> = ({ className = '', blur = '300px', color = '#FF00FF'}) => {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        backgroundColor: color,
        filter: `blur(${blur})`,
      }}
    ></div>
  );
};

export default Eclipse;
