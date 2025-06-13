import React from 'react';
import { Code, Key, Globe, Shield, Brain, Zap } from 'lucide-react';

const DataAPI: React.FC = () => {
  const apiFeatures = [
    {
      title: 'Real-time Neural Data',
      description: 'Get live AI-powered cryptocurrency analysis',
      icon: Globe
    },
    {
      title: 'Quantum Security',
      description: 'Neural keys with quantum encryption',
      icon: Shield
    },
    {
      title: 'AI Integration',
      description: 'Neural API with deep learning capabilities',
      icon: Code
    },
    {
      title: 'Neural Management',
      description: 'Monitor AI usage and manage neural keys',
      icon: Key
    }
  ];

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* API Overview */}
      <div className="bg-black rounded-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-mono flex items-center justify-center space-x-3">
            <Brain className="w-8 h-8 text-white" />
            <span>NEURAL.CRYPTOCURRENCY.DATA.API</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-mono">
            ACCESS.REAL.TIME.NEURAL.DATA.HISTORICAL.PRICES.AND.AI.ANALYTICS.THROUGH.OUR.QUANTUM.API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apiFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-black rounded-lg border border-white/20">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-mono">{feature.title}</h3>
              <p className="text-sm text-gray-400 font-mono">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center space-x-2">
            <Code className="w-5 h-5 text-white" />
            <span>NEURAL.API.ENDPOINTS</span>
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-black rounded-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium border border-white/50 font-mono">GET</span>
                <code className="text-sm text-white font-mono">/api/v1/neural/prices</code>
              </div>
              <p className="text-sm text-gray-400 font-mono">GET.CURRENT.NEURAL.CRYPTOCURRENCY.PRICES</p>
            </div>
            
            <div className="p-4 bg-black rounded-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium border border-white/50 font-mono">GET</span>
                <code className="text-sm text-white font-mono">/api/v1/neural/historical</code>
              </div>
              <p className="text-sm text-gray-400 font-mono">GET.AI.HISTORICAL.PRICE.DATA</p>
            </div>
            
            <div className="p-4 bg-black rounded-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium border border-white/50 font-mono">GET</span>
                <code className="text-sm text-white font-mono">/api/v1/neural/market</code>
              </div>
              <p className="text-sm text-gray-400 font-mono">GET.QUANTUM.MARKET.OVERVIEW.DATA</p>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center space-x-2">
            <Key className="w-5 h-5 text-white" />
            <span>NEURAL.API.KEYS</span>
          </h3>
          <div className="space-y-4">
            <div className="p-4 border border-white/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white font-mono">PRODUCTION.KEY</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium border border-white/50 font-mono">ACTIVE</span>
              </div>
              <code className="text-sm text-gray-400 bg-black p-2 rounded block border border-white/20 font-mono">
                pk_neural_live_1234567890abcdef...
              </code>
            </div>
            
            <div className="p-4 border border-white/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white font-mono">TEST.KEY</span>
                <span className="bg-white/10 text-gray-400 px-2 py-1 rounded text-xs font-medium border border-white/20 font-mono">TEST</span>
              </div>
              <code className="text-sm text-gray-400 bg-black p-2 rounded block border border-white/20 font-mono">
                pk_neural_test_abcdef1234567890...
              </code>
            </div>
            
            <button className="w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-mono">
              GENERATE.NEW.NEURAL.KEY
            </button>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-black rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center space-x-2">
          <Zap className="w-5 h-5 text-white" />
          <span>NEURAL.API.USAGE.STATISTICS</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-black rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-white mb-1 font-mono">1,247</div>
            <div className="text-sm text-gray-400 font-mono">REQUESTS.TODAY</div>
          </div>
          <div className="text-center p-4 bg-black rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-white mb-1 font-mono">89.5%</div>
            <div className="text-sm text-gray-400 font-mono">SUCCESS.RATE</div>
          </div>
          <div className="text-center p-4 bg-black rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-white mb-1 font-mono">125ms</div>
            <div className="text-sm text-gray-400 font-mono">AVG.RESPONSE.TIME</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAPI;