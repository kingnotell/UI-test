import React, { useState, useRef, useEffect } from 'react';

interface RadialChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
    category: string;
  }>;
  centerValue?: string;
  centerLabel?: string;
  className?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({ 
  data, 
  centerValue = "$101,491", 
  centerLabel = "BTC",
  className = '' 
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const size = Math.min(container.clientWidth - 40, 600);
          setDimensions({ width: size, height: size });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 40;
  const innerRadius = outerRadius * 0.3;
  const middleRadius = outerRadius * 0.65;

  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2; // Start from top

  const segments = data.map((item, index) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    // Calculate path for outer ring
    const x1 = centerX + Math.cos(startAngle) * innerRadius;
    const y1 = centerY + Math.sin(startAngle) * innerRadius;
    const x2 = centerX + Math.cos(endAngle) * innerRadius;
    const y2 = centerY + Math.sin(endAngle) * innerRadius;
    const x3 = centerX + Math.cos(endAngle) * outerRadius;
    const y3 = centerY + Math.sin(endAngle) * outerRadius;
    const x4 = centerX + Math.cos(startAngle) * outerRadius;
    const y4 = centerY + Math.sin(startAngle) * outerRadius;

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    // Calculate radial lines
    const lineCount = Math.max(3, Math.floor(angle * 20));
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const lineAngle = startAngle + (angle * i) / (lineCount - 1);
      const lineStartRadius = outerRadius + 10;
      const lineEndRadius = outerRadius + 20 + Math.random() * 40;
      
      lines.push({
        x1: centerX + Math.cos(lineAngle) * lineStartRadius,
        y1: centerY + Math.sin(lineAngle) * lineStartRadius,
        x2: centerX + Math.cos(lineAngle) * lineEndRadius,
        y2: centerY + Math.sin(lineAngle) * lineEndRadius
      });
    }

    // Label position
    const labelAngle = startAngle + angle / 2;
    const labelRadius = outerRadius + 60;
    const labelX = centerX + Math.cos(labelAngle) * labelRadius;
    const labelY = centerY + Math.sin(labelAngle) * labelRadius;

    return {
      ...item,
      pathData,
      lines,
      labelX,
      labelY,
      startAngle,
      endAngle,
      index
    };
  });

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Background circles */}
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRadius}
          fill="none"
          stroke="#333333"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={middleRadius}
          fill="none"
          stroke="#333333"
          strokeWidth="1"
          opacity="0.2"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke="#333333"
          strokeWidth="1"
          opacity="0.1"
        />

        {/* Radial grid lines */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <line
              key={i}
              x1={centerX + Math.cos(angle) * innerRadius}
              y1={centerY + Math.sin(angle) * innerRadius}
              x2={centerX + Math.cos(angle) * outerRadius}
              y2={centerY + Math.sin(angle) * outerRadius}
              stroke="#333333"
              strokeWidth="0.5"
              opacity="0.2"
            />
          );
        })}

        {/* Data segments */}
        {segments.map((segment) => (
          <g key={segment.index}>
            {/* Main segment */}
            <path
              d={segment.pathData}
              fill={segment.color}
              stroke="#000000"
              strokeWidth="2"
              opacity={hoveredSegment === segment.index ? 0.9 : 0.7}
              onMouseEnter={() => setHoveredSegment(segment.index)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="transition-opacity duration-200 cursor-pointer"
            />

            {/* Radial lines extending outward */}
            {segment.lines.map((line, lineIndex) => (
              <line
                key={lineIndex}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={segment.color}
                strokeWidth="1"
                opacity="0.6"
              />
            ))}

            {/* Labels */}
            <text
              x={segment.labelX}
              y={segment.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-white font-medium"
              opacity="0.8"
            >
              {segment.name}
            </text>
            <text
              x={segment.labelX}
              y={segment.labelY + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-400"
            >
              {segment.value}%
            </text>
          </g>
        ))}

        {/* Center circle with value */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius * 0.8}
          fill="#000000"
          stroke="#333333"
          strokeWidth="2"
        />
        
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold fill-white"
        >
          {centerValue}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm fill-gray-400"
        >
          {centerLabel}
        </text>
      </svg>
    </div>
  );
};

export default RadialChart;