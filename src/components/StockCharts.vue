<template>
    <div>
      <header class="header">
        <h1>Multi-Timeframe Charts </h1>
        <select v-model="currentSymbol" @change="updateCharts">
          <option v-for="symbol in symbols" :value="symbol" :key="symbol">{{ symbol }}</option>
        </select>
      </header>
      <div class="chart-grid">
        <div v-for="(chart, index) in charts" :key="index" class="chart-container">
          <div class="chart-header">{{ currentSymbol }} - {{ chart.timeframeName }}</div>
          <div :id="chart.containerId" class="chart"></div>
        </div>
      </div>
      <aside class="sidebar">
        <div class="widget">
          <h3>Relevant Instrument Data</h3>
          <div id="relevant-data">{{ relevantData }}</div>
        </div>
      </aside>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSymbol: 'BTCUSD',
        symbols: [
          'BTCUSD', 'ETHUSD', 'XRPUSD', 'ADAUSD', 'DOTUSD', 
          'EURUSD', 'GBPUSD', 'USDJPY', 'USDCAD', 'AUDUSD', 
          'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 
          'NVDA', 'NFLX'
        ],
        charts: [
          { containerId: 'chart1', timeframe: '1', timeframeName: '1 Minute' },
          { containerId: 'chart2', timeframe: '15', timeframeName: '15 Minutes' },
          { containerId: 'chart3', timeframe: '60', timeframeName: '1 Hour' },
          { containerId: 'chart4', timeframe: '240', timeframeName: '4 Hours' },
          { containerId: 'chart5', timeframe: 'D', timeframeName: '1 Day' },
          { containerId: 'chart6', timeframe: 'W', timeframeName: '1 Week' }
        ],
        relevantData: ''
      };
    },
    mounted() {
      this.loadCharts();
    },
    methods: {
      loadCharts() {
        this.charts.forEach(chart => {
          this.createTradingViewWidget(chart.containerId, this.currentSymbol, chart.timeframe, chart.timeframeName);
        });
        this.updateRelevantData();
      },
      createTradingViewWidget(containerId, symbol, interval, timeframeName) {
        new TradingView.widget({
          width: '100%',
          height: '100%',
          symbol: symbol,
          interval: interval,
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerId,
          studies: ['RSI@tv-basicstudies'],
          studies_overrides: {
            'rsi.rsi.color': '#2962FF',
            'rsi.rsi.linewidth': 2
          },
          overrides: {
            'paneProperties.background': '#ffffff',
            'paneProperties.vertGridProperties.color': '#e6e6e6',
            'paneProperties.horzGridProperties.color': '#e6e6e6',
            'symbolWatermarkProperties.transparency': 90,
            'scalesProperties.textColor': '#333',
            'mainSeriesProperties.candleStyle.upColor': '#26a69a',
            'mainSeriesProperties.candleStyle.downColor': '#ef5350',
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': true,
            'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350',
            'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
            'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350'
          }
        });
      },
      updateCharts() {
        this.charts.forEach(chart => {
          this.createTradingViewWidget(chart.containerId, this.currentSymbol, chart.timeframe, chart.timeframeName);
        });
        this.updateRelevantData();
      },
      updateRelevantData() {
        switch (this.currentSymbol) {
          case 'BTCUSD':
            this.relevantData = `
              ETH/USD: $3,450 (+2.1%)<br>
              Total Crypto Market Cap: $2.1T<br>
              BTC Dominance: 42.5%<br>
              Fear & Greed Index: 65 (Greed)<br>
              24h Volume: $45.2B<br>
              Open Interest: $22.1B<br>
              Hash Rate: 180 EH/s<br>
              Active Addresses: 1.2M<br>
              Mempool Size: 15,000 transactions<br>
              Lightning Network Capacity: 3,500 BTC
            `;
            break;
          case 'ETHUSD':
            this.relevantData = `
              BTC/USD: $55,230 (-1.2%)<br>
              Gas Price (Gwei): 45<br>
              ETH Staked: 12.5M<br>
              DeFi TVL: $85.2B<br>
              24h Volume: $28.7B<br>
              ETH/BTC Ratio: 0.0624<br>
              Active Addresses: 650,000<br>
              Daily Transactions: 1.2M<br>
              Total Value Locked in ETH 2.0: $30.5B<br>
              ETH Burned (24h): 12,500 ETH
            `;
            break;
          case 'EURUSD':
            this.relevantData = `
              USD Index: 91.25 (-0.3%)<br>
              EUR/GBP: 0.8650 (+0.1%)<br>
              EUR/JPY: 130.45 (+0.2%)<br>
              German 10Y Yield: -0.25%<br>
              US 10Y Yield: 1.65%<br>
              ECB Deposit Rate: -0.50%<br>
              EU Inflation Rate: 1.9%<br>
              EU Unemployment Rate: 7.9%<br>
              EU GDP Growth Rate: 2.0%<br>
              EU Manufacturing PMI: 62.5
            `;
            break;
          case 'AAPL':
            this.relevantData = `
              NASDAQ: 14,020.30 (+0.7%)<br>
              S&P 500: 4,185.25 (+0.5%)<br>
              VIX: 16.25 (-3.2%)<br>
              P/E Ratio: 28.5<br>
              Dividend Yield: 0.67%<br>
              Market Cap: $2.25T<br>
              52 Week High: $145.09<br>
              52 Week Low: $74.72<br>
              Revenue Growth (YoY): 21.4%<br>
              iPhone Market Share: 23.4%
            `;
            break;
          case 'GOOGL':
            this.relevantData = `
              NASDAQ: 14,020.30 (+0.7%)<br>
              S&P 500: 4,185.25 (+0.5%)<br>
              VIX: 16.25 (-3.2%)<br>
              P/E Ratio: 35.2<br>
              Revenue Growth (YoY): 23.5%<br>
              Market Cap: $1.65T<br>
              Search Market Share: 92.5%<br>
              YouTube Ad Revenue: $6.9B<br>
              Cloud Revenue Growth: 46%<br>
              AI Patent Filings (2020): 2,589
            `;
            break;
          case 'TSLA':
            this.relevantData = `
              NASDAQ: 14,020.30 (+0.7%)<br>
              S&P 500: 4,185.25 (+0.5%)<br>
              VIX: 16.25 (-3.2%)<br>
              P/E Ratio: 1,150<br>
              EV Sector Performance: +2.8%<br>
              Market Cap: $685B<br>
              Quarterly Deliveries: 184,800<br>
              Production Capacity: 1.05M/year<br>
              Energy Storage Deployments: 3,022 MWh<br>
              Supercharger Stations: 2,710
            `;
            break;
          default:
            this.relevantData = `No specific data available for ${this.currentSymbol}. Please select another instrument.`;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #2962ff;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    padding: 10px;
  }
  .chart-container {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
  }
  .chart-header {
    background-color: #f1f3f6;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
  }
  .sidebar {
    grid-column: 4 / span 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }
  .widget {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
  </style>
  