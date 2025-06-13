import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, Brain, Volume2 } from 'lucide-react';

interface CoinInsightChartProps {
  className?: string;
}

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface DataPoint {
  value: number;
  date: string;
  movingAverage?: number;
  aiPrediction?: number;
}

const CoinInsightChart: React.FC<CoinInsightChartProps> = ({ className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  const [chartType, setChartType] = useState<'line' | 'candle'>('candle');
  const [showMA, setShowMA] = useState(true);
  const [showAI, setShowAI] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; date: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 400 });

  // Update dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48; // Account for padding
        const containerHeight = 400; // Fixed height for chart area
        setDimensions({ 
          width: Math.max(800, containerWidth), 
          height: containerHeight 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate moving average
  const calculateMovingAverage = (data: DataPoint[], period: number = 20): DataPoint[] => {
    return data.map((point, index) => {
      if (index < period - 1) {
        return { ...point, movingAverage: point.value };
      }
      
      const sum = data.slice(index - period + 1, index + 1).reduce((acc, p) => acc + p.value, 0);
      return { ...point, movingAverage: sum / period };
    });
  };

  // Generate AI prediction line
  const generateAIPrediction = (data: DataPoint[]): DataPoint[] => {
    return data.map((point, index) => {
      // AI prediction is slightly ahead of current trend with some volatility
      const trendFactor = index / data.length;
      const aiBoost = 1 + (trendFactor * 0.15) + (Math.sin(index * 0.3) * 0.05);
      const aiPrediction = point.value * aiBoost;
      
      return { ...point, aiPrediction };
    });
  };

  // Generate portfolio data with moving average and AI prediction
  const generatePortfolioData = (baseValue: number, volatility: number, trend: number, points: number = 50): DataPoint[] => {
    const data: DataPoint[] = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < points; i++) {
      const randomChange = (Math.random() - 0.5) * volatility;
      const trendChange = trend * (i / points);
      currentValue = Math.max(0.1, currentValue + randomChange + trendChange);
      
      const date = new Date();
      date.setDate(date.getDate() - (points - i));
      
      data.push({
        value: currentValue,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    // Add moving average and AI prediction
    const dataWithMA = calculateMovingAverage(data);
    return generateAIPrediction(dataWithMA);
  };

  // Generate professional candlestick data
  const generateCandleData = (baseValue: number, volatility: number, trend: number, points: number = 50): CandleData[] => {
    const data = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < points; i++) {
      const open = currentValue;
      const trendChange = trend * (i / points);
      const dailyVolatility = volatility * (0.5 + Math.random() * 0.5);
      
      // More realistic OHLC generation
      const direction = Math.random() > 0.5 ? 1 : -1;
      const bodySize = Math.random() * dailyVolatility * 0.6;
      const wickSize = Math.random() * dailyVolatility * 0.4;
      
      let high, low, close;
      
      if (direction > 0) {
        // Bullish candle
        close = open + bodySize;
        high = Math.max(open, close) + wickSize;
        low = Math.min(open, close) - wickSize * 0.5;
      } else {
        // Bearish candle
        close = open - bodySize;
        high = Math.max(open, close) + wickSize * 0.5;
        low = Math.min(open, close) - wickSize;
      }
      
      // Ensure realistic price constraints
      high = Math.max(high, Math.max(open, close));
      low = Math.min(low, Math.min(open, close));
      
      currentValue = close + (trendChange / points);
      
      const date = new Date();
      date.setDate(date.getDate() - (points - i));
      
      // Generate volume (higher volume on bigger moves)
      const priceMove = Math.abs(close - open);
      const baseVolume = 1000000;
      const volume = baseVolume * (1 + priceMove / open * 10) * (0.5 + Math.random());
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        open,
        high,
        low,
        close,
        volume
      });
    }
    return data;
  };

  const dataByPeriod = {
    '1D': generatePortfolioData(10500, 200, 100, 24),
    '1W': generatePortfolioData(10200, 300, 300, 7),
    '1M': generatePortfolioData(9800, 400, 700, 30),
    '3M': generatePortfolioData(8500, 500, 2000, 90),
    '1Y': generatePortfolioData(6000, 800, 4500, 365),
    'ALL': generatePortfolioData(5000, 600, 5500, 50)
  };

  const candleDataByPeriod = {
    '1D': generateCandleData(10500, 200, 100, 24),
    '1W': generateCandleData(10200, 300, 300, 7),
    '1M': generateCandleData(9800, 400, 700, 30),
    '3M': generateCandleData(8500, 500, 2000, 90),
    '1Y': generateCandleData(6000, 800, 4500, 365),
    'ALL': generateCandleData(5000, 600, 5500, 50)
  };

  const portfolioData = dataByPeriod[selectedPeriod as keyof typeof dataByPeriod];
  const candleData = candleDataByPeriod[selectedPeriod as keyof typeof candleDataByPeriod];

  const { width, height } = dimensions;
  const volumeHeight = showVolume ? 60 : 0;
  const padding = { top: 40, right: 80, bottom: 40 + volumeHeight, left: 80 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  const volumeTop = height - padding.bottom + volumeHeight;

  // Calculate value range for both chart types
  let allValues: number[] = [];
  let maxVolume = 0;
  
  if (chartType === 'line') {
    allValues = portfolioData.flatMap(d => [
      d.value,
      ...(showMA && d.movingAverage ? [d.movingAverage] : []),
      ...(showAI && d.aiPrediction ? [d.aiPrediction] : [])
    ]);
  } else {
    allValues = candleData.flatMap(d => [d.open, d.high, d.low, d.close]);
    maxVolume = Math.max(...candleData.map(d => d.volume));
  }
  
  const minValue = Math.min(...allValues) * 0.98;
  const maxValue = Math.max(...allValues) * 1.02;
  const valueRange = maxValue - minValue;

  // Generate line chart paths
  const generatePath = (data: DataPoint[], valueKey: keyof DataPoint) => {
    return data.map((point, index) => {
      const value = point[valueKey] as number;
      if (!value) return '';
      
      const x = padding.left + (index / (data.length - 1)) * chartWidth;
      const y = padding.top + (1 - (value - minValue) / valueRange) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const generateAreaPath = (data: DataPoint[], valueKey: keyof DataPoint) => {
    const linePath = data.map((point, index) => {
      const value = point[valueKey] as number;
      if (!value) return '';
      
      const x = padding.left + (index / (data.length - 1)) * chartWidth;
      const y = padding.top + (1 - (value - minValue) / valueRange) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    const lastX = padding.left + chartWidth;
    const firstX = padding.left;
    const bottomY = padding.top + chartHeight;
    
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  // Generate professional candlestick elements
  const generateCandlesticks = (data: CandleData[]) => {
    const candleWidth = Math.max(4, Math.min(30, chartWidth / data.length * 0.7));
    const wickWidth = Math.max(1, candleWidth * 0.15);
    
    return data.map((candle, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth;
      const openY = padding.top + (1 - (candle.open - minValue) / valueRange) * chartHeight;
      const highY = padding.top + (1 - (candle.high - minValue) / valueRange) * chartHeight;
      const lowY = padding.top + (1 - (candle.low - minValue) / valueRange) * chartHeight;
      const closeY = padding.top + (1 - (candle.close - minValue) / valueRange) * chartHeight;
      
      const isGreen = candle.close > candle.open;
      const bodyTop = Math.min(openY, closeY);
      const bodyBottom = Math.max(openY, closeY);
      const bodyHeight = Math.max(2, Math.abs(closeY - openY));
      
      // Volume bar
      const volumeBarHeight = showVolume ? (candle.volume / maxVolume) * (volumeHeight - 20) : 0;
      const volumeY = volumeTop - volumeBarHeight;
      
      return {
        x,
        openY,
        highY,
        lowY,
        closeY,
        bodyTop,
        bodyBottom,
        bodyHeight,
        candleWidth,
        wickWidth,
        isGreen,
        candle,
        index,
        volumeBarHeight,
        volumeY
      };
    });
  };

  const candlesticks = generateCandlesticks(candleData);

  const currentValue = chartType === 'line' 
    ? portfolioData[portfolioData.length - 1]?.value || 0
    : candleData[candleData.length - 1]?.close || 0;
  
  const previousValue = chartType === 'line'
    ? portfolioData[portfolioData.length - 2]?.value || 0
    : candleData[candleData.length - 2]?.close || 0;
    
  const change = currentValue - previousValue;
  const changePercent = (change / previousValue) * 100;

  // Generate price levels
  const generatePriceLevels = () => {
    const levels = [];
    const levelCount = 8;
    for (let i = 0; i <= levelCount; i++) {
      const value = minValue + (valueRange * i) / levelCount;
      const y = padding.top + (1 - i / levelCount) * chartHeight;
      levels.push({ value, y });
    }
    return levels;
  };

  const priceLevels = generatePriceLevels();

  return (
    <div 
      ref={containerRef}
      className={`bg-black rounded-xl border border-white/20 p-6 ${className}`} 
      style={{ background: '#000000' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-sm shadow-lg shadow-green-400/50"></div>
            <span className="text-sm text-white font-mono font-bold">NEURAL.PORTFOLIO</span>
          </div>
          {showMA && chartType === 'line' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-sm shadow-lg shadow-red-400/50"></div>
              <span className="text-sm text-red-400 font-mono">MOVING.AVERAGE</span>
            </div>
          )}
          {showAI && chartType === 'line' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-sm shadow-lg shadow-green-600/50"></div>
              <span className="text-sm text-green-600 font-mono">AI.PREDICTION</span>
            </div>
          )}
          {showVolume && chartType === 'candle' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-sm shadow-lg shadow-blue-400/50"></div>
              <span className="text-sm text-blue-400 font-mono">VOLUME</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">TIMESTAMP:</span>
            <span className="text-white">2025.04.10</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${change >= 0 ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'} shadow-lg`}></div>
            <span className="text-white font-bold">
              ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-xs flex items-center space-x-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Type and Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
              chartType === 'line'
                ? 'bg-white/20 text-white border-white/50'
                : 'text-gray-400 hover:text-white hover:bg-white/10 border-white/20'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>LINE</span>
          </button>
          <button
            onClick={() => setChartType('candle')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
              chartType === 'candle'
                ? 'bg-white/20 text-white border-white/50'
                : 'text-gray-400 hover:text-white hover:bg-white/10 border-white/20'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>CANDLE</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {chartType === 'line' && (
            <>
              <button
                onClick={() => setShowMA(!showMA)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
                  showMA
                    ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-lg shadow-red-500/30'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10 border-white/20'
                }`}
              >
                <span>MA</span>
              </button>
              <button
                onClick={() => setShowAI(!showAI)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
                  showAI
                    ? 'bg-green-600/20 text-green-600 border-green-600/50 shadow-lg shadow-green-600/30'
                    : 'text-gray-400 hover:text-green-600 hover:bg-green-600/10 border-white/20'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>AI</span>
              </button>
            </>
          )}
          {chartType === 'candle' && (
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
                showVolume
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-lg shadow-blue-500/30'
                  : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 border-white/20'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>VOL</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Chart Container - Responsive height */}
      <div className="relative w-full mb-4" style={{ height: `${height}px` }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          style={{ background: '#000000' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Green gradient for main portfolio line */}
            <linearGradient id="greenLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Red gradient for moving average */}
            <linearGradient id="redLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Dark green gradient for AI prediction */}
            <linearGradient id="darkGreenLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#047857" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Glow filters */}
            <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="darkGreenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Price Grid Lines */}
          <g opacity="0.2">
            {priceLevels.map((level, i) => (
              <line
                key={`price-${i}`}
                x1={padding.left}
                y1={level.y}
                x2={padding.left + chartWidth}
                y2={level.y}
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="3,6"
              />
            ))}
            {/* Vertical time grid */}
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={`time-${i}`}
                x1={padding.left + (i / 11) * chartWidth}
                y1={padding.top}
                x2={padding.left + (i / 11) * chartWidth}
                y2={padding.top + chartHeight}
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="3,6"
              />
            ))}
          </g>

          {/* Price Labels */}
          {priceLevels.map((level, i) => (
            <text
              key={`price-label-${i}`}
              x={padding.left - 15}
              y={level.y + 6}
              textAnchor="end"
              className="text-sm fill-gray-400 font-mono"
            >
              ${level.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </text>
          ))}
          
          {/* Line Chart */}
          {chartType === 'line' && (
            <>
              {/* Green Portfolio Area */}
              <path
                d={generateAreaPath(portfolioData, 'value')}
                fill="url(#greenLineGradient)"
              />

              {/* Moving Average Area (Red) */}
              {showMA && (
                <path
                  d={generateAreaPath(portfolioData, 'movingAverage')}
                  fill="url(#redLineGradient)"
                  opacity="0.7"
                />
              )}

              {/* AI Prediction Area (Dark Green) */}
              {showAI && (
                <path
                  d={generateAreaPath(portfolioData, 'aiPrediction')}
                  fill="url(#darkGreenLineGradient)"
                  opacity="0.7"
                />
              )}
              
              {/* AI Prediction Line with Area (Dark Green) */}
              {showAI && (
                <path
                  d={generatePath(portfolioData, 'aiPrediction')}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="12,6"
                  filter="url(#darkGreenGlow)"
                  opacity="0.9"
                />
              )}

              {/* Moving Average Line (Red) */}
              {showMA && (
                <path
                  d={generatePath(portfolioData, 'movingAverage')}
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#redGlow)"
                  opacity="0.9"
                />
              )}
              
              {/* Main Portfolio Line (Green) */}
              <path
                d={generatePath(portfolioData, 'value')}
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#greenGlow)"
              />
              
              {/* Data points */}
              {portfolioData.map((point, index) => {
                const x = padding.left + (index / (portfolioData.length - 1)) * chartWidth;
                const y = padding.top + (1 - (point.value - minValue) / valueRange) * chartHeight;
                
                return (
                  <g key={index}>
                    {/* Main data point */}
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#22c55e"
                      stroke="#000000"
                      strokeWidth="2"
                      opacity="0.8"
                      filter="url(#greenGlow)"
                      className="hover:opacity-100 hover:r-6 transition-all duration-200"
                    />
                    
                    {/* Moving Average point */}
                    {showMA && point.movingAverage && (
                      <circle
                        cx={x}
                        cy={padding.top + (1 - (point.movingAverage - minValue) / valueRange) * chartHeight}
                        r="3"
                        fill="#f87171"
                        stroke="#000000"
                        strokeWidth="1"
                        opacity="0.8"
                        filter="url(#redGlow)"
                      />
                    )}
                    
                    {/* AI Prediction point */}
                    {showAI && point.aiPrediction && (
                      <circle
                        cx={x}
                        cy={padding.top + (1 - (point.aiPrediction - minValue) / valueRange) * chartHeight}
                        r="3"
                        fill="#059669"
                        stroke="#000000"
                        strokeWidth="1"
                        opacity="0.8"
                        filter="url(#darkGreenGlow)"
                      />
                    )}
                  </g>
                );
              })}
            </>
          )}

          {/* Professional Candlestick Chart */}
          {chartType === 'candle' && (
            <>
              {candlesticks.map((stick) => (
                <g 
                  key={stick.index}
                  onMouseEnter={() => setHoveredCandle(stick.candle)}
                  onMouseLeave={() => setHoveredCandle(null)}
                  className="cursor-pointer"
                >
                  {/* High-Low Wick */}
                  <line
                    x1={stick.x}
                    y1={stick.highY}
                    x2={stick.x}
                    y2={stick.lowY}
                    stroke={stick.isGreen ? '#22c55e' : '#ef4444'}
                    strokeWidth={stick.wickWidth}
                    opacity="0.9"
                  />
                  
                  {/* Candle Body */}
                  <rect
                    x={stick.x - stick.candleWidth / 2}
                    y={stick.bodyTop}
                    width={stick.candleWidth}
                    height={Math.max(2, stick.bodyHeight)}
                    fill={stick.isGreen ? '#22c55e' : '#ef4444'}
                    stroke={stick.isGreen ? '#16a34a' : '#dc2626'}
                    strokeWidth="1"
                    opacity="0.9"
                    className="hover:opacity-100 transition-opacity duration-200"
                  />
                  
                  {/* Candle Body Border for hollow effect when close = open */}
                  {Math.abs(stick.candle.close - stick.candle.open) < (maxValue - minValue) * 0.001 && (
                    <rect
                      x={stick.x - stick.candleWidth / 2}
                      y={stick.bodyTop}
                      width={stick.candleWidth}
                      height={Math.max(3, stick.bodyHeight)}
                      fill="none"
                      stroke={stick.isGreen ? '#22c55e' : '#ef4444'}
                      strokeWidth="2"
                      opacity="0.9"
                    />
                  )}
                </g>
              ))}
            </>
          )}

          {/* Volume Bars */}
          {chartType === 'candle' && showVolume && (
            <g>
              {/* Volume section separator */}
              <line
                x1={padding.left}
                y1={padding.top + chartHeight + 10}
                x2={padding.left + chartWidth}
                y2={padding.top + chartHeight + 10}
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="3,6"
              />
              
              {/* Volume label */}
              <text
                x={padding.left - 15}
                y={padding.top + chartHeight + 35}
                textAnchor="end"
                className="text-xs fill-gray-400 font-mono"
              >
                VOL
              </text>
              
              {/* Volume bars */}
              {candlesticks.map((stick) => (
                <rect
                  key={`vol-${stick.index}`}
                  x={stick.x - stick.candleWidth / 2}
                  y={padding.top + chartHeight + 10 + (volumeHeight - 10) - stick.volumeBarHeight}
                  width={stick.candleWidth}
                  height={stick.volumeBarHeight}
                  fill={stick.isGreen ? '#22c55e' : '#ef4444'}
                  opacity="0.6"
                  className="hover:opacity-100 transition-opacity duration-200"
                />
              ))}
            </g>
          )}
          
          {/* Hover Tooltip for Candlesticks */}
          {hoveredCandle && chartType === 'candle' && (
            <g>
              <rect
                x={width - 200}
                y={padding.top}
                width="180"
                height="120"
                fill="#000000"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.95"
                rx="6"
              />
              <text x={width - 185} y={padding.top + 20} className="text-sm fill-white font-mono font-bold">
                {hoveredCandle.date}
              </text>
              <text x={width - 185} y={padding.top + 35} className="text-xs fill-gray-400 font-mono">
                O: ${hoveredCandle.open.toFixed(2)}
              </text>
              <text x={width - 185} y={padding.top + 50} className="text-xs fill-gray-400 font-mono">
                H: ${hoveredCandle.high.toFixed(2)}
              </text>
              <text x={width - 185} y={padding.top + 65} className="text-xs fill-gray-400 font-mono">
                L: ${hoveredCandle.low.toFixed(2)}
              </text>
              <text x={width - 185} y={padding.top + 80} className="text-xs fill-white font-mono">
                C: ${hoveredCandle.close.toFixed(2)}
              </text>
              <text x={width - 185} y={padding.top + 95} className="text-xs fill-blue-400 font-mono">
                V: {(hoveredCandle.volume / 1000000).toFixed(1)}M
              </text>
              <text x={width - 185} y={padding.top + 110} className={`text-xs font-mono ${hoveredCandle.close > hoveredCandle.open ? 'fill-green-400' : 'fill-red-400'}`}>
                {hoveredCandle.close > hoveredCandle.open ? '+' : ''}{((hoveredCandle.close - hoveredCandle.open) / hoveredCandle.open * 100).toFixed(2)}%
              </text>
            </g>
          )}
          
          {/* Hover indicator for line chart */}
          {hoveredPoint && chartType === 'line' && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={padding.top}
                x2={hoveredPoint.x}
                y2={padding.top + chartHeight}
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="6,6"
                opacity="0.8"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="8"
                fill="#22c55e"
                stroke="#000000"
                strokeWidth="3"
                filter="url(#greenGlow)"
              />
            </g>
          )}
        </svg>
      </div>
      
      {/* Time period buttons - Now properly contained */}
      <div className="flex items-center justify-center space-x-2">
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 border ${
              selectedPeriod === period 
                ? 'bg-white/20 text-white border-white/50 shadow-lg shadow-white/30' 
                : 'text-gray-400 border-white/20 hover:bg-white/10 hover:border-white/50 hover:text-white'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinInsightChart;