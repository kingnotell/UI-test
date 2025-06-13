import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Brain, Zap } from 'lucide-react';
import CryptoIcon from '../components/CryptoIcon';
import NeuralAllocationChart from '../components/NeuralAllocationChart';

const Portfolio: React.FC = () => {
  const portfolioAssets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '0.5432',
      value: '$55,123.45',
      price: '$101,491',
      change: 2.5,
      allocation: 45.2,
      aiScore: 9.8
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '12.8',
      value: '$21,034.50',
      price: '$1,643.32',
      change: -1.2,
      allocation: 17.3,
      aiScore: 9.2
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: '85.2',
      value: '$11,058.71',
      price: '$129.79',
      change: 8.4,
      allocation: 9.1,
      aiScore: 8.7
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: '15,420',
      value: '$6,939.00',
      price: '$0.45',
      change: 5.7,
      allocation: 5.7,
      aiScore: 7.3
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      amount: '18,500',
      value: '$6,105.00',
      price: '$0.33',
      change: -3.1,
      allocation: 5.0,
      aiScore: 6.8
    }
  ];

  const allocationData = [
    { name: 'Bitcoin.Neural', value: 45.2, connections: [1, 2] },
    { name: 'Ethereum.AI', value: 17.3, connections: [0, 2, 3] },
    { name: 'Solana.Quantum', value: 9.1, connections: [0, 1, 4] },
    { name: 'Cardano.Core', value: 5.7, connections: [1, 4] },
    { name: 'Others.Net', value: 22.7, connections: [2, 3] }
  ];

  const totalValue = portfolioAssets.reduce((sum, asset) => sum + parseFloat(asset.value.replace('$', '').replace(',', '')), 0);

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400 font-mono">TOTAL.PORTFOLIO.VALUE</h3>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-2 font-mono">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-green-400 font-mono">+12.5% NEURAL.BOOST</div>
        </div>

        <div className="bg-black rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400 font-mono">24H.CHANGE</h3>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2 font-mono">+$2,847</div>
          <div className="text-sm text-green-400 font-mono">+2.8% TODAY</div>
        </div>

        <div className="bg-black rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400 font-mono">BEST.PERFORMER</h3>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2 font-mono">SOL</div>
          <div className="text-sm text-green-400 font-mono">+8.4% AI.BOOST</div>
        </div>
      </div>

      {/* Portfolio Allocation and Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Neural Allocation Chart */}
        <div className="lg:col-span-1">
          <div className="bg-black rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 font-mono flex items-center space-x-2">
              <Brain className="w-5 h-5 text-white" />
              <span>NEURAL.ALLOCATION</span>
            </h3>
            <NeuralAllocationChart data={allocationData} />
          </div>
        </div>

        {/* Portfolio Assets Table */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white font-mono flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-white" />
                  <span>YOUR.NEURAL.ASSETS</span>
                </h2>
                <button className="text-gray-400 text-sm hover:text-white transition-colors font-mono">
                  REBALANCE.PORTFOLIO
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">NEURAL.ASSET</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">HOLDINGS</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">PRICE.DATA</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">VALUE.NET</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">24H.CHANGE</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">ALLOCATION</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">ACTION.NODE</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioAssets.map((asset) => (
                    <tr key={asset.symbol} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <CryptoIcon symbol={asset.symbol} />
                          <div>
                            <div className="font-medium text-white font-mono">{asset.name}</div>
                            <div className="text-sm text-gray-400 font-mono">{asset.symbol} | AI:{asset.aiScore}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-mono">{asset.amount}</td>
                      <td className="px-6 py-4 font-medium text-white font-mono">{asset.price}</td>
                      <td className="px-6 py-4 font-medium text-white font-mono">{asset.value}</td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center space-x-1 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          <span className="font-mono">{Math.abs(asset.change)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-black rounded-full h-2 border border-white/20">
                            <div 
                              className="bg-white h-2 rounded-full" 
                              style={{ width: `${asset.allocation}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-400 font-mono">{asset.allocation}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;