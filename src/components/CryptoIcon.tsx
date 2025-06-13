import React from 'react';

interface CryptoIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol, size = 'md' }) => {
  const colors = {
    'BTC': 'bg-white text-black',
    'ETH': 'bg-white text-black',
    'USDT': 'bg-white text-black',
    'BNB': 'bg-white text-black',
    'SOL': 'bg-white text-black',
    'ADA': 'bg-white text-black',
    'DOGE': 'bg-white text-black',
    'CLND': 'bg-white text-black',
    'BOOP': 'bg-white text-black',
    'H1': 'bg-white text-black',
    'CNDL': 'bg-white text-black',
    'STOKERO': 'bg-white text-black'
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold border border-white/20 ${colors[symbol as keyof typeof colors] || 'bg-white text-black'}`}>
      {symbol.slice(0, 2)}
    </div>
  );
};

export default CryptoIcon;