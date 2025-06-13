import React, { useState, useRef, useEffect } from 'react';

interface CyberDataPoint {
  name: string;
  value: number;
  change: number;
  volume: string;
  aiScore: number;
}

interface CyberCircularVizProps {
  data: CyberDataPoint[];
  className?: string;
}

const CyberCircularViz: React.FC<CyberCircularVizProps> = ({ data, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [scanLine, setScanLine] = useState(0);
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

  // Cyberpunk animations
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.4) % 360);
      setScanLine(prev => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 80;

  // Create cyberpunk rings
  const rings = [
    { radius: radius * 0.2, color: '#00ffff', opacity: 0.9, pattern: 'solid' },
    { radius: radius * 0.4, color: '#0080ff', opacity: 0.7, pattern: 'dashed' },
    { radius: radius * 0.6, color: '#8000ff', opacity: 0.5, pattern: 'dotted' },
    { radius: radius * 0.8, color: '#ff00ff', opacity: 0.4, pattern: 'dashed' },
    { radius: radius * 1.0, color: '#ff6600', opacity: 0.3, pattern: 'solid' }
  ];

  // Position data points around circles
  const angleStep = (2 * Math.PI) / data.length;
  const dataPoints = data.map((item, index) => {
    const angle = index * angleStep + (rotation * Math.PI) / 180;
    const pointRadius = radius * (0.5 + (item.value / 100) * 0.4);
    
    return {
      ...item,
      x: centerX + Math.cos(angle) * pointRadius,
      y: centerY + Math.sin(angle) * pointRadius,
      angle,
      index
    };
  });

  return (
    <div className={`relative ${className}`} style={{ background: '#000000' }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        style={{ background: '#000000' }}
      >
        <defs>
          {/* Cyberpunk gradients */}
          <radialGradient id="cyberCenterGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1"/>
            <stop offset="30%" stopColor="#0080ff" stopOpacity="0.8"/>
            <stop offset="70%" stopColor="#8000ff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>
          
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0"/>
          </linearGradient>

          {/* Glow filters */}
          <filter id="cyberDataGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="scanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background cyberpunk rings */}
        {rings.map((ring, index) => (
          <circle
            key={index}
            cx={centerX}
            cy={centerY}
            r={ring.radius}
            fill="none"
            stroke={ring.color}
            strokeWidth="2"
            opacity={ring.opacity}
            strokeDasharray={
              ring.pattern === 'dashed' ? "10,5" : 
              ring.pattern === 'dotted' ? "2,8" : "none"
            }
            filter="url(#cyberDataGlow)"
          />
        ))}

        {/* Rotating radial scan lines */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          {Array.from({ length: 48 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 48;
            return (
              <line
                key={i}
                x1={centerX + Math.cos(angle) * radius * 0.15}
                y1={centerY + Math.sin(angle) * radius * 0.15}
                x2={centerX + Math.cos(angle) * radius}
                y2={centerY + Math.sin(angle) * radius}
                stroke="#00ffff"
                strokeWidth="0.5"
                opacity="0.2"
              />
            );
          })}
        </g>

        {/* Scanning beam */}
        <g transform={`rotate(${scanLine} ${centerX} ${centerY})`}>
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + radius}
            y2={centerY}
            stroke="url(#scanGradient)"
            strokeWidth="3"
            opacity="0.8"
            filter="url(#scanGlow)"
          />
        </g>

        {/* Central core */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.12}
          fill="url(#cyberCenterGradient)"
          filter="url(#cyberDataGlow)"
        />

        {/* Rotating inner core */}
        <g transform={`rotate(${-rotation * 1.5} ${centerX} ${centerY})`}>
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.08}
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.8"
          />
        </g>

        {/* Data points */}
        {dataPoints.map((point) => {
          const isHovered = hoveredIndex === point.index;
          const pointSize = 6 + (point.value / 100) * 12;
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
                strokeWidth={isHovered ? 3 : 1}
                opacity={isHovered ? 0.9 : 0.4}
                filter="url(#cyberDataGlow)"
                className="transition-all duration-300"
              />
              
              {/* Data point outer ring */}
              {isHovered && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={pointSize + 8}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  opacity="0.6"
                  filter="url(#cyberDataGlow)"
                >
                  <animate
                    attributeName="r"
                    values={`${pointSize + 5};${pointSize + 15};${pointSize + 5}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              
              {/* Main data point */}
              <circle
                cx={point.x}
                cy={point.y}
                r={pointSize}
                fill={color}
                stroke="#000000"
                strokeWidth="2"
                opacity={isHovered ? 1 : 0.8}
                filter="url(#cyberDataGlow)"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(point.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              
              {/* AI score indicator */}
              <circle
                cx={point.x}
                cy={point.y}
                r={pointSize * 0.4}
                fill="#000000"
                opacity="0.8"
              />
              <text
                x={point.x}
                y={point.y + 2}
                textAnchor="middle"
                className="text-xs font-bold fill-white"
              >
                {point.aiScore}
              </text>
              
              {/* Cyberpunk data label */}
              {isHovered && (
                <g>
                  <text
                    x={point.x}
                    y={point.y - pointSize - 20}
                    textAnchor="middle"
                    className="text-sm font-bold fill-cyan-400"
                    filter="url(#cyberDataGlow)"
                  >
                    {point.name}.AI
                  </text>
                  <text
                    x={point.x}
                    y={point.y - pointSize - 8}
                    textAnchor="middle"
                    className="text-xs fill-cyan-300"
                  >
                    {point.change >= 0 ? '+' : ''}{point.change.toFixed(2)}%
                  </text>
                  <text
                    x={point.x}
                    y={point.y - pointSize + 4}
                    textAnchor="middle"
                    className="text-xs fill-cyan-500"
                  >
                    VOL: {point.volume}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center AI text */}
        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="text-lg font-bold fill-cyan-400"
          filter="url(#cyberDataGlow)"
        >
          AI
        </text>
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          className="text-sm fill-cyan-300"
        >
          CORE
        </text>
        <text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          className="text-xs fill-cyan-500"
        >
          NEURAL
        </text>
      </svg>
    </div>
  );
};

export default CyberCircularViz;