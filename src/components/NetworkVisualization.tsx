import React, { useState, useRef, useEffect } from 'react';

interface NetworkNode {
  id: string;
  name: string;
  value: number;
  x: number;
  y: number;
  color: string;
  category: 'crypto' | 'exchange' | 'defi';
}

interface NetworkConnection {
  source: string;
  target: string;
  strength: number;
  color: string;
}

interface NetworkVisualizationProps {
  className?: string;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ className = '' }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
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

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;

  // Generate network nodes
  const nodes: NetworkNode[] = [
    // Center node
    { id: 'btc', name: 'Bitcoin', value: 100, x: centerX, y: centerY, color: '#f7931a', category: 'crypto' },
    
    // Primary ring
    { id: 'eth', name: 'Ethereum', value: 80, x: centerX - 150, y: centerY - 100, color: '#627eea', category: 'crypto' },
    { id: 'bnb', name: 'Binance', value: 70, x: centerX + 150, y: centerY - 100, color: '#f3ba2f', category: 'exchange' },
    { id: 'sol', name: 'Solana', value: 60, x: centerX + 150, y: centerY + 100, color: '#9945ff', category: 'crypto' },
    { id: 'ada', name: 'Cardano', value: 50, x: centerX - 150, y: centerY + 100, color: '#0033ad', category: 'crypto' },
    
    // Secondary ring
    { id: 'dot', name: 'Polkadot', value: 40, x: centerX - 250, y: centerY, color: '#e6007a', category: 'crypto' },
    { id: 'avax', name: 'Avalanche', value: 35, x: centerX, y: centerY - 180, color: '#e84142', category: 'crypto' },
    { id: 'matic', name: 'Polygon', value: 30, x: centerX + 250, y: centerY, color: '#8247e5', category: 'crypto' },
    { id: 'link', name: 'Chainlink', value: 25, x: centerX, y: centerY + 180, color: '#375bd2', category: 'defi' },
    
    // Outer ring
    { id: 'uni', name: 'Uniswap', value: 20, x: centerX - 200, y: centerY - 150, color: '#ff007a', category: 'defi' },
    { id: 'aave', name: 'Aave', value: 18, x: centerX + 200, y: centerY - 150, color: '#b6509e', category: 'defi' },
    { id: 'comp', name: 'Compound', value: 15, x: centerX + 200, y: centerY + 150, color: '#00d395', category: 'defi' },
    { id: 'mkr', name: 'Maker', value: 12, x: centerX - 200, y: centerY + 150, color: '#1aab9b', category: 'defi' }
  ];

  // Generate connections
  const connections: NetworkConnection[] = [
    // BTC connections
    { source: 'btc', target: 'eth', strength: 0.9, color: '#00ff88' },
    { source: 'btc', target: 'bnb', strength: 0.8, color: '#00ff88' },
    { source: 'btc', target: 'sol', strength: 0.7, color: '#00ff88' },
    { source: 'btc', target: 'ada', strength: 0.6, color: '#00ff88' },
    
    // ETH ecosystem
    { source: 'eth', target: 'uni', strength: 0.8, color: '#00aaff' },
    { source: 'eth', target: 'aave', strength: 0.7, color: '#00aaff' },
    { source: 'eth', target: 'comp', strength: 0.6, color: '#00aaff' },
    { source: 'eth', target: 'mkr', strength: 0.5, color: '#00aaff' },
    
    // Cross-chain connections
    { source: 'sol', target: 'avax', strength: 0.5, color: '#ff6600' },
    { source: 'ada', target: 'dot', strength: 0.4, color: '#ff6600' },
    { source: 'matic', target: 'link', strength: 0.6, color: '#ff6600' },
    
    // DeFi connections
    { source: 'uni', target: 'aave', strength: 0.3, color: '#ff0088' },
    { source: 'aave', target: 'comp', strength: 0.4, color: '#ff0088' },
    { source: 'comp', target: 'mkr', strength: 0.3, color: '#ff0088' }
  ];

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#333333" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
          
          {/* Glow effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        {connections.map((connection, index) => {
          const sourceNode = nodes.find(n => n.id === connection.source);
          const targetNode = nodes.find(n => n.id === connection.target);
          
          if (!sourceNode || !targetNode) return null;

          const isHighlighted = hoveredNode === connection.source || hoveredNode === connection.target;
          
          return (
            <g key={index}>
              {/* Connection line */}
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={connection.color}
                strokeWidth={isHighlighted ? 3 : 1}
                opacity={isHighlighted ? 0.8 : 0.4}
                className="transition-all duration-300"
                filter={isHighlighted ? "url(#glow)" : undefined}
              />
              
              {/* Data flow animation */}
              {isHighlighted && (
                <circle r="3" fill={connection.color} opacity="0.8">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`}
                  />
                </circle>
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
          
          const nodeSize = Math.sqrt(node.value) * 2 + 8;
          
          return (
            <g key={node.id}>
              {/* Node glow */}
              {(isHovered || isConnected) && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize + 10}
                  fill={node.color}
                  opacity="0.2"
                  filter="url(#glow)"
                />
              )}
              
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize}
                fill={node.color}
                stroke="#000000"
                strokeWidth="2"
                opacity={isHovered || isConnected ? 1 : 0.8}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y - nodeSize - 10}
                textAnchor="middle"
                className="text-xs fill-white font-medium"
                opacity={isHovered || isConnected ? 1 : 0.7}
              >
                {node.name}
              </text>
              
              {/* Value label */}
              {(isHovered || isConnected) && (
                <text
                  x={node.x}
                  y={node.y + nodeSize + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  ${node.value}B
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default NetworkVisualization;