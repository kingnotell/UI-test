import React, { useState, useRef, useEffect } from 'react';

interface NeuralAllocationData {
  name: string;
  value: number;
  connections: number[];
}

interface NeuralAllocationChartProps {
  data: NeuralAllocationData[];
  className?: string;
}

const NeuralAllocationChart: React.FC<NeuralAllocationChartProps> = ({ data, className = '' }) => {
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

  // Position nodes in a circle
  const angleStep = (2 * Math.PI) / data.length;
  const nodes = data.map((item, index) => {
    const angle = index * angleStep;
    const nodeRadius = radius * 0.8;
    
    return {
      ...item,
      x: centerX + Math.cos(angle) * nodeRadius,
      y: centerY + Math.sin(angle) * nodeRadius,
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
            opacity={0.1 + i * 0.05}
            strokeDasharray={i % 2 === 0 ? "5,5" : "none"}
          />
        ))}

        {/* Radial lines */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 24;
            return (
              <line
                key={i}
                x1={centerX + Math.cos(angle) * radius * 0.15}
                y1={centerY + Math.sin(angle) * radius * 0.15}
                x2={centerX + Math.cos(angle) * radius}
                y2={centerY + Math.sin(angle) * radius}
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.1"
              />
            );
          })}
        </g>

        {/* Neural connections */}
        {nodes.map((node) => 
          node.connections.map((targetIndex) => {
            const targetNode = nodes[targetIndex];
            if (!targetNode) return null;
            
            const isHighlighted = hoveredIndex === node.index || hoveredIndex === targetIndex;
            
            return (
              <line
                key={`${node.index}-${targetIndex}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="#ffffff"
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.8 : 0.2}
                filter={isHighlighted ? "url(#subtleGlow)" : undefined}
                className="transition-all duration-300"
              />
            );
          })
        )}

        {/* Data spikes extending outward */}
        {nodes.map((node) => {
          const spikeCount = Math.max(8, Math.floor(node.value / 5));
          const spikes = [];
          
          for (let i = 0; i < spikeCount; i++) {
            const spikeAngle = node.angle + (Math.PI / 6) * (i / (spikeCount - 1)) - (Math.PI / 12);
            const spikeStartRadius = radius * 0.85;
            const spikeEndRadius = radius * 0.95 + (node.value / 100) * 40;
            
            spikes.push(
              <line
                key={`spike-${node.index}-${i}`}
                x1={centerX + Math.cos(spikeAngle) * spikeStartRadius}
                y1={centerY + Math.sin(spikeAngle) * spikeStartRadius}
                x2={centerX + Math.cos(spikeAngle) * spikeEndRadius}
                y2={centerY + Math.sin(spikeAngle) * spikeEndRadius}
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          }
          
          return <g key={`spikes-${node.index}`}>{spikes}</g>;
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredIndex === node.index;
          const nodeSize = 8 + (node.value / 100) * 12;
          
          return (
            <g key={node.index}>
              {/* Node outer ring */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
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
                cx={node.x}
                cy={node.y}
                r={nodeSize}
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2"
                opacity={isHovered ? 1 : 0.8}
                filter="url(#subtleGlow)"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(node.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              
              {/* Node center */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 0.3}
                fill="#000000"
              />
              
              {/* Node label */}
              {isHovered && (
                <g>
                  <text
                    x={node.x}
                    y={node.y - nodeSize - 20}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white"
                    filter="url(#whiteGlow)"
                  >
                    {node.name}
                  </text>
                  <text
                    x={node.x}
                    y={node.y - nodeSize - 8}
                    textAnchor="middle"
                    className="text-xs fill-white"
                    opacity="0.8"
                  >
                    {node.value}%
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
          y={centerY - 5}
          textAnchor="middle"
          className="text-lg font-bold fill-black"
        >
          NEURAL
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="text-sm fill-black"
        >
          CORE
        </text>
      </svg>
    </div>
  );
};

export default NeuralAllocationChart;