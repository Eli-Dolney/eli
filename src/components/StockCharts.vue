<template>
  <section id="charts">
    <!-- Top area / "header" for the charts page -->
    <div class="charts-header">
      <h1>Multi-Timeframe Charts</h1>
      <select v-model="currentSymbol" @change="updateCharts">
        <option 
          v-for="symbol in symbols"
          :value="symbol"
          :key="symbol"
        >
          {{ symbol }}
        </option>
      </select>
    </div>

    <!-- Main grid for the chart containers -->
    <div class="chart-grid">
      <div
        v-for="(chart, index) in charts"
        :key="index"
        class="chart-container"
      >
        <div class="chart-header">
          {{ currentSymbol }} - {{ chart.timeframeName }}
        </div>
        <div :id="chart.containerId" class="chart"></div>
      </div>

      <!-- Optional sidebar on the right (or below on mobile) -->
      <aside class="sidebar">
        <div class="widget">
          <h3>Relevant Instrument Data</h3>
          <div id="relevant-data" v-html="relevantData"></div>
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
      /* global TradingView */
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
        this.createTradingViewWidget(
          chart.containerId,
          this.currentSymbol,
          chart.timeframe,
          chart.timeframeName
        );
      });
      this.updateRelevantData();
    },
    updateRelevantData() {
      /* your switch cases for relevantData 
         e.g. this.relevantData = `some HTML string...`; */
      switch (this.currentSymbol) {
        case 'BTCUSD':
          this.relevantData = `...`;
          break;
        case 'ETHUSD':
          this.relevantData = `...`;
          break;
        // etc.
        default:
          this.relevantData = `No specific data available for ${this.currentSymbol}.`;
      }
    }
  }
};
</script>

<style scoped>
/* 
  1) #charts: Make the page fill the screen and 
     shift to the right if you have a 100px sidebar 
*/
#charts {
  background-color: #0D0D0D;
  color: #EAEAEA;
  min-height: 100vh;
  margin-left: 0;
  padding: 2rem;
  box-sizing: border-box;
  width: 100%;
}

/* For screens >=768px, shift right to leave room for a 100px sidebar */
@media (min-width: 768px) {
  #charts {
    margin-left: 100px;
    width: calc(100% - 100px);
  }
}

/* 2) A top “header” area for the page,
      matching your dark theme with a subtle box shadow 
*/
.charts-header {
  background-color: #1A1E26;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.charts-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #db2ef2; /* Accent color used on other pages */
}
.charts-header select {
  background-color: #0D0D0D;
  color: #EAEAEA;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

/* 3) Main grid for charts + sidebar 
   - auto-fit or auto-fill can be used if you want more responsive columns
*/
.chart-grid {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 3 columns of charts, 1 column for sidebar */
  gap: 2rem;
}

/* Each chart container */
.chart-container {
  background-color: #1A1E26;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  /* This helps the TradingView chart fill the container height properly */
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

/* Title area for each chart */
.chart-header {
  background-color: #2B2B2B;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #EAEAEA;
  border-bottom: 1px solid #3c3c3c;
}

/* The chart itself */
.chart {
  flex: 1; /* Fill remaining space within .chart-container */
}

/* Sidebar for “Relevant Instrument Data” */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.widget {
  background-color: #1A1E26;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1rem;
}

/* 4) Responsive Tweaks 
   - On smaller screens, stack charts and sidebar 
*/
@media (max-width: 992px) {
  .chart-grid {
    grid-template-columns: 1fr; /* single column */
  }
}

/* 5) Additional styling for data in the sidebar, if needed */
#relevant-data {
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-line; /* keep line breaks if you have them */
}
</style>
