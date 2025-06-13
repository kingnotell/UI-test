import React, { useState, useRef, useEffect } from 'react';

interface CyberNode {
  id: string;
  name: string;
  value: number;
  x: number;
  y: number;
  color: string;
  category: 'core' | 'primary' | 'secondary' | 'satellite';
  aiLevel: number;
}

interface CyberConnection {
  source: string;
  target: string;
  strength: number;
  color: string;
  dataFlow: number;
}

interface CyberNetworkVizProps {
  className?: string;
}

const CyberNetworkViz: React.FC<CyberNetworkVizProps> = ({ className = '' }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [dataFlow, setDataFlow] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const width = container.clientWidth - 40;
          const height = Math.min(width * 0.75, 600);
          setDimensions({ width: Math.max(600, width), height });
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
      setRotation(prev => (prev + 0.3) % 360);
      setDataFlow(prev => (prev + 2) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;

  // Generate cyberpunk network nodes
  const nodes: CyberNode[] = [
    // Core AI node
    { id: 'ai-core', name: 'AI CORE', value: 100, x: centerX, y: centerY, color: '#00ffff', category: 'core', aiLevel: 10 },
    
    // Primary neural nodes
    { id: 'btc-neural', name: 'BTC.NEURAL', value: 90, x: centerX - 180, y: centerY - 120, color: '#ff6600', category: 'primary', aiLevel: 9 },
    { id: 'eth-neural', name: 'ETH.NEURAL', value: 85, x: centerX + 180, y: centerY - 120, color: '#8000ff', category: 'primary', aiLevel: 8 },
    { id: 'sol-neural', name: 'SOL.NEURAL', value: 75, x: centerX + 180, y: centerY + 120, color: '#ff00ff', category: 'primary', aiLevel: 7 },
    { id: 'ada-neural', name: 'ADA.NEURAL', value: 70, x: centerX - 180, y: centerY + 120, color: '#00ff88', category: 'primary', aiLevel: 6 },
    
    // Secondary processing nodes
    { id: 'quantum-1', name: 'QUANTUM.1', value: 60, x: centerX - 280, y: centerY, color: '#ffff00', category: 'secondary', aiLevel: 5 },
    { id: 'quantum-2', name: 'QUANTUM.2', value: 55, x: centerX, y: centerY - 200, color: '#ff0088', category: 'secondary', aiLevel: 4 },
    { id: 'quantum-3', name: 'QUANTUM.3', value: 50, x: centerX + 280, y: centerY, color: '#88ff00', category: 'secondary', aiLevel: 3 },
    { id: 'quantum-4', name: 'QUANTUM.4', value: 45, x: centerX, y: centerY + 200, color: '#0088ff', category: 'secondary', aiLevel: 2 },
    
    // Satellite data nodes
    { id: 'data-1', name: 'DATA.STREAM.1', value: 30, x: centerX - 220, y: centerY - 180, color: '#ff4400', category: 'satellite', aiLevel: 1 },
    { id: 'data-2', name: 'DATA.STREAM.2', value: 25, x: centerX + 220, y: centerY - 180, color: '#4400ff', category: 'satellite', aiLevel: 1 },
    { id: 'data-3', name: 'DATA.STREAM.3', value: 20, x: centerX + 220, y: centerY + 180, color: '#44ff00', category: 'satellite', aiLevel: 1 },
    { id: 'data-4', name: 'DATA.STREAM.4', value: 15, x: centerX - 220, y: centerY + 180, color: '#ff0044', category: 'satellite', aiLevel: 1 }
  ];

  // Generate cyberpunk connections
  const connections: CyberConnection[] = [
    // Core to primary
    { source: 'ai-core', target: 'btc-neural', strength: 0.95, color: '#00ffff', dataFlow: 90 },
    { source: 'ai-core', target: 'eth-neural', strength: 0.90, color: '#00ffff', dataFlow: 85 },
    { source: 'ai-core', target: 'sol-neural', strength: 0.85, color: '#00ffff', dataFlow: 80 },
    { source: 'ai-core', target: 'ada-neural', strength: 0.80, color: '#00ffff', dataFlow: 75 },
    
    // Primary to quantum
    { source: 'btc-neural', target: 'quantum-1', strength: 0.75, color: '#ff6600', dataFlow: 70 },
    { source: 'eth-neural', target: 'quantum-2', strength: 0.70, color: '#8000ff', dataFlow: 65 },
    { source: 'sol-neural', target: 'quantum-3', strength: 0.65, color: '#ff00ff', dataFlow: 60 },
    { source: 'ada-neural', target: 'quantum-4', strength: 0.60, color: '#00ff88', dataFlow: 55 },
    
    // Quantum to data streams
    { source: 'quantum-1', target: 'data-1', strength: 0.50, color: '#ffff00', dataFlow: 40 },
    { source: 'quantum-2', target: 'data-2', strength: 0.45, color: '#ff0088', dataFlow: 35 },
    { source: 'quantum-3', target: 'data-3', strength: 0.40, color: '#88ff00', dataFlow: 30 },
    { source: 'quantum-4', target: 'data-4', strength: 0.35, color: '#0088ff', dataFlow: 25 },
    
    // Cross-connections
    { source: 'btc-neural', target: 'eth-neural', strength: 0.30, color: '#ffffff', dataFlow: 20 },
    { source: 'sol-neural', target: 'ada-neural', strength: 0.25, color: '#ffffff', dataFlow: 15 }
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
          {/* Cyberpunk gradients */}
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1"/>
            <stop offset="50%" stopColor="#0080ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>
          
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0"/>
          </linearGradient>

          {/* Glow effects */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Rotating background grid */}
        <g transform={`rotate(${rotation * 0.1} ${centerX} ${centerY})`} opacity="0.1">
          <pattern id="cyberGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ffff" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </g>

        {/* Connections */}
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
                stroke={connection.color}
                strokeWidth={isHighlighted ? 4 : 2}
                opacity={isHighlighted ? 0.9 : 0.6}
                filter="url(#connectionGlow)"
                className="transition-all duration-300"
              />
              
              {/* Data flow particles */}
              {isHighlighted && (
                <>
                  <circle r="3" fill={connection.color} opacity="0.8">
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`}
                    />
                  </circle>
                  <circle r="2" fill="#ffffff" opacity="0.6">
                    <animateMotion
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.5s"
                      path={`M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`}
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = hoveredNode && connections.some(c => 
            (c.source === node.id && c.target === hoveredNode) ||
            (c.target === node.id && c.source === hoveredNode)
          );
          
          const nodeSize = node.category === 'core' ? 25 : 
                          node.category === 'primary' ? 18 : 
                          node.category === 'secondary' ? 12 : 8;
          
          return (
            <g key={node.id}>
              {/* Node outer glow */}
              {(isHovered || isConnected) && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 15}
                  fill={node.color}
                  opacity="0.3"
                  filter="url(#nodeGlow)"
                />
              )}
              
              {/* Node pulse ring */}
              {node.category === 'core' && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 10}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeSize + 5};${nodeSize + 20};${nodeSize + 5}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
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
                fill={node.color}
                stroke="#000000"
                strokeWidth="2"
                opacity={isHovered || isConnected ? 1 : 0.8}
                filter="url(#nodeGlow)"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Node center core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 0.4}
                fill="#000000"
                opacity="0.8"
              />
              
              {/* AI level indicator */}
              <text
                x={node.x}
                y={node.y + 3}
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
                    className="text-sm font-bold fill-cyan-400"
                    filter="url(#nodeGlow)"
                  >
                    {node.name}
                  </text>
                  <text
                    x={node.x}
                    y={node.y - nodeSize - 5}
                    textAnchor="middle"
                    className="text-xs fill-cyan-300"
                  >
                    PWR: {node.value}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Central AI core enhancement */}
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          <circle
            cx={centerX}
            cy={centerY}
            r="35"
            fill="none"
            stroke="#00ffff"
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
};

export default CyberNetworkViz;