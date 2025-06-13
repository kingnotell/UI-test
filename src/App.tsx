import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import MyAssets from './pages/MyAssets';
import MarketOverview from './pages/MarketOverview';
import Analytics from './pages/Analytics';
import DataAPI from './pages/DataAPI';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/my-assets" element={<MyAssets />} />
          <Route path="/market-overview" element={<MarketOverview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/data-api" element={<DataAPI />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;