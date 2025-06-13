import React, { useState, useRef, useEffect } from 'react';

interface NeuralNode {
  id: string;
  name: string;
  value: number;
  x: number;
  y: number;
  category: 'core' | 'primary' | 'secondary' | 'peripheral';
  aiLevel: number;
}

interface NeuralConnection {
  source: string;
  target: string;
  strength: number;
  dataFlow: number;
}

interface HalfEyeNeuralNetworkProps {
  className?: string;
}

const HalfEyeNeuralNetwork: React.FC<HalfEyeNeuralNetworkProps> = ({ className = '' }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scanLine, setScanLine] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const width = container.clientWidth - 40;
          const height = Math.min(width * 0.5, 400);
          setDimensions({ width: Math.max(600, width), height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Scanning animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height;
  const radius = height * 0.9;

  // Generate half-eye neural network nodes
  const nodes: NeuralNode[] = [
    // Core neural center
    { id: 'neural-core', name: 'NEURAL.CORE', value: 100, x: centerX, y: centerY - radius * 0.2, category: 'core', aiLevel: 10 },
    
    // Primary layer (inner arc)
    { id: 'btc-node', name: 'BTC.NEURAL', value: 95, x: centerX - radius * 0.4, y: centerY - radius * 0.6, category: 'primary', aiLevel: 9 },
    { id: 'eth-node', name: 'ETH.NEURAL', value: 90, x: centerX, y: centerY - radius * 0.7, category: 'primary', aiLevel: 8 },
    { id: 'sol-node', name: 'SOL.NEURAL', value: 85, x: centerX + radius * 0.4, y: centerY - radius * 0.6, category: 'primary', aiLevel: 7 },
    
    // Secondary layer (middle arc)
    { id: 'ada-node', name: 'ADA.NEURAL', value: 75, x: centerX - radius * 0.7, y: centerY - radius * 0.4, category: 'secondary', aiLevel: 6 },
    { id: 'dot-node', name: 'DOT.NEURAL', value: 70, x: centerX - radius * 0.3, y: centerY - radius * 0.8, category: 'secondary', aiLevel: 5 },
    { id: 'avax-node', name: 'AVAX.NEURAL', value: 65, x: centerX + radius * 0.3, y: centerY - radius * 0.8, category: 'secondary', aiLevel: 4 },
    { id: 'matic-node', name: 'MATIC.NEURAL', value: 60, x: centerX + radius * 0.7, y: centerY - radius * 0.4, category: 'secondary', aiLevel: 3 },
    
    // Peripheral layer (outer arc)
    { id: 'link-node', name: 'LINK.NEURAL', value: 50, x: centerX - radius * 0.9, y: centerY - radius * 0.2, category: 'peripheral', aiLevel: 2 },
    { id: 'uni-node', name: 'UNI.NEURAL', value: 45, x: centerX - radius * 0.8, y: centerY - radius * 0.7, category: 'peripheral', aiLevel: 1 },
    { id: 'aave-node', name: 'AAVE.NEURAL', value: 40, x: centerX, y: centerY - radius * 0.95, category: 'peripheral', aiLevel: 1 },
    { id: 'comp-node', name: 'COMP.NEURAL', value: 35, x: centerX + radius * 0.8, y: centerY - radius * 0.7, category: 'peripheral', aiLevel: 1 },
    { id: 'mkr-node', name: 'MKR.NEURAL', value: 30, x: centerX + radius * 0.9, y: centerY - radius * 0.2, category: 'peripheral', aiLevel: 1 }
  ];

  // Generate neural connections
  const connections: NeuralConnection[] = [
    // Core to primary
    { source: 'neural-core', target: 'btc-node', strength: 0.95, dataFlow: 90 },
    { source: 'neural-core', target: 'eth-node', strength: 0.90, dataFlow: 85 },
    { source: 'neural-core', target: 'sol-node', strength: 0.85, dataFlow: 80 },
    
    // Primary to secondary
    { source: 'btc-node', target: 'ada-node', strength: 0.75, dataFlow: 70 },
    { source: 'btc-node', target: 'dot-node', strength: 0.70, dataFlow: 65 },
    { source: 'eth-node', target: 'dot-node', strength: 0.80, dataFlow: 75 },
    { source: 'eth-node', target: 'avax-node', strength: 0.75, dataFlow: 70 },
    { source: 'sol-node', target: 'avax-node', strength: 0.70, dataFlow: 65 },
    { source: 'sol-node', target: 'matic-node', strength: 0.65, dataFlow: 60 },
    
    // Secondary to peripheral
    { source: 'ada-node', target: 'link-node', strength: 0.60, dataFlow: 50 },
    { source: 'dot-node', target: 'uni-node', strength: 0.55, dataFlow: 45 },
    { source: 'avax-node', target: 'aave-node', strength: 0.50, dataFlow: 40 },
    { source: 'avax-node', target: 'comp-node', strength: 0.45, dataFlow: 35 },
    { source: 'matic-node', target: 'comp-node', strength: 0.50, dataFlow: 40 },
    { source: 'matic-node', target: 'mkr-node', strength: 0.40, dataFlow: 30 }
  ];

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

          {/* Scan line gradient */}
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Half-eye background structure */}
        {[0.3, 0.5, 0.7, 0.9].map((ratio, i) => (
          <path
            key={i}
            d={`M ${centerX - radius * ratio} ${centerY} A ${radius * ratio} ${radius * ratio} 0 0 1 ${centerX + radius * ratio} ${centerY}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity={0.1 + i * 0.05}
            strokeDasharray={i % 2 === 0 ? "5,5" : "none"}
          />
        ))}

        {/* Radial grid lines */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * Math.PI) / 24;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY - Math.sin(angle) * radius;
          
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.1"
            />
          );
        })}

        {/* Scanning line */}
        <line
          x1={centerX - radius + (scanLine / 100) * (2 * radius)}
          y1={centerY - radius}
          x2={centerX - radius + (scanLine / 100) * (2 * radius)}
          y2={centerY}
          stroke="url(#scanGradient)"
          strokeWidth="2"
          opacity="0.6"
          filter="url(#whiteGlow)"
        />

        {/* Neural connections */}
        {connections.map((connection, index) => {
          const sourceNode = nodes.find(n => n.id === connection.source);
          const targetNode = nodes.find(n => n.id === connection.target);
          
          if (!sourceNode || !targetNode) return null;

          const isHighlighted = hoveredNode === connection.source || hoveredNode === connection.target;
          
          return (
            <g key={index}>
              {/* Main connection line */}
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="#ffffff"
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.8 : 0.3}
                filter={isHighlighted ? "url(#subtleGlow)" : undefined}
                className="transition-all duration-300"
              />
              
              {/* Data flow particles */}
              {isHighlighted && (
                <circle r="2" fill="#ffffff" opacity="0.8">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={`M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Neural nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = hoveredNode && connections.some(c => 
            (c.source === node.id && c.target === hoveredNode) ||
            (c.target === node.id && c.source === hoveredNode)
          );
          
          const nodeSize = node.category === 'core' ? 20 : 
                          node.category === 'primary' ? 14 : 
                          node.category === 'secondary' ? 10 : 6;
          
          return (
            <g key={node.id}>
              {/* Node outer glow */}
              {(isHovered || isConnected) && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 10}
                  fill="#ffffff"
                  opacity="0.2"
                  filter="url(#whiteGlow)"
                />
              )}
              
              {/* Node pulse ring for core */}
              {node.category === 'core' && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 8}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeSize + 5};${nodeSize + 15};${nodeSize + 5}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
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
                strokeWidth="1"
                opacity={isHovered || isConnected ? 1 : 0.8}
                filter="url(#subtleGlow)"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Node center core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 0.3}
                fill="#000000"
              />
              
              {/* AI level indicator */}
              <text
                x={node.x}
                y={node.y + 2}
                textAnchor="middle"
                className="text-xs font-bold fill-white"
              >
                {node.aiLevel}
              </text>
              
              {/* Node label */}
              {(isHovered || isConnected) && (
                <g>
                  <text
                    x={node.x}
                    y={node.y - nodeSize - 15}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white"
                    filter="url(#whiteGlow)"
                  >
                    {node.name}
                  </text>
                  <text
                    x={node.x}
                    y={node.y - nodeSize - 5}
                    textAnchor="middle"
                    className="text-xs fill-white"
                    opacity="0.8"
                  >
                    PWR: {node.value}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Central eye pupil */}
        <circle
          cx={centerX}
          cy={centerY - radius * 0.2}
          r="8"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#whiteGlow)"
        />
        
        {/* Eye center text */}
        <text
          x={centerX}
          y={centerY + 30}
          textAnchor="middle"
          className="text-lg font-bold fill-white"
          filter="url(#whiteGlow)"
        >
          QUANTUM.EYE
        </text>
      </svg>
    </div>
  );
};

export default HalfEyeNeuralNetwork;