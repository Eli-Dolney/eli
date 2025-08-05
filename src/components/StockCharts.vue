<template>
  <section id="charts">
    <!-- Enhanced Header -->
    <div class="charts-header">
      <div class="header-content">
        <div class="title-section">
          <h1>Market Analysis Dashboard</h1>
          <p class="subtitle">Real-time insights for informed investment decisions</p>
        </div>
        <div class="market-status">
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>Market Open</span>
          </div>
          <div class="last-updated">
            Last updated: {{ currentTime }}
          </div>
        </div>
      </div>
      
      <!-- Enhanced Controls -->
      <div class="filter-controls">
        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-btn', currentCategory === category.id ? 'active' : '']"
            @click="setCategory(category.id)"
          >
            <i :class="category.icon"></i>
            {{ category.name }}
          </button>
        </div>
        <div class="symbol-controls">
          <select v-model="currentSymbol" @change="updateCharts" class="symbol-select">
            <option 
              v-for="symbol in filteredSymbols"
              :value="symbol.ticker"
              :key="symbol.ticker"
            >
              {{ symbol.ticker }} - {{ symbol.name }}
            </option>
          </select>
          <button @click="addToWatchlist" class="watchlist-btn">
            <i class="fas fa-star"></i>
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Grid -->
    <div class="dashboard-grid">
      <!-- Charts Area -->
      <div class="charts-area">
        <div class="charts-header-section">
          <h2>{{ currentSymbol }} Analysis</h2>
          <div class="quick-stats">
            <div class="stat">
              <span class="stat-label">Price</span>
              <span class="stat-value">${{ currentPrice }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Change</span>
              <span :class="['stat-value', currentChange >= 0 ? 'positive' : 'negative']">
                {{ currentChange >= 0 ? '+' : '' }}{{ currentChange }}%
              </span>
            </div>
            <div class="stat">
              <span class="stat-label">Volume</span>
              <span class="stat-value">{{ formatVolume(currentVolume) }}</span>
            </div>
          </div>
        </div>
        
        <div class="charts-grid">
          <div
            v-for="(chart, index) in charts"
            :key="index"
            class="chart-container"
          >
            <div class="chart-header">
              <div class="chart-info">
                <span class="symbol">{{ currentSymbol }}</span>
                <span class="timeframe">{{ chart.timeframeName }}</span>
              </div>
              <div class="chart-actions">
                <button @click="fullscreenChart(chart.containerId)" class="action-btn">
                  <i class="fas fa-expand"></i>
                </button>
              </div>
            </div>
            <div :id="chart.containerId" class="chart"></div>
          </div>
        </div>
      </div>

      <!-- Enhanced Sidebar -->
      <aside class="sidebar">
        <!-- Asset Overview Widget -->
        <div class="widget asset-overview">
          <div class="widget-header">
            <h3><i class="fas fa-chart-line"></i> Asset Overview</h3>
            <div class="widget-actions">
              <button @click="refreshData" class="refresh-btn">
                <i class="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
          <div class="overview-content" v-html="assetOverview"></div>
        </div>
        
        <!-- Technical Analysis Widget -->
        <div class="widget technical-analysis">
          <h3><i class="fas fa-cogs"></i> Technical Analysis</h3>
          <div class="technical-indicators">
            <div class="indicator">
              <span class="indicator-name">RSI</span>
              <span :class="['indicator-value', getRSIClass(rsiValue)]">{{ rsiValue }}</span>
              <span class="indicator-signal">{{ getRSISignal(rsiValue) }}</span>
            </div>
            <div class="indicator">
              <span class="indicator-name">MACD</span>
              <span :class="['indicator-value', macdSignal]">{{ macdSignal }}</span>
            </div>
            <div class="indicator">
              <span class="indicator-name">Support</span>
              <span class="indicator-value">${{ supportLevel }}</span>
            </div>
            <div class="indicator">
              <span class="indicator-name">Resistance</span>
              <span class="indicator-value">${{ resistanceLevel }}</span>
            </div>
          </div>
        </div>
        
        <!-- Market Sentiment Widget -->
        <div class="widget market-sentiment">
          <h3><i class="fas fa-brain"></i> Market Sentiment</h3>
          <div class="sentiment-meter">
            <div class="sentiment-bar">
              <div :style="{ width: sentimentScore + '%' }" class="sentiment-fill"></div>
            </div>
            <div class="sentiment-labels">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
          </div>
          <p class="sentiment-description">{{ sentimentDescription }}</p>
        </div>
        
        <!-- Trending Assets Widget -->
        <div class="widget trending-assets">
          <h3><i class="fas fa-fire"></i> Trending in {{ categories.find(c => c.id === currentCategory).name }}</h3>
          <div class="trending-list">
            <div 
              v-for="(trend, index) in trendingInCategory" 
              :key="index" 
              @click="setSymbol(trend.ticker)"
              class="trend-item"
            >
              <div class="trend-info">
                <span class="trend-symbol">{{ trend.ticker }}</span>
                <span class="trend-name">{{ trend.name }}</span>
              </div>
              <div class="trend-metrics">
                <span :class="['trend-change', trend.change >= 0 ? 'positive' : 'negative']">
                  {{ trend.change >= 0 ? '+' : '' }}{{ trend.change }}%
                </span>
                <span class="trend-volume">{{ formatVolume(trend.volume) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Investment Insights Widget -->
        <div class="widget investment-insights">
          <h3><i class="fas fa-lightbulb"></i> Investment Insights</h3>
          <div class="insights-content">
            <div class="insight-item">
              <div class="insight-header">
                <i class="fas fa-chart-bar"></i>
                <span>Risk Level</span>
              </div>
              <div class="risk-meter">
                <div :style="{ width: riskLevel + '%' }" class="risk-fill"></div>
              </div>
              <span class="risk-label">{{ riskLabel }}</span>
            </div>
            <div class="insight-item">
              <div class="insight-header">
                <i class="fas fa-clock"></i>
                <span>Time Horizon</span>
              </div>
              <span class="time-horizon">{{ timeHorizon }}</span>
            </div>
            <div class="insight-item">
              <div class="insight-header">
                <i class="fas fa-percentage"></i>
                <span>Allocation Suggestion</span>
              </div>
              <span class="allocation">{{ allocationSuggestion }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
export default {
  name: "StockCharts",
  data() {
    return {
      currentSymbol: 'AAPL',
      currentCategory: 'tech',
      categories: [
        { id: 'tech', name: 'Technology', icon: 'fas fa-code' },
        { id: 'growth', name: 'Growth Stocks', icon: 'fas fa-rocket' },
        { id: 'crypto', name: 'Crypto', icon: 'fas fa-bitcoin' },
        { id: 'etf', name: 'ETFs', icon: 'fas fa-chart-bar' },
        { id: 'sustainability', name: 'Sustainability', icon: 'fas fa-leaf' },
        { id: 'chickenalfredo', name: 'Chicken alfredo', icon: 'fas fa-utensils' }
      ],
      symbols: [
        // Technology
        { ticker: 'AAPL', name: 'Apple Inc.', category: 'tech', change: 0.98, price: 175.43, volume: 45678900, rsi: 65, macdSignal: 'Bullish', supportLevel: 170.50, resistanceLevel: 180.00, sentimentScore: 75, sentimentDescription: 'Strong institutional buying with positive earnings outlook', riskLevel: 35, riskLabel: 'Low-Medium', timeHorizon: 'Long-term', allocationSuggestion: '5-10%' },
        { ticker: 'MSFT', name: 'Microsoft', category: 'tech', change: 1.45, price: 378.85, volume: 23456700, rsi: 72, macdSignal: 'Bullish', supportLevel: 370.00, resistanceLevel: 385.00, sentimentScore: 80, sentimentDescription: 'AI leadership position driving strong growth', riskLevel: 30, riskLabel: 'Low', timeHorizon: 'Long-term', allocationSuggestion: '8-12%' },
        { ticker: 'GOOGL', name: 'Alphabet', category: 'tech', change: 0.75, price: 142.56, volume: 34567800, rsi: 58, macdSignal: 'Neutral', supportLevel: 140.00, resistanceLevel: 145.00, sentimentScore: 65, sentimentDescription: 'Stable performance with AI integration potential', riskLevel: 40, riskLabel: 'Medium', timeHorizon: 'Medium-term', allocationSuggestion: '3-7%' },
        { ticker: 'AMZN', name: 'Amazon', category: 'tech', change: -0.52, price: 145.24, volume: 56789000, rsi: 45, macdSignal: 'Bearish', supportLevel: 142.00, resistanceLevel: 148.00, sentimentScore: 55, sentimentDescription: 'Mixed signals with cloud growth offsetting retail concerns', riskLevel: 45, riskLabel: 'Medium', timeHorizon: 'Medium-term', allocationSuggestion: '4-8%' },
        { ticker: 'META', name: 'Meta Platforms', category: 'tech', change: 2.14, price: 334.69, volume: 23456700, rsi: 78, macdSignal: 'Bullish', supportLevel: 330.00, resistanceLevel: 340.00, sentimentScore: 85, sentimentDescription: 'Strong AI and VR positioning driving momentum', riskLevel: 50, riskLabel: 'Medium-High', timeHorizon: 'Medium-term', allocationSuggestion: '3-6%' },
        { ticker: 'NVDA', name: 'NVIDIA', category: 'tech', change: 3.25, price: 485.09, volume: 67890100, rsi: 82, macdSignal: 'Bullish', supportLevel: 480.00, resistanceLevel: 490.00, sentimentScore: 90, sentimentDescription: 'AI chip dominance creating unprecedented demand', riskLevel: 60, riskLabel: 'High', timeHorizon: 'Short-term', allocationSuggestion: '2-5%' },
        { ticker: 'AMD', name: 'Advanced Micro Devices', category: 'tech', change: 1.78, price: 128.45, volume: 45678900, rsi: 68, macdSignal: 'Bullish', supportLevel: 125.00, resistanceLevel: 130.00, sentimentScore: 75, sentimentDescription: 'Strong product lineup competing effectively with NVIDIA', riskLevel: 55, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '2-4%' },
        { ticker: 'TSLA', name: 'Tesla Inc', category: 'tech', change: -1.23, price: 248.42, volume: 78901200, rsi: 42, macdSignal: 'Bearish', supportLevel: 245.00, resistanceLevel: 255.00, sentimentScore: 45, sentimentDescription: 'EV market competition and margin pressure concerns', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-3%' },
        { ticker: 'UBER', name: 'Uber Technologies', category: 'tech', change: 0.85, price: 67.23, volume: 23456700, rsi: 62, macdSignal: 'Neutral', supportLevel: 65.00, resistanceLevel: 70.00, sentimentScore: 60, sentimentDescription: 'Stable ride-sharing with delivery growth potential', riskLevel: 65, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'PYPL', name: 'PayPal Holdings', category: 'tech', change: -0.42, price: 58.76, volume: 34567800, rsi: 38, macdSignal: 'Bearish', supportLevel: 57.00, resistanceLevel: 60.00, sentimentScore: 40, sentimentDescription: 'Payment competition and margin pressure', riskLevel: 60, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-2%' },
        
        // Growth Stocks
        { ticker: 'SHOP', name: 'Shopify', category: 'growth', change: 1.15, price: 67.89, volume: 23456700, rsi: 65, macdSignal: 'Bullish', supportLevel: 65.00, resistanceLevel: 70.00, sentimentScore: 70, sentimentDescription: 'E-commerce platform growth with AI integration', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'CRWD', name: 'CrowdStrike', category: 'growth', change: 2.38, price: 234.56, volume: 12345600, rsi: 75, macdSignal: 'Bullish', supportLevel: 230.00, resistanceLevel: 240.00, sentimentScore: 80, sentimentDescription: 'Cybersecurity leader with strong growth metrics', riskLevel: 65, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'SNOW', name: 'Snowflake', category: 'growth', change: 0.94, price: 156.78, volume: 23456700, rsi: 58, macdSignal: 'Neutral', supportLevel: 155.00, resistanceLevel: 160.00, sentimentScore: 65, sentimentDescription: 'Cloud data platform with enterprise adoption', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-2%' },
        { ticker: 'RBLX', name: 'Roblox', category: 'growth', change: -0.67, price: 34.56, volume: 34567800, rsi: 45, macdSignal: 'Bearish', supportLevel: 34.00, resistanceLevel: 35.00, sentimentScore: 50, sentimentDescription: 'Gaming platform with user growth challenges', riskLevel: 75, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'ABNB', name: 'Airbnb', category: 'growth', change: 1.28, price: 145.67, volume: 23456700, rsi: 68, macdSignal: 'Bullish', supportLevel: 143.00, resistanceLevel: 148.00, sentimentScore: 70, sentimentDescription: 'Travel recovery and international expansion', riskLevel: 65, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'PINS', name: 'Pinterest', category: 'growth', change: 3.45, price: 23.45, volume: 45678900, rsi: 78, macdSignal: 'Bullish', supportLevel: 23.00, resistanceLevel: 24.00, sentimentScore: 75, sentimentDescription: 'Social commerce integration driving growth', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'PLTR', name: 'Palantir', category: 'growth', change: 0.89, price: 15.67, volume: 67890100, rsi: 62, macdSignal: 'Neutral', supportLevel: 15.50, resistanceLevel: 16.00, sentimentScore: 60, sentimentDescription: 'Government contracts with commercial expansion', riskLevel: 75, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-2%' },
        { ticker: 'NET', name: 'Cloudflare', category: 'growth', change: 2.01, price: 67.89, volume: 23456700, rsi: 72, macdSignal: 'Bullish', supportLevel: 66.00, resistanceLevel: 70.00, sentimentScore: 75, sentimentDescription: 'CDN and security services growth', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'DASH', name: 'DoorDash', category: 'growth', change: -0.34, price: 89.12, volume: 23456700, rsi: 48, macdSignal: 'Bearish', supportLevel: 88.00, resistanceLevel: 90.00, sentimentScore: 55, sentimentDescription: 'Food delivery with profitability challenges', riskLevel: 75, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'DKNG', name: 'DraftKings', category: 'growth', change: 1.56, price: 34.56, volume: 34567800, rsi: 65, macdSignal: 'Bullish', supportLevel: 34.00, resistanceLevel: 35.00, sentimentScore: 65, sentimentDescription: 'Sports betting expansion with regulatory tailwinds', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        
        // Crypto
        { ticker: 'BTCUSD', name: 'Bitcoin', category: 'crypto', change: 2.75, price: 43250.00, volume: 123456789, rsi: 68, macdSignal: 'Bullish', supportLevel: 42000, resistanceLevel: 44000, sentimentScore: 75, sentimentDescription: 'Institutional adoption and ETF inflows', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-5%' },
        { ticker: 'ETHUSD', name: 'Ethereum', category: 'crypto', change: 1.95, price: 2650.00, volume: 98765432, rsi: 62, macdSignal: 'Neutral', supportLevel: 2600, resistanceLevel: 2700, sentimentScore: 65, sentimentDescription: 'Smart contract platform with DeFi growth', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-3%' },
        { ticker: 'SOLUSD', name: 'Solana', category: 'crypto', change: 4.32, price: 98.45, volume: 56789012, rsi: 75, macdSignal: 'Bullish', supportLevel: 95, resistanceLevel: 100, sentimentScore: 80, sentimentDescription: 'High-performance blockchain with strong developer activity', riskLevel: 90, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'DOTUSD', name: 'Polkadot', category: 'crypto', change: -1.05, price: 6.78, volume: 34567890, rsi: 45, macdSignal: 'Bearish', supportLevel: 6.50, resistanceLevel: 7.00, sentimentScore: 50, sentimentDescription: 'Interoperability focus with network development', riskLevel: 90, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'AVAXUSD', name: 'Avalanche', category: 'crypto', change: 3.21, price: 23.45, volume: 23456789, rsi: 72, macdSignal: 'Bullish', supportLevel: 23, resistanceLevel: 24, sentimentScore: 70, sentimentDescription: 'Subnet technology driving adoption', riskLevel: 90, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'COIN', name: 'Coinbase Global', category: 'crypto', change: 2.15, price: 145.67, volume: 23456700, rsi: 68, macdSignal: 'Bullish', supportLevel: 143, resistanceLevel: 148, sentimentScore: 70, sentimentDescription: 'Crypto exchange benefiting from market recovery', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'MARA', name: 'Marathon Digital', category: 'crypto', change: 3.85, price: 23.45, volume: 34567800, rsi: 75, macdSignal: 'Bullish', supportLevel: 23, resistanceLevel: 24, sentimentScore: 75, sentimentDescription: 'Bitcoin mining with operational efficiency', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'RIOT', name: 'Riot Platforms', category: 'crypto', change: 2.67, price: 12.34, volume: 45678900, rsi: 72, macdSignal: 'Bullish', supportLevel: 12, resistanceLevel: 12.50, sentimentScore: 70, sentimentDescription: 'Bitcoin mining with expansion plans', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        
        // ETFs
        { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', category: 'etf', change: 0.53, price: 456.78, volume: 12345600, rsi: 55, macdSignal: 'Neutral', supportLevel: 455, resistanceLevel: 458, sentimentScore: 60, sentimentDescription: 'Broad market exposure with low expense ratio', riskLevel: 25, riskLabel: 'Low', timeHorizon: 'Long-term', allocationSuggestion: '20-40%' },
        { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', category: 'etf', change: 0.48, price: 234.56, volume: 9876540, rsi: 54, macdSignal: 'Neutral', supportLevel: 234, resistanceLevel: 235, sentimentScore: 58, sentimentDescription: 'Complete market coverage for diversification', riskLevel: 25, riskLabel: 'Low', timeHorizon: 'Long-term', allocationSuggestion: '15-30%' },
        { ticker: 'QQQ', name: 'Invesco QQQ Trust', category: 'etf', change: 1.12, price: 378.90, volume: 23456700, rsi: 68, macdSignal: 'Bullish', supportLevel: 375, resistanceLevel: 380, sentimentScore: 70, sentimentDescription: 'Tech-heavy exposure with strong momentum', riskLevel: 40, riskLabel: 'Medium', timeHorizon: 'Medium-term', allocationSuggestion: '10-20%' },
        { ticker: 'ARKK', name: 'ARK Innovation ETF', category: 'etf', change: -0.75, price: 45.67, volume: 34567800, rsi: 42, macdSignal: 'Bearish', supportLevel: 45, resistanceLevel: 46, sentimentScore: 45, sentimentDescription: 'Innovation focus with high volatility', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '2-5%' },
        { ticker: 'VUG', name: 'Vanguard Growth ETF', category: 'etf', change: 0.62, price: 234.56, volume: 12345600, rsi: 65, macdSignal: 'Bullish', supportLevel: 233, resistanceLevel: 235, sentimentScore: 65, sentimentDescription: 'Growth stock exposure with lower volatility', riskLevel: 45, riskLabel: 'Medium', timeHorizon: 'Medium-term', allocationSuggestion: '10-20%' },
        { ticker: 'SCHD', name: 'Schwab US Dividend Equity ETF', category: 'etf', change: 0.35, price: 78.90, volume: 9876540, rsi: 52, macdSignal: 'Neutral', supportLevel: 78.50, resistanceLevel: 79, sentimentScore: 55, sentimentDescription: 'Dividend focus with income generation', riskLevel: 30, riskLabel: 'Low-Medium', timeHorizon: 'Long-term', allocationSuggestion: '10-20%' },
        { ticker: 'JEPI', name: 'JPMorgan Equity Premium Income ETF', category: 'etf', change: 0.28, price: 56.78, volume: 12345600, rsi: 50, macdSignal: 'Neutral', supportLevel: 56.50, resistanceLevel: 57, sentimentScore: 52, sentimentDescription: 'Income generation with covered call strategy', riskLevel: 35, riskLabel: 'Low-Medium', timeHorizon: 'Long-term', allocationSuggestion: '5-15%' },
        
        // Sustainability
        { ticker: 'ENPH', name: 'Enphase Energy', category: 'sustainability', change: -0.83, price: 123.45, volume: 23456700, rsi: 42, macdSignal: 'Bearish', supportLevel: 122, resistanceLevel: 125, sentimentScore: 45, sentimentDescription: 'Solar microinverter market challenges', riskLevel: 60, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '2-5%' },
        { ticker: 'SEDG', name: 'SolarEdge', category: 'sustainability', change: -1.21, price: 67.89, volume: 34567800, rsi: 38, macdSignal: 'Bearish', supportLevel: 67, resistanceLevel: 68, sentimentScore: 40, sentimentDescription: 'Solar inverter competition pressure', riskLevel: 65, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '2-4%' },
        { ticker: 'FSLR', name: 'First Solar', category: 'sustainability', change: 1.37, price: 145.67, volume: 23456700, rsi: 65, macdSignal: 'Bullish', supportLevel: 144, resistanceLevel: 146, sentimentScore: 65, sentimentDescription: 'Solar panel manufacturing with policy support', riskLevel: 55, riskLabel: 'Medium-High', timeHorizon: 'Medium-term', allocationSuggestion: '2-5%' },
        { ticker: 'NEE', name: 'NextEra Energy', category: 'sustainability', change: 0.52, price: 67.89, volume: 12345600, rsi: 58, macdSignal: 'Neutral', supportLevel: 67.50, resistanceLevel: 68, sentimentScore: 60, sentimentDescription: 'Renewable energy utility with stable growth', riskLevel: 40, riskLabel: 'Medium', timeHorizon: 'Long-term', allocationSuggestion: '3-7%' },
        { ticker: 'ICLN', name: 'iShares Global Clean Energy ETF', category: 'sustainability', change: 0.64, price: 23.45, volume: 23456700, rsi: 62, macdSignal: 'Neutral', supportLevel: 23.30, resistanceLevel: 23.50, sentimentScore: 60, sentimentDescription: 'Global clean energy exposure', riskLevel: 50, riskLabel: 'Medium', timeHorizon: 'Medium-term', allocationSuggestion: '3-7%' },
        { ticker: 'STEM', name: 'Stem Inc', category: 'sustainability', change: -0.92, price: 4.56, volume: 45678900, rsi: 35, macdSignal: 'Bearish', supportLevel: 4.50, resistanceLevel: 4.60, sentimentScore: 35, sentimentDescription: 'Energy storage with execution challenges', riskLevel: 75, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'CHPT', name: 'ChargePoint Holdings', category: 'sustainability', change: 1.15, price: 2.34, volume: 56789000, rsi: 65, macdSignal: 'Bullish', supportLevel: 2.30, resistanceLevel: 2.40, sentimentScore: 60, sentimentDescription: 'EV charging infrastructure growth', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },

        // Chicken alfredo category (Space/Innovation)
        { ticker: 'ASTS', name: 'AST SPACEMOBILE, INC.', category: 'chickenalfredo', change: 0.0, price: 3.45, volume: 12345600, rsi: 50, macdSignal: 'Neutral', supportLevel: 3.40, resistanceLevel: 3.50, sentimentScore: 50, sentimentDescription: 'Satellite communications technology', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'RKLB', name: 'ROCKET LAB USA, INC.', category: 'chickenalfredo', change: 0.0, price: 4.56, volume: 23456700, rsi: 48, macdSignal: 'Neutral', supportLevel: 4.50, resistanceLevel: 4.60, sentimentScore: 48, sentimentDescription: 'Small satellite launch services', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'LUNR', name: 'INTUITIVE MACHINES, INC.', category: 'chickenalfredo', change: 0.0, price: 5.67, volume: 34567800, rsi: 52, macdSignal: 'Neutral', supportLevel: 5.60, resistanceLevel: 5.70, sentimentScore: 52, sentimentDescription: 'Lunar lander technology', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'PL', name: 'PLANET LABS PBC', category: 'chickenalfredo', change: 0.0, price: 3.21, volume: 23456700, rsi: 45, macdSignal: 'Neutral', supportLevel: 3.20, resistanceLevel: 3.25, sentimentScore: 45, sentimentDescription: 'Earth observation satellites', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'TOST', name: 'TOAST, INC.', category: 'chickenalfredo', change: 0.0, price: 23.45, volume: 23456700, rsi: 55, macdSignal: 'Neutral', supportLevel: 23.30, resistanceLevel: 23.50, sentimentScore: 55, sentimentDescription: 'Restaurant management software', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'IONQ', name: 'IONQ, INC.', category: 'chickenalfredo', change: 0.0, price: 12.34, volume: 34567800, rsi: 58, macdSignal: 'Neutral', supportLevel: 12.20, resistanceLevel: 12.40, sentimentScore: 58, sentimentDescription: 'Quantum computing technology', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'MSTR', name: 'MICROSTRATEGY INCORPORATED', category: 'chickenalfredo', change: 0.0, price: 456.78, volume: 12345600, rsi: 65, macdSignal: 'Bullish', supportLevel: 455, resistanceLevel: 458, sentimentScore: 65, sentimentDescription: 'Bitcoin-focused business intelligence', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'LNZA', name: 'LANZATECH GLOBAL, INC', category: 'chickenalfredo', change: 0.0, price: 2.34, volume: 45678900, rsi: 42, macdSignal: 'Neutral', supportLevel: 2.30, resistanceLevel: 2.40, sentimentScore: 42, sentimentDescription: 'Carbon recycling technology', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'BABA', name: 'Alibaba Group Holding Limited', category: 'chickenalfredo', change: 0.0, price: 78.90, volume: 23456700, rsi: 48, macdSignal: 'Neutral', supportLevel: 78.50, resistanceLevel: 79, sentimentScore: 48, sentimentDescription: 'Chinese e-commerce and cloud services', riskLevel: 75, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'AMTX', name: 'AEMETIS, INC.', category: 'chickenalfredo', change: 0.0, price: 3.45, volume: 23456700, rsi: 52, macdSignal: 'Neutral', supportLevel: 3.40, resistanceLevel: 3.50, sentimentScore: 52, sentimentDescription: 'Renewable fuels and chemicals', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'SMCI', name: 'SUPER MICRO COMPUTER, INC.', category: 'chickenalfredo', change: 0.0, price: 234.56, volume: 34567800, rsi: 75, macdSignal: 'Bullish', supportLevel: 230, resistanceLevel: 240, sentimentScore: 75, sentimentDescription: 'AI server and storage solutions', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-3%' },
        { ticker: 'LODE', name: 'COMSTOCK INC.', category: 'chickenalfredo', change: 0.0, price: 0.45, volume: 56789000, rsi: 48, macdSignal: 'Neutral', supportLevel: 0.44, resistanceLevel: 0.46, sentimentScore: 48, sentimentDescription: 'Sustainable mining and materials', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'TSAT', name: 'Telesat Corporation', category: 'chickenalfredo', change: 0.0, price: 12.34, volume: 23456700, rsi: 45, macdSignal: 'Neutral', supportLevel: 12.20, resistanceLevel: 12.40, sentimentScore: 45, sentimentDescription: 'Satellite communications services', riskLevel: 80, riskLabel: 'Very High', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'SPIR', name: 'SPIRE GLOBAL, INC.', category: 'chickenalfredo', change: 0.0, price: 1.23, volume: 45678900, rsi: 42, macdSignal: 'Neutral', supportLevel: 1.20, resistanceLevel: 1.25, sentimentScore: 42, sentimentDescription: 'Space-based data and analytics', riskLevel: 85, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'SPCE', name: 'VIRGIN GALACTIC HOLDINGS, INC.', category: 'chickenalfredo', change: 0.0, price: 2.34, volume: 56789000, rsi: 38, macdSignal: 'Neutral', supportLevel: 2.30, resistanceLevel: 2.40, sentimentScore: 38, sentimentDescription: 'Space tourism and transportation', riskLevel: 90, riskLabel: 'Extreme', timeHorizon: 'Short-term', allocationSuggestion: '1-2%' },
        { ticker: 'ATKR', name: 'ATKORE INC', category: 'chickenalfredo', change: 0.0, price: 145.67, volume: 12345600, rsi: 62, macdSignal: 'Neutral', supportLevel: 145, resistanceLevel: 146, sentimentScore: 62, sentimentDescription: 'Electrical and safety products', riskLevel: 60, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'VRT', name: 'Vertiv Holdings Co', category: 'chickenalfredo', change: 0.0, price: 67.89, volume: 23456700, rsi: 68, macdSignal: 'Bullish', supportLevel: 67.50, resistanceLevel: 68, sentimentScore: 68, sentimentDescription: 'Data center infrastructure solutions', riskLevel: 65, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'GEV', name: 'GE VERNOVA INC.', category: 'chickenalfredo', change: 0.0, price: 123.45, volume: 23456700, rsi: 58, macdSignal: 'Neutral', supportLevel: 123, resistanceLevel: 124, sentimentScore: 58, sentimentDescription: 'Energy technology and services', riskLevel: 70, riskLabel: 'Very High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' },
        { ticker: 'RRX', name: 'Regal Rexnord Corporation', category: 'chickenalfredo', change: 0.0, price: 145.67, volume: 12345600, rsi: 55, macdSignal: 'Neutral', supportLevel: 145, resistanceLevel: 146, sentimentScore: 55, sentimentDescription: 'Industrial power transmission', riskLevel: 60, riskLabel: 'High', timeHorizon: 'Medium-term', allocationSuggestion: '1-3%' }
      ],
      charts: [
        { containerId: 'chart1', timeframe: '15', timeframeName: '15 Minutes' },
        { containerId: 'chart2', timeframe: '60', timeframeName: '1 Hour' },
        { containerId: 'chart3', timeframe: '240', timeframeName: '4 Hours' },
        { containerId: 'chart4', timeframe: 'D', timeframeName: '1 Day' },
        { containerId: 'chart5', timeframe: 'W', timeframeName: '1 Week' },
        { containerId: 'chart6', timeframe: 'M', timeframeName: '1 Month' }
      ],
      relevantData: '',
      currentPrice: 0,
      currentChange: 0,
      currentVolume: 0,
      rsiValue: 0,
      macdSignal: '',
      supportLevel: 0,
      resistanceLevel: 0,
      sentimentScore: 0,
      sentimentDescription: '',
      riskLevel: 0,
      riskLabel: '',
      timeHorizon: '',
      allocationSuggestion: '',
      currentTime: ''
    };
  },
  computed: {
    filteredSymbols() {
      return this.symbols.filter(symbol => symbol.category === this.currentCategory);
    },
    trendingInCategory() {
      // Sort by absolute change value to get most volatile first, then limit to 5
      return [...this.filteredSymbols]
        .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
        .slice(0, 5);
    }
  },
  mounted() {
    this.loadTradingViewScript().then(() => {
      this.loadCharts();
      this.refreshData(); // Initial data load
      this.updateTime(); // Update time every second
    });
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  methods: {
    loadTradingViewScript() {
      return new Promise((resolve) => {
        if (window.TradingView) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    },
    loadCharts() {
      this.charts.forEach(chart => {
        this.createTradingViewWidget(
          chart.containerId,
          this.currentSymbol,
          chart.timeframe,
          chart.timeframeName
        );
      });
      this.updateRelevantData();
    },
    createTradingViewWidget(containerId, symbol, interval, timeframeName) {
      if (!window.TradingView) return;
      new window.TradingView.widget({
        width: '100%',
        height: '100%',
        symbol: symbol,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#1E222D',
        enable_publishing: false,
        hide_top_toolbar: true,
        hide_legend: false,
        save_image: false,
        container_id: containerId,
        studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies'],
        studies_overrides: {
          'rsi.rsi.color': '#71D9B3',
          'rsi.rsi.linewidth': 2,
          'MA.plot.color': '#4D208C',
          'MA.plot.linewidth': 2
        },
        overrides: {
          'paneProperties.background': '#131722',
          'paneProperties.vertGridProperties.color': '#242832',
          'paneProperties.horzGridProperties.color': '#242832',
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': '#AAA',
          'mainSeriesProperties.candleStyle.upColor': '#71D9B3',
          'mainSeriesProperties.candleStyle.downColor': '#F85050',
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderUpColor': '#71D9B3',
          'mainSeriesProperties.candleStyle.borderDownColor': '#F85050',
          'mainSeriesProperties.candleStyle.wickUpColor': '#71D9B3',
          'mainSeriesProperties.candleStyle.wickDownColor': '#F85050'
        }
      });
    },
    updateCharts() {
      this.charts.forEach(chart => {
        this.createTradingViewWidget(
          chart.containerId,
          this.currentSymbol,
          chart.timeframe,
          chart.timeframeName
        );
      });
      this.updateRelevantData();
    },
    setCategory(categoryId) {
      this.currentCategory = categoryId;
      // Set first symbol from the category
      const firstSymbol = this.filteredSymbols[0];
      if (firstSymbol) {
        this.currentSymbol = firstSymbol.ticker;
        this.updateCharts();
      }
    },
    setSymbol(symbol) {
      this.currentSymbol = symbol;
      this.updateCharts();
    },
    updateRelevantData() {
      const symbol = this.symbols.find(s => s.ticker === this.currentSymbol);
      if (!symbol) {
        this.assetOverview = `<p>No data available for ${this.currentSymbol}.</p>`;
        return;
      }
      
      // Generate relevant content based on category
      if (symbol.category === 'tech') {
        this.assetOverview = this.generateTechInfo(symbol);
      } else if (symbol.category === 'crypto') {
        this.assetOverview = this.generateCryptoInfo(symbol);
      } else if (symbol.category === 'etf') {
        this.assetOverview = this.generateETFInfo(symbol);
      } else if (symbol.category === 'sustainability') {
        this.assetOverview = this.generateSustainabilityInfo(symbol);
      } else {
        this.assetOverview = this.generateGrowthInfo(symbol);
      }
    },
    generateTechInfo(symbol) {
      return `
        <div class="info-card">
          <div class="info-header">
            <h4>${symbol.name} (${symbol.ticker})</h4>
            <span class="${symbol.change >= 0 ? 'positive' : 'negative'}">${symbol.change >= 0 ? '+' : ''}${symbol.change}%</span>
          </div>
          <p>Key tech stock for young investors with long-term growth potential.</p>
          <div class="info-metrics">
            <div class="metric">
              <span class="label">Sector</span>
              <span class="value">Technology</span>
            </div>
            <div class="metric">
              <span class="label">Volatility</span>
              <span class="value">Medium</span>
            </div>
            <div class="metric">
              <span class="label">Recommendation</span>
              <span class="value recommendation">Long-Term Hold</span>
            </div>
          </div>
          <p class="analysis">Tech stocks are essential for 20-somethings building wealth for the future. These companies drive innovation and have strong growth trajectories.</p>
        </div>
      `;
    },
    generateCryptoInfo(symbol) {
      return `
        <div class="info-card">
          <div class="info-header">
            <h4>${symbol.name} (${symbol.ticker})</h4>
            <span class="${symbol.change >= 0 ? 'positive' : 'negative'}">${symbol.change >= 0 ? '+' : ''}${symbol.change}%</span>
          </div>
          <p>Digital asset with high volatility but significant growth potential.</p>
          <div class="info-metrics">
            <div class="metric">
              <span class="label">Asset Type</span>
              <span class="value">Cryptocurrency</span>
            </div>
            <div class="metric">
              <span class="label">Volatility</span>
              <span class="value">High</span>
            </div>
            <div class="metric">
              <span class="label">Recommendation</span>
              <span class="value recommendation">Small Position</span>
            </div>
          </div>
          <p class="analysis">Crypto assets can be appropriate for younger investors with higher risk tolerance. Consider allocating only a small percentage of your portfolio (5-10%) to this asset class.</p>
        </div>
      `;
    },
    generateETFInfo(symbol) {
      return `
        <div class="info-card">
          <div class="info-header">
            <h4>${symbol.name} (${symbol.ticker})</h4>
            <span class="${symbol.change >= 0 ? 'positive' : 'negative'}">${symbol.change >= 0 ? '+' : ''}${symbol.change}%</span>
          </div>
          <p>Diversified fund offering broad market exposure with lower risk.</p>
          <div class="info-metrics">
            <div class="metric">
              <span class="label">Asset Type</span>
              <span class="value">Exchange-Traded Fund</span>
            </div>
            <div class="metric">
              <span class="label">Volatility</span>
              <span class="value">Low-Medium</span>
            </div>
            <div class="metric">
              <span class="label">Recommendation</span>
              <span class="value recommendation">Core Holding</span>
            </div>
          </div>
          <p class="analysis">ETFs are excellent core holdings for investors in their 20s. They provide instant diversification and are ideal for regular contributions through dollar-cost averaging.</p>
        </div>
      `;
    },
    generateSustainabilityInfo(symbol) {
      return `
        <div class="info-card">
          <div class="info-header">
            <h4>${symbol.name} (${symbol.ticker})</h4>
            <span class="${symbol.change >= 0 ? 'positive' : 'negative'}">${symbol.change >= 0 ? '+' : ''}${symbol.change}%</span>
          </div>
          <p>Investment focused on renewable energy and sustainable business practices.</p>
          <div class="info-metrics">
            <div class="metric">
              <span class="label">Sector</span>
              <span class="value">Clean Energy</span>
            </div>
            <div class="metric">
              <span class="label">Volatility</span>
              <span class="value">Medium-High</span>
            </div>
            <div class="metric">
              <span class="label">Recommendation</span>
              <span class="value recommendation">Growth Position</span>
            </div>
          </div>
          <p class="analysis">Sustainability-focused investments may offer strong growth as the world transitions to clean energy. Good for young investors who want to align investments with environmental values.</p>
        </div>
      `;
    },
    generateGrowthInfo(symbol) {
      return `
        <div class="info-card">
          <div class="info-header">
            <h4>${symbol.name} (${symbol.ticker})</h4>
            <span class="${symbol.change >= 0 ? 'positive' : 'negative'}">${symbol.change >= 0 ? '+' : ''}${symbol.change}%</span>
          </div>
          <p>High-growth company with potential for significant appreciation.</p>
          <div class="info-metrics">
            <div class="metric">
              <span class="label">Type</span>
              <span class="value">Growth Stock</span>
            </div>
            <div class="metric">
              <span class="label">Volatility</span>
              <span class="value">High</span>
            </div>
            <div class="metric">
              <span class="label">Recommendation</span>
              <span class="value recommendation">Opportunistic Buy</span>
            </div>
          </div>
          <p class="analysis">Growth stocks can offer substantial returns but come with higher volatility. Investors in their 20s can afford to take these risks with a portion of their portfolio given their long time horizon.</p>
        </div>
      `;
    },
    formatVolume(volume) {
      if (volume === 0) return 'N/A';
      return volume.toLocaleString();
    },
    getRSIClass(value) {
      if (value < 30) return 'negative'; // Bearish
      if (value > 70) return 'positive'; // Bullish
      return ''; // Neutral
    },
    getRSISignal(value) {
      if (value < 30) return 'Sell Signal';
      if (value > 70) return 'Buy Signal';
      return 'Neutral';
    },
    refreshData() {
      this.updateCharts(); // Re-render charts with current symbol
      this.updateRelevantData(); // Update asset overview and technical analysis
      this.fetchMarketData(); // Fetch new data
    },
    fetchMarketData() {
      // Simulate fetching data from an API
      const symbolData = this.symbols.find(s => s.ticker === this.currentSymbol);
      if (symbolData) {
        this.currentPrice = symbolData.price || 0; // Assuming price is part of the symbol data
        this.currentChange = symbolData.change || 0;
        this.currentVolume = symbolData.volume || 0;
        this.rsiValue = symbolData.rsi || 0;
        this.macdSignal = symbolData.macdSignal || '';
        this.supportLevel = symbolData.supportLevel || 0;
        this.resistanceLevel = symbolData.resistanceLevel || 0;
        this.sentimentScore = symbolData.sentimentScore || 0;
        this.sentimentDescription = symbolData.sentimentDescription || '';
        this.riskLevel = symbolData.riskLevel || 0;
        this.riskLabel = symbolData.riskLabel || '';
        this.timeHorizon = symbolData.timeHorizon || '';
        this.allocationSuggestion = symbolData.allocationSuggestion || '';
      }
    },
    addToWatchlist() {
      alert(`Added ${this.currentSymbol} to watchlist!`);
      // In a real app, you'd add it to a Vuex store or local storage
    },
    fullscreenChart(containerId) {
      const chartElement = document.getElementById(containerId);
      if (chartElement) {
        chartElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (This browser might not support full-screen mode.)`);
        });
      }
    },
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
/* Base styles */
#charts {
  background-color: #0D0D0D;
  color: #EAEAEA;
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  box-sizing: border-box;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

/* Header & Controls */
.charts-header {
  background: linear-gradient(to right, #1A1E26, #22252F);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1rem;
  color: #AAA;
  margin-top: 0.5rem;
}

.market-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #71D9B3;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 10px;
  height: 10px;
  background-color: #71D9B3;
  border-radius: 50%;
}

.last-updated {
  color: #AAA;
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.category-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #EAEAEA;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(135deg, rgba(113, 217, 179, 0.2), rgba(77, 32, 140, 0.2));
  border: 1px solid #71D9B3;
  color: #71D9B3;
  box-shadow: 0 0 15px rgba(113, 217, 179, 0.3);
}

.symbol-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.symbol-select {
  background-color: #22252F;
  color: #EAEAEA;
  border: 1px solid #3A3F4D;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
  max-width: 250px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.symbol-select:hover, .symbol-select:focus {
  border-color: #71D9B3;
  box-shadow: 0 0 0 2px rgba(113, 217, 179, 0.2);
}

.watchlist-btn {
  background-color: #71D9B3;
  color: #1E222D;
  border: none;
  padding: 0.75rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.watchlist-btn:hover {
  background-color: #5ABF9A;
  transform: translateY(-2px);
}

/* Charts Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

.charts-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.charts-header-section {
  background: linear-gradient(to right, #22252F, #292C36);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid #2C303A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.charts-header-section h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #71D9B3;
  font-weight: 600;
}

.quick-stats {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.8rem;
  color: #AAA;
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #71D9B3;
}

.stat-value.positive {
  color: #71D9B3;
}

.stat-value.negative {
  color: #F85050;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.chart-container {
  background-color: #1A1E26;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  height: 300px;
  border: 1px solid #2C303A;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chart-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.chart-header {
  background: linear-gradient(to right, #22252F, #292C36);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3A3F4D;
}

.chart-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.symbol {
  font-weight: 600;
  color: #71D9B3;
}

.timeframe {
  font-size: 0.9rem;
  color: #AAA;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #EAEAEA;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.action-btn i {
  font-size: 1rem;
}

.chart {
  flex: 1;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.widget {
  background-color: #1A1E26;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border: 1px solid #2C303A;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.widget-header h3 {
  margin: 0;
  color: #71D9B3;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.widget-header .refresh-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #EAEAEA;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.widget-header .refresh-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.overview-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #AAA;
}

.technical-analysis h3 {
  margin-bottom: 1rem;
}

.technical-indicators {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 0.75rem;
}

.indicator-name {
  font-size: 0.8rem;
  color: #AAA;
  margin-bottom: 0.3rem;
}

.indicator-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #71D9B3;
}

.indicator-value.negative {
  color: #F85050;
}

.indicator-signal {
  font-size: 0.8rem;
  color: #AAA;
  margin-top: 0.3rem;
}

.market-sentiment h3 {
  margin-bottom: 1rem;
}

.sentiment-meter {
  position: relative;
  height: 10px;
  background-color: #3A3F4D;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.sentiment-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(to right, #F85050, #71D9B3); /* Example gradient */
}

.sentiment-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #AAA;
  margin-top: 0.5rem;
}

.sentiment-description {
  font-size: 0.9rem;
  color: #AAA;
  margin-top: 0.5rem;
}

.trending-assets h3 {
  margin-bottom: 1rem;
}

.trending-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;
}

.trend-item:hover {
  background-color: rgba(113, 217, 179, 0.1);
}

.trend-info {
  display: flex;
  flex-direction: column;
}

.trend-symbol {
  font-weight: 600;
  color: #71D9B3;
}

.trend-name {
  font-size: 0.9rem;
  color: #AAA;
}

.trend-metrics {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.trend-change {
  font-size: 0.9rem;
  font-weight: 600;
}

.trend-change.positive {
  color: #71D9B3;
}

.trend-change.negative {
  color: #F85050;
}

.trend-volume {
  font-size: 0.8rem;
  color: #AAA;
}

.investment-insights h3 {
  margin-bottom: 1rem;
}

.insights-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.insight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 0.75rem;
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.insight-header i {
  font-size: 1rem;
  color: #71D9B3;
}

.risk-meter {
  position: relative;
  height: 10px;
  background-color: #3A3F4D;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.risk-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(to right, #F85050, #71D9B3); /* Example gradient */
}

.risk-label {
  font-size: 0.8rem;
  color: #AAA;
}

.time-horizon {
  font-size: 0.9rem;
  color: #AAA;
  margin-top: 0.5rem;
}

.allocation {
  font-size: 1.2rem;
  font-weight: 700;
  color: #71D9B3;
  margin-top: 0.5rem;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-header {
    padding: 1.2rem;
  }
  
  .charts-header h1 {
    font-size: 1.8rem;
  }

  .charts-header .subtitle {
    font-size: 0.9rem;
  }

  .market-status {
    font-size: 0.8rem;
  }

  .quick-stats {
    gap: 1rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .stat-value {
    font-size: 1.3rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 250px;
  }

  .chart-header {
    padding: 0.6rem 0.8rem;
  }

  .chart-info {
    gap: 0.5rem;
  }

  .symbol {
    font-size: 0.9rem;
  }

  .timeframe {
    font-size: 0.8rem;
  }

  .chart-actions {
    gap: 0.3rem;
  }

  .action-btn i {
    font-size: 0.9rem;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .widget {
    flex: 1;
    min-width: 300px;
  }

  .widget-header h3 {
    font-size: 1.1rem;
  }

  .overview-content {
    font-size: 0.85rem;
  }

  .technical-indicators {
    grid-template-columns: 1fr;
  }

  .indicator {
    padding: 0.6rem;
  }

  .indicator-name {
    font-size: 0.7rem;
  }

  .indicator-value {
    font-size: 1rem;
  }

  .indicator-signal {
    font-size: 0.7rem;
  }

  .market-sentiment h3 {
    font-size: 1.1rem;
  }

  .sentiment-meter {
    height: 8px;
  }

  .sentiment-labels {
    font-size: 0.6rem;
  }

  .sentiment-description {
    font-size: 0.8rem;
  }

  .trending-assets h3 {
    font-size: 1.1rem;
  }

  .trend-item {
    padding: 0.6rem;
  }

  .trend-info {
    gap: 0.3rem;
  }

  .trend-symbol {
    font-size: 0.9rem;
  }

  .trend-name {
    font-size: 0.8rem;
  }

  .trend-metrics {
    align-items: flex-end;
  }

  .trend-change {
    font-size: 0.8rem;
  }

  .trend-volume {
    font-size: 0.7rem;
  }

  .investment-insights h3 {
    font-size: 1.1rem;
  }

  .insights-content {
    grid-template-columns: 1fr;
  }

  .insight-item {
    padding: 0.6rem;
  }

  .insight-header {
    gap: 0.3rem;
  }

  .insight-header i {
    font-size: 0.9rem;
  }

  .risk-meter {
    height: 8px;
  }

  .risk-label {
    font-size: 0.7rem;
  }

  .time-horizon {
    font-size: 0.8rem;
  }

  .allocation {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  #charts {
    padding: 5rem 1rem 1rem;
  }
  
  .category-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .symbol-select {
    max-width: 100%;
  }

  .watchlist-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .overview-content {
    font-size: 0.8rem;
  }

  .technical-indicators {
    grid-template-columns: 1fr;
  }

  .indicator {
    padding: 0.6rem;
  }

  .indicator-name {
    font-size: 0.7rem;
  }

  .indicator-value {
    font-size: 1rem;
  }

  .indicator-signal {
    font-size: 0.7rem;
  }

  .market-sentiment h3 {
    font-size: 1.1rem;
  }

  .sentiment-meter {
    height: 8px;
  }

  .sentiment-labels {
    font-size: 0.6rem;
  }

  .sentiment-description {
    font-size: 0.8rem;
  }

  .trending-assets h3 {
    font-size: 1.1rem;
  }

  .trend-item {
    padding: 0.6rem;
  }

  .trend-info {
    gap: 0.3rem;
  }

  .trend-symbol {
    font-size: 0.9rem;
  }

  .trend-name {
    font-size: 0.8rem;
  }

  .trend-metrics {
    align-items: flex-end;
  }

  .trend-change {
    font-size: 0.8rem;
  }

  .trend-volume {
    font-size: 0.7rem;
  }

  .investment-insights h3 {
    font-size: 1.1rem;
  }

  .insights-content {
    grid-template-columns: 1fr;
  }

  .insight-item {
    padding: 0.6rem;
  }

  .insight-header {
    gap: 0.3rem;
  }

  .insight-header i {
    font-size: 0.9rem;
  }

  .risk-meter {
    height: 8px;
  }

  .risk-label {
    font-size: 0.7rem;
  }

  .time-horizon {
    font-size: 0.8rem;
  }

  .allocation {
    font-size: 1rem;
  }
}
</style>
