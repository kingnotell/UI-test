import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  TrendingUp, 
  MoreHorizontal,
  BarChart3,
  Wallet,
  PieChart,
  Database,
  HelpCircle,
  User,
  ChevronDown,
  Zap,
  Activity
} from 'lucide-react';
import CryptoIcon from './CryptoIcon';

const watchlistAssets = [
  { symbol: 'ETH', name: 'Ethereum', price: 1643.32, change: -2.17, aiScore: 9.2 },
  { symbol: 'SOL', name: 'Solana', price: 129.79, change: 4.01, aiScore: 8.7 },
  { symbol: 'ADA', name: 'Cardano', price: 0.45, change: -4.10, aiScore: 7.3 }
];

const formatChange = (change: number) => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'NEURAL.DASHBOARD';
      case '/portfolio':
        return 'AI.PORTFOLIO';
      case '/my-assets':
        return 'CYBER.ASSETS';
      case '/market-overview':
        return 'QUANTUM.MARKET';
      case '/analytics':
        return 'DEEP.ANALYTICS';
      case '/data-api':
        return 'NEURAL.API';
      default:
        return 'NEURAL.DASHBOARD';
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-black text-white flex transition-colors duration-200" style={{ background: '#000000' }}>
      {/* Monochrome Sidebar */}
      <div className="w-64 bg-black border-r border-white/20 flex flex-col shadow-2xl" style={{ background: '#000000' }}>
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg">
              <img 
                src="/image copy.png" 
                alt="O.SYSTEM Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">
                O.SYSTEM
              </span>
              <div className="text-xs text-gray-400 font-mono">NEURAL.CORE</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>NEURAL.DASH</span>
              {isActive('/') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
            <Link 
              to="/portfolio" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/portfolio') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <PieChart className="w-5 h-5" />
              <span>AI.PORTFOLIO</span>
              {isActive('/portfolio') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
            <Link 
              to="/my-assets" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/my-assets') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>CYBER.ASSETS</span>
              {isActive('/my-assets') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
            <Link 
              to="/market-overview" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/market-overview') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>QUANTUM.MARKET</span>
              {isActive('/market-overview') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
            <Link 
              to="/analytics" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/analytics') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>DEEP.ANALYTICS</span>
              {isActive('/analytics') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
            <Link 
              to="/data-api" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                isActive('/data-api') 
                  ? 'bg-white/20 text-white border border-white/50' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/30'
              }`}
            >
              <Database className="w-5 h-5" />
              <span>NEURAL.API</span>
              {isActive('/data-api') && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
            </Link>
          </div>

          {/* AI Watchlist */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider font-mono">AI.WATCHLIST</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-xs text-white font-mono">LIVE</span>
              </div>
            </div>
            <div className="space-y-2">
              {watchlistAssets.map((asset) => (
                <div key={asset.symbol} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/30">
                  <CryptoIcon symbol={asset.symbol} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white font-mono">{asset.symbol}</span>
                      <span className="text-xs text-gray-400 font-mono">AI:{asset.aiScore}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-white font-mono">${asset.price}</span>
                      <span className={`text-xs font-mono ${asset.change >= 0 ? 'text-white' : 'text-gray-400'}`}>
                        {formatChange(asset.change)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/20">
          <div className="bg-black rounded-lg p-3 mb-4 border border-white/20" style={{ background: '#000000' }}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-medium text-white font-mono">NEURAL.BOOST</span>
            </div>
            <p className="text-xs text-gray-400 mb-2 font-mono">UNLOCK AI FEATURES</p>
          </div>
          
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-mono border border-transparent hover:border-white/30">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">HELP.CENTER</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-mono border border-transparent hover:border-white/30">
              <Settings className="w-4 h-4" />
              <span className="text-sm">SYSTEM.CONFIG</span>
            </a>
          </div>

          <div className="flex items-center space-x-3 px-3 py-2 mt-4 border border-white/20 rounded-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="text-sm font-medium text-white font-mono">BITT.TIMOTHY</div>
              <div className="text-xs text-gray-400 font-mono">@neural.user</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-black border-b border-white/20 px-8 py-4" style={{ background: '#000000' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold flex items-center space-x-2 text-white font-mono">
                {getPageTitle() === 'NEURAL.DASHBOARD' && <BarChart3 className="w-6 h-6" />}
                {getPageTitle() === 'AI.PORTFOLIO' && <PieChart className="w-6 h-6" />}
                {getPageTitle() === 'CYBER.ASSETS' && <Wallet className="w-6 h-6" />}
                {getPageTitle() === 'QUANTUM.MARKET' && <TrendingUp className="w-6 h-6" />}
                {getPageTitle() === 'DEEP.ANALYTICS' && <Activity className="w-6 h-6" />}
                {getPageTitle() === 'NEURAL.API' && <Database className="w-6 h-6" />}
                <span>{getPageTitle()}</span>
              </h1>
              <div className="bg-white/20 text-white px-3 py-1 rounded border border-white/50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs font-medium font-mono">NEURAL.ONLINE</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="SEARCH.NEURAL..."
                  className="bg-black border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white w-64 text-white placeholder-gray-400 font-mono"
                  style={{ background: '#000000' }}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono">⌘ K</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/30">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-mono">
                MANAGE.NEURAL
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 overflow-y-auto h-full bg-black" style={{ background: '#000000' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;