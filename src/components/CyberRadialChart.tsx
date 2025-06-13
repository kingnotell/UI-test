import React, { useState, useRef, useEffect } from 'react';

interface CyberRadialChartProps {
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

const CyberRadialChart: React.FC<CyberRadialChartProps> = ({ 
  data, 
  centerValue = "$101,491", 
  centerLabel = "AI CORE",
  className = '' 
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
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

  // Auto-rotation for cyberpunk effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 60;
  const innerRadius = outerRadius * 0.25;
  const middleRadius = outerRadius * 0.65;

  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2;

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

    // Generate cyberpunk spikes
    const spikeCount = Math.max(8, Math.floor(angle * 30));
    const spikes = [];
    for (let i = 0; i < spikeCount; i++) {
      const spikeAngle = startAngle + (angle * i) / (spikeCount - 1);
      const spikeStartRadius = outerRadius + 5;
      const spikeEndRadius = outerRadius + 15 + Math.random() * 40;
      
      spikes.push({
        x1: centerX + Math.cos(spikeAngle) * spikeStartRadius,
        y1: centerY + Math.sin(spikeAngle) * spikeStartRadius,
        x2: centerX + Math.cos(spikeAngle) * spikeEndRadius,
        y2: centerY + Math.sin(spikeAngle) * spikeEndRadius
      });
    }

    return {
      ...item,
      pathData,
      spikes,
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
        style={{ background: '#000000' }}
      >
        <defs>
          {/* Cyberpunk gradients */}
          <radialGradient id="cyberCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8"/>
            <stop offset="30%" stopColor="#0080ff" stopOpacity="0.6"/>
            <stop offset="70%" stopColor="#8000ff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>
          
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1"/>
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ffff00" stopOpacity="1"/>
          </linearGradient>

          {/* Glow filters */}
          <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Rotating background grid */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          {/* Concentric circles */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={outerRadius * ratio}
              fill="none"
              stroke="#00ffff"
              strokeWidth="1"
              opacity={0.3 - i * 0.05}
              strokeDasharray={i % 2 === 0 ? "5,5" : "2,8"}
              filter="url(#cyberGlow)"
            />
          ))}

          {/* Radial grid lines */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 36;
            return (
              <line
                key={i}
                x1={centerX + Math.cos(angle) * innerRadius}
                y1={centerY + Math.sin(angle) * innerRadius}
                x2={centerX + Math.cos(angle) * outerRadius}
                y2={centerY + Math.sin(angle) * outerRadius}
                stroke="#00ffff"
                strokeWidth="0.5"
                opacity="0.2"
              />
            );
          })}
        </g>

        {/* Data segments */}
        {segments.map((segment) => (
          <g key={segment.index}>
            {/* Main segment */}
            <path
              d={segment.pathData}
              fill={segment.color}
              stroke="#00ffff"
              strokeWidth="2"
              opacity={hoveredSegment === segment.index ? 0.9 : 0.7}
              filter="url(#cyberGlow)"
              onMouseEnter={() => setHoveredSegment(segment.index)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="transition-all duration-300 cursor-pointer"
            />

            {/* Cyberpunk spikes */}
            {segment.spikes.map((spike, spikeIndex) => (
              <line
                key={spikeIndex}
                x1={spike.x1}
                y1={spike.y1}
                x2={spike.x2}
                y2={spike.y2}
                stroke={segment.color}
                strokeWidth="1"
                opacity="0.8"
                filter="url(#cyberGlow)"
              />
            ))}

            {/* Data labels with cyberpunk styling */}
            {hoveredSegment === segment.index && (
              <g>
                <text
                  x={centerX + Math.cos((segment.startAngle + segment.endAngle) / 2) * (outerRadius + 80)}
                  y={centerY + Math.sin((segment.startAngle + segment.endAngle) / 2) * (outerRadius + 80)}
                  textAnchor="middle"
                  className="text-sm font-bold fill-cyan-400"
                  filter="url(#strongGlow)"
                >
                  {segment.name}
                </text>
                <text
                  x={centerX + Math.cos((segment.startAngle + segment.endAngle) / 2) * (outerRadius + 95)}
                  y={centerY + Math.sin((segment.startAngle + segment.endAngle) / 2) * (outerRadius + 95)}
                  textAnchor="middle"
                  className="text-xs fill-cyan-300"
                >
                  {segment.value}%
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Central AI core */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius * 0.8}
          fill="url(#cyberCore)"
          stroke="#00ffff"
          strokeWidth="3"
          filter="url(#strongGlow)"
        />

        {/* Rotating inner core */}
        <g transform={`rotate(${-rotation * 2} ${centerX} ${centerY})`}>
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius * 0.5}
            fill="none"
            stroke="url(#neonGlow)"
            strokeWidth="2"
            strokeDasharray="10,5"
            filter="url(#cyberGlow)"
          />
        </g>
        
        {/* Center text with cyberpunk styling */}
        <text
          x={centerX}
          y={centerY - 15}
          textAnchor="middle"
          className="text-xl font-bold fill-cyan-400"
          filter="url(#strongGlow)"
        >
          {centerValue}
        </text>
        <text
          x={centerX}
          y={centerY + 5}
          textAnchor="middle"
          className="text-sm fill-cyan-300"
          filter="url(#cyberGlow)"
        >
          {centerLabel}
        </text>
        <text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          className="text-xs fill-cyan-500"
        >
          NEURAL LINK ACTIVE
        </text>
      </svg>
    </div>
  );
};

export default CyberRadialChart;