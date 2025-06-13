import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, Brain, Zap } from 'lucide-react';
import NeuralAllocationChart from '../components/NeuralAllocationChart';
import HalfEyeNeuralNetwork from '../components/HalfEyeNeuralNetwork';

const Analytics: React.FC = () => {
  const analyticsData = [
    {
      title: 'Neural Performance',
      value: '+24.5%',
      change: '+2.1%',
      positive: true,
      icon: TrendingUp,
      aiScore: 9.4
    },
    {
      title: 'Quantum Volume',
      value: '$156,789',
      change: '+15.3%',
      positive: true,
      icon: BarChart3,
      aiScore: 8.7
    },
    {
      title: 'Asset Diversity',
      value: '12 Assets',
      change: '+3',
      positive: true,
      icon: PieChart,
      aiScore: 7.9
    },
    {
      title: 'AI Activity',
      value: '89%',
      change: '-2.1%',
      positive: false,
      icon: Activity,
      aiScore: 8.2
    }
  ];

  const performanceData = [
    { name: 'Q1.2024.AI', value: 28.5, connections: [1, 2] },
    { name: 'Q2.2024.NEURAL', value: 32.1, connections: [0, 2, 3] },
    { name: 'Q3.2024.QUANTUM', value: 24.8, connections: [0, 1, 3] },
    { name: 'Q4.2024.CYBER', value: 14.6, connections: [1, 2] }
  ];

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-black rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg border ${item.positive ? 'bg-white/20 border-white/50' : 'bg-white/10 border-white/20'}`}>
                <item.icon className={`w-5 h-5 ${item.positive ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <div className="text-right">
                <span className={`text-sm font-mono ${item.positive ? 'text-white' : 'text-gray-400'}`}>
                  {item.change}
                </span>
                <div className="text-xs text-gray-400 font-mono">AI:{item.aiScore}</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 font-mono">{item.value}</h3>
              <p className="text-sm text-gray-400 font-mono">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Neural Chart */}
        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2 font-mono">
            <Brain className="w-5 h-5 text-white" />
            <span>QUARTERLY.NEURAL.PERFORMANCE</span>
          </h3>
          <NeuralAllocationChart data={performanceData} />
        </div>

        {/* Half-Eye Neural Network */}
        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2 font-mono">
            <Zap className="w-5 h-5 text-white" />
            <span>QUANTUM.PULSE.ANALYSIS</span>
          </h3>
          <HalfEyeNeuralNetwork />
        </div>
      </div>

      {/* Network Analysis */}
      <div className="bg-black rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2 font-mono">
            <Activity className="w-5 h-5 text-white" />
            <span>NEURAL.CORRELATION.NETWORK</span>
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm font-mono">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white">LIVE.ANALYSIS</span>
            </div>
          </div>
        </div>
        <HalfEyeNeuralNetwork />
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4 font-mono">NEURAL.RISK.ASSESSMENT</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center font-mono">
              <span className="text-gray-400">PORTFOLIO.RISK</span>
              <span className="text-white font-medium">MEDIUM.LEVEL</span>
            </div>
            <div className="w-full bg-black rounded-full h-2 border border-white/20">
              <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="text-sm text-gray-400 font-mono">
              DIVERSIFICATION.SCORE: 7.2/10
            </div>
          </div>
        </div>

        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4 font-mono">VOLATILITY.INDEX</h4>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-mono">23.7</div>
              <div className="text-sm text-gray-400 font-mono">CURRENT.VIX</div>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-gray-400">24H.CHANGE</span>
              <span className="text-white">-2.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4 font-mono">AI.SENTIMENT</h4>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-mono">BULLISH</div>
              <div className="text-sm text-gray-400 font-mono">NEURAL.SENTIMENT</div>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-gray-400">AI.CONFIDENCE</span>
              <span className="text-white">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;