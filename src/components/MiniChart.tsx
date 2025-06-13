import React from 'react';

interface MiniChartProps {
  data: number[];
  positive: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, positive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#ffffff' : '#6b7280'}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default MiniChart;