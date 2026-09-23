/**
 * AGRISENSE - Weather Signals & Price Impact Telemetry Component
 * Connects IMD radar observations to field transport disruptions and mandi arrival shocks
 */

class WeatherSignalsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="weather-signals-wrapper">
        <div class="weather-intro-bar">
          <div>
            <span class="badge badge-cyan"><span class="pulse-dot"></span> IMD RADAR TELEMETRY</span>
            <h3 class="card-title">Weather Signals & Supply Disruption Chain</h3>
            <p class="card-subtitle">Real-time precipitation radar, temperature anomalies, and their causal propagation into wholesale mandi rates.</p>
          </div>
          <div class="weather-notice-tag">
            <span class="pulse-dot"></span> Simulated Telemetry Feed (Calibrated on IMD Radar)
          </div>
        </div>

        <!-- 4 Weather Metric Cards -->
        <div class="weather-telemetry-grid">
          <div class="weather-metric-card glass-card">
            <span class="icon">🌡️</span>
            <div>
              <span class="w-lbl">Surface Temperature</span>
              <div class="w-val">29.4°C <span class="delta text-emerald">(+1.2°C vs norm)</span></div>
              <span class="w-hint">Optimal photosynthesis; low heat stress</span>
            </div>
          </div>

          <div class="weather-metric-card glass-card">
            <span class="icon">🌧️</span>
            <div>
              <span class="w-lbl">Precipitation Radar</span>
              <div class="w-val text-cyan">42 mm / 24h</div>
              <span class="w-hint">Pre-monsoon showers in Kolar-Chittoor belt</span>
            </div>
          </div>

          <div class="weather-metric-card glass-card">
            <span class="icon">💧</span>
            <div>
              <span class="w-lbl">Relative Humidity</span>
              <div class="w-val">78% <span class="delta text-amber">(High Dampness)</span></div>
              <span class="w-hint">Watch for fungal blight & thrips in vegetables</span>
            </div>
          </div>

          <div class="weather-metric-card glass-card">
            <span class="icon">💨</span>
            <div>
              <span class="w-lbl">Wind & Logistics Index</span>
              <div class="w-val text-emerald">14 km/h (Stable)</div>
              <span class="w-hint">Freight corridors clear; no major cyclone risk</span>
            </div>
          </div>
        </div>

        <!-- Causal Supply Chain Flow Card -->
        <div class="weather-chain-card glass-card">
          <div class="chain-header">
            <span class="badge badge-purple">CAUSAL ATTRIBUTION MODEL</span>
            <h4 class="chain-title">How Weather Signals Translate Into The Tomato & Chilli Price Surge</h4>
          </div>

          <div class="chain-nodes-flow">
            <div class="chain-node">
              <div class="node-icon-box">🌧️</div>
              <span class="node-step">1. SATELLITE RADAR</span>
              <strong>Heavy Rainfall in Kolar Belt</strong>
              <p>42mm rain recorded across picking fields; waterlogging prevents morning harvest crates from being loaded.</p>
            </div>

            <div class="chain-arrow">➔</div>

            <div class="chain-node">
              <div class="node-icon-box">🚚</div>
              <span class="node-step">2. LOGISTICS BOTTLENECK</span>
              <strong>Transport Disruption Risk</strong>
              <p>Feeder farm roads delayed by mud; inter-district truck departures to Chennai and Bengaluru delayed by 6–8 hours.</p>
            </div>

            <div class="chain-arrow">➔</div>

            <div class="chain-node">
              <div class="node-icon-box">📦</div>
              <span class="node-step">3. MANDI INFLOW SHOCK</span>
              <strong>Arrivals Fall by 18%</strong>
              <p>Koyambedu and Yeshwanthpur receive only 1,160 crates instead of expected 1,420 crates for morning auction.</p>
            </div>

            <div class="chain-arrow">➔</div>

            <div class="chain-node chain-result-node">
              <div class="node-icon-box">📈</div>
              <span class="node-step">4. PRICE OUTCOME</span>
              <strong class="text-emerald">Price Climbs +11.4%</strong>
              <p>Wholesale commission bidding moves from ₹35/kg to ₹39/kg. AI forecast incorporates this pressure into the 7-day model.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

if (typeof window !== "undefined") {
  window.WeatherSignalsComponent = WeatherSignalsComponent;
}
