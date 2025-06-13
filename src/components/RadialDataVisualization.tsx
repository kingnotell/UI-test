import React, { useState, useRef, useEffect } from 'react';

interface RadialDataPoint {
  name: string;
  value: number;
  change: number;
  volume: string;
  category: string;
}

interface RadialDataVisualizationProps {
  data: RadialDataPoint[];
  centerValue?: string;
  centerLabel?: string;
  className?: string;
}

const RadialDataVisualization: React.FC<RadialDataVisualizationProps> = ({ 
  data, 
  centerValue = "$101,491", 
  centerLabel = "NEURAL.CORE",
  className = '' 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
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

  // Slow rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 80;

  // Position data points around the circle
  const angleStep = (2 * Math.PI) / data.length;
  const dataPoints = data.map((item, index) => {
    const angle = index * angleStep + (rotation * Math.PI) / 180;
    
    return {
      ...item,
      angle,
      index,
      // Calculate spike positions
      spikes: Array.from({ length: Math.max(8, Math.floor(item.value / 5)) }, (_, spikeIndex) => {
        const spikeAngle = angle + (Math.PI / 12) * (spikeIndex / 8 - 0.5);
        const baseRadius = radius * 0.7;
        const spikeLength = (item.value / 100) * 120 + 20;
        
        return {
          x1: centerX + Math.cos(spikeAngle) * baseRadius,
          y1: centerY + Math.sin(spikeAngle) * baseRadius,
          x2: centerX + Math.cos(spikeAngle) * (baseRadius + spikeLength),
          y2: centerY + Math.sin(spikeAngle) * (baseRadius + spikeLength),
          opacity: 0.3 + (spikeIndex / 8) * 0.7
        };
      }),
      // Node position
      x: centerX + Math.cos(angle) * radius * 0.8,
      y: centerY + Math.sin(angle) * radius * 0.8
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
        style={{ background: '#000000' }}
      >
        <defs>
          {/* White glow filter */}
          <filter id="whiteGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Subtle glow */}
          <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background concentric circles */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={radius * ratio}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity={0.05 + i * 0.02}
            strokeDasharray={i % 2 === 0 ? "5,5" : "none"}
          />
        ))}

        {/* Rotating radial lines */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          {Array.from({ length: 36 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 36;
            return (
              <line
                key={i}
                x1={centerX + Math.cos(angle) * radius * 0.15}
                y1={centerY + Math.sin(angle) * radius * 0.15}
                x2={centerX + Math.cos(angle) * radius}
                y2={centerY + Math.sin(angle) * radius}
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.05"
              />
            );
          })}
        </g>

        {/* Data spikes extending outward */}
        {dataPoints.map((point) => (
          <g key={`spikes-${point.index}`}>
            {point.spikes.map((spike, spikeIndex) => (
              <line
                key={spikeIndex}
                x1={spike.x1}
                y1={spike.y1}
                x2={spike.x2}
                y2={spike.y2}
                stroke="#ffffff"
                strokeWidth="1"
                opacity={spike.opacity * (hoveredIndex === point.index ? 1 : 0.6)}
                filter={hoveredIndex === point.index ? "url(#subtleGlow)" : undefined}
                className="transition-all duration-300"
              />
            ))}
          </g>
        ))}

        {/* Connection lines from center to data points */}
        {dataPoints.map((point) => (
          <line
            key={`connection-${point.index}`}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="#ffffff"
            strokeWidth={hoveredIndex === point.index ? 2 : 1}
            opacity={hoveredIndex === point.index ? 0.8 : 0.2}
            filter={hoveredIndex === point.index ? "url(#subtleGlow)" : undefined}
            className="transition-all duration-300"
          />
        ))}

        {/* Data nodes */}
        {dataPoints.map((point) => {
          const isHovered = hoveredIndex === point.index;
          const nodeSize = 6 + (point.value / 100) * 8;
          
          return (
            <g key={point.index}>
              {/* Node outer ring */}
              {isHovered && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={nodeSize + 8}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.6"
                  filter="url(#whiteGlow)"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeSize + 5};${nodeSize + 15};${nodeSize + 5}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              
              {/* Main node */}
              <circle
                cx={point.x}
                cy={point.y}
                r={nodeSize}
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2"
                opacity={isHovered ? 1 : 0.8}
                filter="url(#subtleGlow)"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(point.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              
              {/* Node center */}
              <circle
                cx={point.x}
                cy={point.y}
                r={nodeSize * 0.3}
                fill="#000000"
              />
              
              {/* Node label */}
              {isHovered && (
                <g>
                  <text
                    x={point.x}
                    y={point.y - nodeSize - 20}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white"
                    filter="url(#whiteGlow)"
                  >
                    {point.name}
                  </text>
                  <text
                    x={point.x}
                    y={point.y - nodeSize - 8}
                    textAnchor="middle"
                    className="text-xs fill-white"
                    opacity="0.8"
                  >
                    {point.change >= 0 ? '+' : ''}{point.change.toFixed(2)}%
                  </text>
                  <text
                    x={point.x}
                    y={point.y - nodeSize + 4}
                    textAnchor="middle"
                    className="text-xs fill-white"
                    opacity="0.6"
                  >
                    VOL: {point.volume}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Central core */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.12}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="3"
          filter="url(#whiteGlow)"
        />

        {/* Rotating inner core */}
        <g transform={`rotate(${-rotation * 2} ${centerX} ${centerY})`}>
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.08}
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeDasharray="8,4"
          />
        </g>
        
        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="text-lg font-bold fill-black"
        >
          {centerValue}
        </text>
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          className="text-sm fill-black"
        >
          {centerLabel}
        </text>
      </svg>
    </div>
  );
};

export default RadialDataVisualization;