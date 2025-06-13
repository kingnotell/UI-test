import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Brain, Zap } from 'lucide-react';
import CryptoIcon from '../components/CryptoIcon';

const MyAssets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const myAssets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '0.5432',
      avgBuyPrice: '$98,250',
      currentPrice: '$101,491',
      value: '$55,123.45',
      pnl: '+$1,759.32',
      pnlPercent: 3.3,
      status: 'holding',
      aiScore: 9.8
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '12.8',
      avgBuyPrice: '$1,680.50',
      currentPrice: '$1,643.32',
      value: '$21,034.50',
      pnl: '-$476.30',
      pnlPercent: -2.2,
      status: 'holding',
      aiScore: 9.2
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: '85.2',
      avgBuyPrice: '$118.45',
      currentPrice: '$129.79',
      value: '$11,058.71',
      pnl: '+$966.89',
      pnlPercent: 9.6,
      status: 'holding',
      aiScore: 8.7
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: '15,420',
      avgBuyPrice: '$0.42',
      currentPrice: '$0.45',
      value: '$6,939.00',
      pnl: '+$462.60',
      pnlPercent: 7.1,
      status: 'holding',
      aiScore: 7.3
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      amount: '18,500',
      avgBuyPrice: '$0.35',
      currentPrice: '$0.33',
      value: '$6,105.00',
      pnl: '-$370.00',
      pnlPercent: -5.7,
      status: 'holding',
      aiScore: 6.8
    }
  ];

  const filteredAssets = myAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'profitable') return matchesSearch && asset.pnlPercent > 0;
    if (filterType === 'losing') return matchesSearch && asset.pnlPercent < 0;
    
    return matchesSearch;
  });

  const totalValue = myAssets.reduce((sum, asset) => sum + parseFloat(asset.value.replace('$', '').replace(',', '')), 0);
  const totalPnL = myAssets.reduce((sum, asset) => sum + parseFloat(asset.pnl.replace(/[$+,]/g, '')), 0);

  return (
    <div className="space-y-8" style={{ background: '#000000' }}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black rounded-xl p-6 border border-white/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">TOTAL.ASSETS.VALUE</h3>
          <div className="text-2xl font-bold text-white font-mono">${totalValue.toLocaleString()}</div>
        </div>
        
        <div className="bg-black rounded-xl p-6 border border-white/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">TOTAL.P&L</h3>
          <div className={`text-2xl font-bold font-mono ${totalPnL >= 0 ? 'text-white' : 'text-gray-400'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-black rounded-xl p-6 border border-white/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">ASSETS.COUNT</h3>
          <div className="text-2xl font-bold text-white font-mono">{myAssets.length}</div>
        </div>
        
        <div className="bg-black rounded-xl p-6 border border-white/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">BEST.PERFORMER</h3>
          <div className="text-2xl font-bold text-white font-mono">SOL +9.6%</div>
        </div>
      </div>

      {/* Assets Management */}
      <div className="bg-black rounded-xl border border-white/20">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white font-mono flex items-center space-x-2">
              <Brain className="w-5 h-5 text-white" />
              <span>NEURAL.ASSETS</span>
            </h2>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 font-mono">
              <Plus className="w-4 h-4" />
              <span>ADD.ASSET</span>
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {[
                  { key: 'all', label: 'ALL.ASSETS' },
                  { key: 'profitable', label: 'PROFITABLE' },
                  { key: 'losing', label: 'LOSING' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterType(filter.key)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors font-mono border ${
                      filterType === filter.key
                        ? 'bg-white/20 text-white border-white/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10 border-white/20'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="SEARCH.ASSETS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white w-48 text-white placeholder-gray-400 font-mono"
                />
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors font-mono">
                <Filter className="w-4 h-4" />
                <span className="text-sm">NEURAL.FILTER</span>
              </button>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">NEURAL.ASSET</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">HOLDINGS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">AVG.BUY.PRICE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">CURRENT.PRICE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">MARKET.VALUE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">P&L.DATA</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 font-mono">ACTION.NODE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
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
                  <td className="px-6 py-4 text-white font-mono">{asset.avgBuyPrice}</td>
                  <td className="px-6 py-4 font-medium text-white font-mono">{asset.currentPrice}</td>
                  <td className="px-6 py-4 font-medium text-white font-mono">{asset.value}</td>
                  <td className="px-6 py-4">
                    <div className={`${asset.pnlPercent >= 0 ? 'text-white' : 'text-gray-400'}`}>
                      <div className="font-medium font-mono">{asset.pnl}</div>
                      <div className="text-sm flex items-center space-x-1 font-mono">
                        {asset.pnlPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        <span>{Math.abs(asset.pnlPercent)}%</span>
                      </div>
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
  );
};

export default MyAssets;