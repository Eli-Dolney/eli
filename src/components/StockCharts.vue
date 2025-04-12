<template>
  <section id="charts">
    <!-- Top area / "header" for the charts page -->
    <div class="charts-header">
      <h1>Multi-Timeframe Charts</h1>
      <div class="filter-controls">
        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-btn', currentCategory === category.id ? 'active' : '']"
            @click="setCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        <select v-model="currentSymbol" @change="updateCharts" class="symbol-select">
          <option 
            v-for="symbol in filteredSymbols"
            :value="symbol.ticker"
            :key="symbol.ticker"
          >
            {{ symbol.ticker }} - {{ symbol.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Main grid for the chart containers -->
    <div class="chart-grid">
      <div class="charts-area">
        <div
          v-for="(chart, index) in charts"
          :key="index"
          class="chart-container"
        >
          <div class="chart-header">
            <span class="symbol">{{ currentSymbol }}</span>
            <span class="timeframe">{{ chart.timeframeName }}</span>
          </div>
          <div :id="chart.containerId" class="chart"></div>
        </div>
      </div>

      <!-- Enhanced sidebar with more information -->
      <aside class="sidebar">
        <div class="widget asset-info">
          <h3>Asset Overview</h3>
          <div id="relevant-data" v-html="relevantData"></div>
        </div>
        
        <div class="widget watchlist">
          <h3>Trending in {{ categories.find(c => c.id === currentCategory).name }}</h3>
          <ul class="trending-list">
            <li v-for="(trend, index) in trendingInCategory" :key="index" @click="setSymbol(trend.ticker)">
              <div class="trend-item">
                <span class="trend-symbol">{{ trend.ticker }}</span>
                <span :class="['trend-change', trend.change >= 0 ? 'positive' : 'negative']">
                  {{ trend.change >= 0 ? '+' : '' }}{{ trend.change }}%
                </span>
              </div>
            </li>
          </ul>
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
        { id: 'tech', name: 'Technology' },
        { id: 'growth', name: 'Growth Stocks' },
        { id: 'crypto', name: 'Crypto' },
        { id: 'etf', name: 'ETFs' },
        { id: 'sustainability', name: 'Sustainability' }
      ],
      symbols: [
        // Technology
        { ticker: 'AAPL', name: 'Apple Inc.', category: 'tech', change: 0.98 },
        { ticker: 'MSFT', name: 'Microsoft', category: 'tech', change: 1.45 },
        { ticker: 'GOOGL', name: 'Alphabet', category: 'tech', change: 0.75 },
        { ticker: 'AMZN', name: 'Amazon', category: 'tech', change: -0.52 },
        { ticker: 'META', name: 'Meta Platforms', category: 'tech', change: 2.14 },
        { ticker: 'NVDA', name: 'NVIDIA', category: 'tech', change: 3.25 },
        { ticker: 'AMD', name: 'Advanced Micro Devices', category: 'tech', change: 1.78 },
        { ticker: 'TSLA', name: 'Tesla Inc', category: 'tech', change: -1.23 },
        { ticker: 'UBER', name: 'Uber Technologies', category: 'tech', change: 0.85 },
        { ticker: 'PYPL', name: 'PayPal Holdings', category: 'tech', change: -0.42 },
        
        // Growth Stocks
        { ticker: 'SHOP', name: 'Shopify', category: 'growth', change: 1.15 },
        { ticker: 'CRWD', name: 'CrowdStrike', category: 'growth', change: 2.38 },
        { ticker: 'SNOW', name: 'Snowflake', category: 'growth', change: 0.94 },
        { ticker: 'RBLX', name: 'Roblox', category: 'growth', change: -0.67 },
        { ticker: 'ABNB', name: 'Airbnb', category: 'growth', change: 1.28 },
        { ticker: 'PINS', name: 'Pinterest', category: 'growth', change: 3.45 },
        { ticker: 'PLTR', name: 'Palantir', category: 'growth', change: 0.89 },
        { ticker: 'NET', name: 'Cloudflare', category: 'growth', change: 2.01 },
        { ticker: 'DASH', name: 'DoorDash', category: 'growth', change: -0.34 },
        { ticker: 'DKNG', name: 'DraftKings', category: 'growth', change: 1.56 },
        
        // Crypto
        { ticker: 'BTCUSD', name: 'Bitcoin', category: 'crypto', change: 2.75 },
        { ticker: 'ETHUSD', name: 'Ethereum', category: 'crypto', change: 1.95 },
        { ticker: 'SOLUSD', name: 'Solana', category: 'crypto', change: 4.32 },
        { ticker: 'DOTUSD', name: 'Polkadot', category: 'crypto', change: -1.05 },
        { ticker: 'AVAXUSD', name: 'Avalanche', category: 'crypto', change: 3.21 },
        { ticker: 'COIN', name: 'Coinbase Global', category: 'crypto', change: 2.15 },
        { ticker: 'MARA', name: 'Marathon Digital', category: 'crypto', change: 3.85 },
        { ticker: 'RIOT', name: 'Riot Platforms', category: 'crypto', change: 2.67 },
        
        // ETFs
        { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', category: 'etf', change: 0.53 },
        { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', category: 'etf', change: 0.48 },
        { ticker: 'QQQ', name: 'Invesco QQQ Trust', category: 'etf', change: 1.12 },
        { ticker: 'ARKK', name: 'ARK Innovation ETF', category: 'etf', change: -0.75 },
        { ticker: 'VUG', name: 'Vanguard Growth ETF', category: 'etf', change: 0.62 },
        { ticker: 'SCHD', name: 'Schwab US Dividend Equity ETF', category: 'etf', change: 0.35 },
        { ticker: 'JEPI', name: 'JPMorgan Equity Premium Income ETF', category: 'etf', change: 0.28 },
        
        // Sustainability
        { ticker: 'ENPH', name: 'Enphase Energy', category: 'sustainability', change: -0.83 },
        { ticker: 'SEDG', name: 'SolarEdge', category: 'sustainability', change: -1.21 },
        { ticker: 'FSLR', name: 'First Solar', category: 'sustainability', change: 1.37 },
        { ticker: 'NEE', name: 'NextEra Energy', category: 'sustainability', change: 0.52 },
        { ticker: 'ICLN', name: 'iShares Global Clean Energy ETF', category: 'sustainability', change: 0.64 },
        { ticker: 'STEM', name: 'Stem Inc', category: 'sustainability', change: -0.92 },
        { ticker: 'CHPT', name: 'ChargePoint Holdings', category: 'sustainability', change: 1.15 }
      ],
      charts: [
        { containerId: 'chart1', timeframe: '15', timeframeName: '15 Minutes' },
        { containerId: 'chart2', timeframe: '60', timeframeName: '1 Hour' },
        { containerId: 'chart3', timeframe: '240', timeframeName: '4 Hours' },
        { containerId: 'chart4', timeframe: 'D', timeframeName: '1 Day' },
        { containerId: 'chart5', timeframe: 'W', timeframeName: '1 Week' },
        { containerId: 'chart6', timeframe: 'M', timeframeName: '1 Month' }
      ],
      relevantData: ''
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
    });
  },
  methods: {
    loadTradingViewScript() {
      return new Promise((resolve) => {
        // Check if script is already loaded
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
        this.relevantData = `<p>No data available for ${this.currentSymbol}.</p>`;
        return;
      }
      
      // Generate relevant content based on category
      if (symbol.category === 'tech') {
        this.relevantData = this.generateTechInfo(symbol);
      } else if (symbol.category === 'crypto') {
        this.relevantData = this.generateCryptoInfo(symbol);
      } else if (symbol.category === 'etf') {
        this.relevantData = this.generateETFInfo(symbol);
      } else if (symbol.category === 'sustainability') {
        this.relevantData = this.generateSustainabilityInfo(symbol);
      } else {
        this.relevantData = this.generateGrowthInfo(symbol);
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

.charts-header h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #71D9B3, #4D208C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

.symbol-select {
  background-color: #22252F;
  color: #EAEAEA;
  border: 1px solid #3A3F4D;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.symbol-select:hover, .symbol-select:focus {
  border-color: #71D9B3;
  box-shadow: 0 0 0 2px rgba(113, 217, 179, 0.2);
}

/* Charts Grid Layout */
.chart-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

.charts-area {
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

.symbol {
  font-weight: 600;
  color: #71D9B3;
}

.timeframe {
  font-size: 0.9rem;
  color: #AAA;
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

.widget h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #71D9B3;
  font-size: 1.3rem;
  font-weight: 600;
}

/* Trending List */
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

.trend-symbol {
  font-weight: 600;
}

.positive {
  color: #71D9B3;
}

.negative {
  color: #F85050;
}

/* Info Card */
.info-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.info-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.metric {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
}

.metric .label {
  font-size: 0.8rem;
  color: #AAA;
  margin-bottom: 0.3rem;
}

.metric .value {
  font-weight: 600;
}

.recommendation {
  color: #71D9B3;
}

.analysis {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .charts-area {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .chart-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-header {
    padding: 1.2rem;
  }
  
  .charts-header h1 {
    font-size: 1.8rem;
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
  
  .info-metrics {
    grid-template-columns: 1fr;
  }
}
</style>