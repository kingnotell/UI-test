import React from 'react';
import { TrendingUp, ArrowUpRight, MoreHorizontal, Search, Filter, Zap, Activity, Brain } from 'lucide-react';
import CryptoIcon from '../components/CryptoIcon';
import CoinInsightChart from '../components/CoinInsightChart';

const Dashboard: React.FC = () => {
  const topStars = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$101,491',
      change: '+1.50%',
      positive: true,
      changeLabel: 'NEURAL.GAIN',
      aiScore: 9.8
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$1,643.32',
      change: '+2.17%',
      positive: true,
      changeLabel: 'AI.BOOST',
      aiScore: 9.2
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      price: '$0.9998',
      change: '-0.01%',
      positive: false,
      changeLabel: 'STABLE.CORE',
      aiScore: 8.1
    }
  ];

  const portfolioAssets = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '$7,864.55',
      change: '+5.72%',
      positive: true,
      aiScore: 9.2
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: '$3,547.15',
      change: '+4.73%',
      positive: true,
      aiScore: 8.7
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: '$11,245.08',
      change: '-1.18%',
      positive: false,
      aiScore: 7.3
    }
  ];

  const marketAssets = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$1,643.32',
      volume: '9.20B',
      change: '+2.17%',
      positive: true,
      aiScore: 9.2
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      price: '$0.33',
      volume: '2.08B',
      change: '+3.91%',
      positive: true,
      aiScore: 6.8
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: '$0.45',
      volume: '1.50B',
      change: '+1.80%',
      positive: true,
      aiScore: 7.3
    }
  ];

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2 font-mono">
          <span className="bg-white/20 text-white px-2 py-1 rounded text-xs border border-white/50">3 NEURAL.ASSETS</span>
          <span>RECOMMENDED.TOKENS.24H</span>
          <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Top 3 Neural Stars */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white font-mono flex items-center space-x-2">
                <Brain className="w-6 h-6 text-white" />
                <span>TOP.3.NEURAL.STARS</span>
              </h2>
              <div className="flex items-center space-x-4 text-sm font-mono">
                <select className="border border-white/20 bg-black text-white rounded px-3 py-2 focus:outline-none focus:border-white">
                  <option>24H.SCAN</option>
                </select>
                <select className="border border-white/20 bg-black text-white rounded px-3 py-2 focus:outline-none focus:border-white">
                  <option>AI.PROOF</option>
                </select>
                <select className="border border-white/20 bg-black text-white rounded px-3 py-2 focus:outline-none focus:border-white">
                  <option>DESC.ORDER</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {topStars.map((star, index) => (
                <div key={star.symbol} className="bg-black rounded-xl border border-white/20 p-6 hover:border-white/50 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CryptoIcon symbol={star.symbol} />
                    <div>
                      <div className="font-medium text-white font-mono">{star.name} ({star.symbol})</div>
                      <div className="text-xs text-gray-400 font-mono">AI.SCORE: {star.aiScore}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-3 font-mono">{star.price}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium font-mono border ${
                      star.positive 
                        ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                        : 'bg-red-500/20 text-red-400 border-red-500/50'
                    }`}>
                      {star.change}
                    </span>
                    <span className="text-sm text-gray-400 font-mono">{star.changeLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Portfolio Chart */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white font-mono">NEURAL.PORTFOLIO.CHART</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span className="text-gray-400">DEEP.INSIGHT</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <CoinInsightChart />
          </div>

          {/* Market Overview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <h2 className="text-xl font-semibold text-white font-mono">QUANTUM.MARKET.OVERVIEW</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="SEARCH.ASSET..."
                    className="bg-black border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white w-64 text-white placeholder-gray-400 font-mono"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors font-mono">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">NEURAL.FILTER</span>
                </button>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="bg-black rounded-xl border border-white/20 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20 bg-black/50">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">NEURAL.ASSETS</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">PRICE.DATA</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">VOLUME.FLOW</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">AI.CHANGE</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">ACTION.NODE</th>
                  </tr>
                </thead>
                <tbody>
                  {marketAssets.map((asset, index) => (
                    <tr key={asset.symbol} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <CryptoIcon symbol={asset.symbol} size="sm" />
                          <div>
                            <div className="font-medium text-white font-mono">{asset.name}</div>
                            <div className="text-sm text-gray-400 font-mono">{asset.symbol} | AI:{asset.aiScore}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white font-mono">{asset.price}</td>
                      <td className="px-6 py-4 text-gray-400 font-mono">{asset.volume}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <span className={`${asset.positive ? 'text-green-400' : 'text-red-400'}`}>▲</span>
                          <span className={`font-mono ${asset.positive ? 'text-green-400' : 'text-red-400'}`}>{asset.change.replace('+', '')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 text-gray-400 hover:text-white">
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

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          {/* Neural Balance */}
          <div className="bg-black rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 font-mono">NEURAL.BALANCE</h3>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">$9,524.44</div>
            <div className="grid grid-cols-3 gap-4 text-sm mb-6 font-mono">
              <div>
                <div className="text-gray-400 mb-1">TOTAL.PROFIT</div>
                <div className="font-medium text-green-400">+$2,764.87</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">AVG.GROWTH</div>
                <div className="font-medium text-green-400">+14.53%</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">BEST.TOKEN</div>
                <div className="font-medium text-white">Ethereum</div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-white hover:bg-gray-200 text-black py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all duration-200 font-mono">
                <Zap className="w-4 h-4" />
                <span>NEURAL.BOOST</span>
              </button>
              <button className="flex-1 border border-white/20 text-white hover:bg-white/10 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors font-mono">
                <ArrowUpRight className="w-4 h-4" />
                <span>EXTRACT</span>
              </button>
            </div>
          </div>

          {/* Neural Portfolio */}
          <div className="bg-black rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 font-mono">AI.PORTFOLIO</h3>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between text-sm mb-4 font-mono">
              <span className="font-bold text-2xl text-white">3</span>
              <span className="text-gray-400">TOTAL.ASSETS</span>
              <div className="flex items-center space-x-1">
                <span className="text-green-400 text-sm font-medium">+0.50%</span>
                <span className="text-gray-400 text-xs">PROFIT.30D</span>
              </div>
            </div>
            
            {/* Portfolio allocation bar */}
            <div className="w-full bg-black rounded-full h-3 mb-6 overflow-hidden border border-white/20">
              <div className="flex h-full">
                <div className="bg-white" style={{ width: '45%' }}></div>
                <div className="bg-gray-400" style={{ width: '30%' }}></div>
                <div className="bg-gray-600" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="space-y-4">
              {portfolioAssets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <CryptoIcon symbol={asset.symbol} size="sm" />
                    <div>
                      <div className="font-medium text-white text-sm font-mono">{asset.name} ({asset.symbol})</div>
                      <div className="text-sm text-gray-400 font-mono">{asset.amount} | AI:{asset.aiScore}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium font-mono ${asset.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change}
                    </div>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Transaction */}
          <div className="bg-black rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 font-mono">NEURAL.TRANSACTION</h3>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex space-x-2 mb-6 text-sm font-mono">
              <button className="px-3 py-2 bg-white/20 text-white rounded-lg font-medium border border-white/50">EXCHANGE</button>
              <button className="px-3 py-2 text-gray-400 hover:text-white rounded-lg">TRADE</button>
              <button className="px-3 py-2 text-gray-400 hover:text-white rounded-lg">BUY</button>
              <button className="px-3 py-2 text-gray-400 hover:text-white rounded-lg">SELL</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">AMOUNT.INPUT</label>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-white font-mono">1</span>
                  <select className="border border-white/20 bg-black text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white font-mono">
                    <option>ETH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">RECEIVED.OUTPUT</label>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white font-mono">1643.32</span>
                  <select className="border border-white/20 bg-black text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white font-mono">
                    <option>USD</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-lg font-medium transition-all duration-200 font-mono">
                EXECUTE.TRADE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;