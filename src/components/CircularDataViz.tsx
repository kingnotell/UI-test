import React, { useState, useRef, useEffect } from 'react';

interface DataPoint {
  name: string;
  value: number;
  change: number;
  volume: string;
}

interface CircularDataVizProps {
  data: DataPoint[];
  className?: string;
}

const CircularDataViz: React.FC<CircularDataVizProps> = ({ data, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const size = Math.min(container.clientWidth - 40, 500);
          setDimensions({ width: size, height: size });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  // Create concentric rings
  const rings = [
    { radius: radius * 0.3, color: '#00ff88', opacity: 0.8 },
    { radius: radius * 0.5, color: '#00aaff', opacity: 0.6 },
    { radius: radius * 0.7, color: '#ff6600', opacity: 0.4 },
    { radius: radius * 0.9, color: '#ff0088', opacity: 0.3 }
  ];

  // Position data points around circles
  const angleStep = (2 * Math.PI) / data.length;
  const dataPoints = data.map((item, index) => {
    const angle = index * angleStep + (rotation * Math.PI) / 180;
    const pointRadius = radius * (0.6 + (item.value / 100) * 0.3);
    
    return {
      ...item,
      x: centerX + Math.cos(angle) * pointRadius,
      y: centerY + Math.sin(angle) * pointRadius,
      angle,
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
        <defs>
          {/* Radial gradient */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00aaff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>
          
          {/* Glow filter */}
          <filter id="dataGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circles */}
        {rings.map((ring, index) => (
          <circle
            key={index}
            cx={centerX}
            cy={centerY}
            r={ring.radius}
            fill="none"
            stroke={ring.color}
            strokeWidth="1"
            opacity={ring.opacity}
            strokeDasharray={index % 2 === 0 ? "5,5" : "none"}
          />
        ))}

        {/* Radial lines */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * Math.PI * 2) / 24 + (rotation * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={centerX + Math.cos(angle) * radius * 0.2}
              y1={centerY + Math.sin(angle) * radius * 0.2}
              x2={centerX + Math.cos(angle) * radius}
              y2={centerY + Math.sin(angle) * radius}
              stroke="#333333"
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}

        {/* Center gradient */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.2}
          fill="url(#centerGradient)"
        />

        {/* Data points */}
        {dataPoints.map((point) => {
          const isHovered = hoveredIndex === point.index;
          const pointSize = 4 + (point.value / 100) * 8;
          const color = point.change >= 0 ? '#00ff88' : '#ff0088';
          
          return (
            <g key={point.index}>
              {/* Connection line to center */}
              <line
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke={color}
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 0.8 : 0.3}
                className="transition-all duration-300"
              />
              
              {/* Data point */}
              <circle
                cx={point.x}
                cy={point.y}
                r={pointSize}
                fill={color}
                stroke="#000000"
                strokeWidth="1"
                opacity={isHovered ? 1 : 0.8}
                filter={isHovered ? "url(#dataGlow)" : undefined}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(point.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              
              {/* Pulse animation for hovered point */}
              {isHovered && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={pointSize}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values={`${pointSize};${pointSize + 10};${pointSize}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              
              {/* Label */}
              {isHovered && (
                <g>
                  <text
                    x={point.x}
                    y={point.y - pointSize - 15}
                    textAnchor="middle"
                    className="text-xs fill-white font-medium"
                  >
                    {point.name}
                  </text>
                  <text
                    x={point.x}
                    y={point.y - pointSize - 5}
                    textAnchor="middle"
                    className="text-xs fill-gray-400"
                  >
                    {point.change >= 0 ? '+' : ''}{point.change.toFixed(2)}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="text-lg font-bold fill-white"
        >
          CRYPTO
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="text-sm fill-gray-400"
        >
          MARKET
        </text>
      </svg>
    </div>
  );
};

export default CircularDataViz;