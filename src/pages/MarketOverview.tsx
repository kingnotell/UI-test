import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  MoreHorizontal,
  Brain,
  Zap
} from 'lucide-react';
import CryptoIcon from '../components/CryptoIcon';
import MiniChart from '../components/MiniChart';
import CoinInsightChart from '../components/CoinInsightChart';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  fdv: string;
  chartData: number[];
  rank: number;
  aiScore: number;
}

const topAssets: CryptoAsset[] = [
  {
    id: 'clnd',
    name: 'Colend',
    symbol: 'CLND',
    price: 0.06971,
    change: -0.17,
    volume: '1.2M',
    fdv: '45.2M',
    chartData: [1, 1.2, 0.8, 1.5, 1.1, 0.9, 1.3],
    rank: 1,
    aiScore: 8.4
  },
  {
    id: 'boop',
    name: 'Boop',
    symbol: 'BOOP',
    price: 0.3176,
    change: 4.01,
    volume: '890K',
    fdv: '12.1M',
    chartData: [0.8, 1.1, 1.4, 1.2, 1.6, 1.3, 1.5],
    rank: 2,
    aiScore: 7.9
  },
  {
    id: 'h1',
    name: 'Haven1',
    symbol: 'H1',
    price: 0.03007,
    change: -0.08,
    volume: '3.4M',
    fdv: '78.9M',
    chartData: [1.2, 1.0, 0.9, 1.1, 0.8, 0.95, 1.0],
    rank: 3,
    aiScore: 6.7
  },
  {
    id: 'cndl',
    name: 'CandleTV',
    symbol: 'CNDL',
    price: 0.00058,
    change: 12.45,
    volume: '567K',
    fdv: '8.7M',
    chartData: [0.7, 0.9, 1.1, 1.3, 1.5, 1.2, 1.4],
    rank: 4,
    aiScore: 9.1
  },
  {
    id: 'stokero',
    name: 'Tokero',
    symbol: 'STOKERO',
    price: 0.08607,
    change: 2.20,
    volume: '2.1M',
    fdv: '23.4M',
    chartData: [0.9, 1.1, 1.0, 1.3, 1.2, 1.4, 1.3],
    rank: 5,
    aiScore: 7.2
  }
];

const marketAssets: CryptoAsset[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 101491,
    change: 1.50,
    volume: '21.3B',
    fdv: '1.886B',
    chartData: [0.95, 1.0, 1.05, 1.02, 1.08, 1.12, 1.15],
    rank: 1,
    aiScore: 9.8
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1643.32,
    change: 2.17,
    volume: '9.20B',
    fdv: '219.10B',
    chartData: [0.92, 0.98, 1.02, 1.05, 1.08, 1.06, 1.12],
    rank: 2,
    aiScore: 9.2
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    price: 0.99,
    change: 0.01,
    volume: '36.20B',
    fdv: '139.40B',
    chartData: [1.0, 1.0, 0.999, 1.001, 1.0, 0.999, 1.0],
    rank: 3,
    aiScore: 8.1
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 591.79,
    change: -0.91,
    volume: '1.36B',
    fdv: '83.32B',
    chartData: [1.05, 1.02, 0.98, 0.95, 0.92, 0.94, 0.96],
    rank: 4,
    aiScore: 8.5
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    price: 129.79,
    change: 0.17,
    volume: '1.50B',
    fdv: '88.10B',
    chartData: [0.98, 1.01, 1.04, 1.02, 1.06, 1.03, 1.05],
    rank: 5,
    aiScore: 8.7
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    change: 1.80,
    volume: '0.66B',
    fdv: '30.82B',
    chartData: [0.94, 0.97, 1.01, 1.04, 1.06, 1.08, 1.09],
    rank: 6,
    aiScore: 7.3
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.33,
    change: -1.50,
    volume: '2.08B',
    fdv: '25.81B',
    chartData: [1.08, 1.05, 1.02, 0.98, 0.95, 0.92, 0.94],
    rank: 7,
    aiScore: 6.8
  }
];

const MarketOverview: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(5)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else if (price < 1000) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* Top Assets */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white font-mono flex items-center space-x-2">
            <Brain className="w-6 h-6 text-white" />
            <span>NEWEST.&.MOST.TRADED.NEURAL.ASSETS</span>
          </h2>
          <button className="text-white text-sm hover:text-gray-300 transition-colors font-mono">
            VIEW.ALL.NEURAL →
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {topAssets.map((asset) => (
            <div key={asset.id} className="bg-black border border-white/20 rounded-xl p-4 hover:border-white/50 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <CryptoIcon symbol={asset.symbol} />
                <div>
                  <div className="font-medium text-white font-mono">{asset.name}</div>
                  <div className="text-sm text-gray-400 font-mono">{asset.symbol} | AI:{asset.aiScore}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-lg font-bold text-white font-mono">{formatPrice(asset.price)}</div>
                <div className={`text-sm flex items-center space-x-1`}>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-mono border ${asset.change >= 0 ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                    {formatChange(asset.change)}
                  </span>
                  <span className="text-gray-400 font-mono">
                    {asset.change >= 0 ? 'NEURAL.GAIN' : 'NEURAL.LOSS'} {asset.symbol}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Chart */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white font-mono flex items-center space-x-2">
            <Zap className="w-6 h-6 text-white" />
            <span>NEURAL.PORTFOLIO.PERFORMANCE</span>
          </h2>
          <div className="flex items-center space-x-2 text-sm font-mono">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white">LIVE.DATA</span>
          </div>
        </div>
        <CoinInsightChart />
      </div>

      {/* Asset Market */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-white font-mono flex items-center space-x-2">
          <Brain className="w-6 h-6 text-white" />
          <span>NEURAL.ASSET.MARKET</span>
        </h2>
        
        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
                    activeFilter === filter
                      ? 'bg-white/20 text-white border-white/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/10 border-white/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center space-x-2 px-3 py-1 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors font-mono">
              <span className="text-sm">TOP.NEURAL</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors font-mono">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">TRENDING.AI</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH.NEURAL.ASSET..."
                className="bg-black border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white w-48 text-white placeholder-gray-400 font-mono"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors font-mono">
              <Filter className="w-4 h-4" />
              <span className="text-sm">NEURAL.FILTER</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-black border border-white/20 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20 bg-black/50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">#</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">NEURAL.ASSETS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">PRICE.DATA</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">FDV.NET</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">VOLUME.FLOW</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">AI.CHANGE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">LAST.7.DAYS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">ACTION.NODE</th>
              </tr>
            </thead>
            <tbody>
              {marketAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-mono">{asset.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <CryptoIcon symbol={asset.symbol} />
                      <div>
                        <div className="font-medium text-white font-mono">{asset.name}</div>
                        <div className="text-sm text-gray-400 font-mono">{asset.symbol} | AI:{asset.aiScore}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white font-mono">{formatPrice(asset.price)}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono">{asset.fdv}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono">{asset.volume}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center space-x-1 font-mono ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <span>{asset.change >= 0 ? '▲' : '▼'}</span>
                      <span>{Math.abs(asset.change).toFixed(2)}%</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <MiniChart data={asset.chartData} positive={asset.change >= 0} />
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
  );
};

export default MarketOverview;