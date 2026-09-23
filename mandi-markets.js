/**
 * AGRISENSE - Mandi Markets Browser & Comparison Component
 * Provides comprehensive market details for 12+ APMC mandis, arrival volumes, weather, and comparison
 */

class MandiMarketsComponent {
  constructor(browserContainerId, detailContainerId) {
    this.browserContainer = document.getElementById(browserContainerId);
    this.detailContainer = document.getElementById(detailContainerId);
    this.selectedMandiId = "koyambedu";
    this.activeFilterState = "all";
    this.compareMandiIds = ["koyambedu", "kolar"];
  }

  init() {
    this.render();
  }

  render() {
    if (this.browserContainer) {
      this.renderBrowser();
    }
    if (this.detailContainer) {
      this.renderDetail(this.selectedMandiId);
    }
  }

  renderBrowser() {
    const mandis = this.activeFilterState === "all" 
      ? CFP_DATA.mandis 
      : CFP_DATA.mandis.filter(m => m.stateCode.toLowerCase() === this.activeFilterState.toLowerCase());

    this.browserContainer.innerHTML = `
      <div class="mandi-markets-wrapper">
        <div class="mandi-browser-header">
          <div>
            <span class="badge badge-emerald"><span class="pulse-dot"></span> 500+ MANDIS AGGREGATED</span>
            <h3 class="card-title">Mandi Markets Intelligence Browser</h3>
            <p class="card-subtitle">Real-time modal rates, arrival volumes, and 7–30 day projections across key APMC assembly & consumption terminals.</p>
          </div>
          <div class="mandi-filter-bar">
            <span class="filter-lbl">Filter by State:</span>
            <select id="mandiStateFilter" class="form-control form-control-sm" style="width: auto;">
              <option value="all">All States (Pan-India)</option>
              <option value="TN">Tamil Nadu</option>
              <option value="KA">Karnataka</option>
              <option value="MH">Maharashtra</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="DL">Delhi NCR</option>
              <option value="TG">Telangana</option>
            </select>
          </div>
        </div>

        <div class="mandi-browser-grid">
          ${mandis.map(m => {
            const isSelected = m.id === this.selectedMandiId;
            return `
              <div class="mandi-overview-card glass-card ${isSelected ? 'mandi-card-active' : ''}" onclick="CFP_APP.mandiComponent.selectMandi('${m.id}')">
                <div class="mandi-card-top">
                  <div>
                    <span class="mandi-state-tag">${m.stateCode}</span>
                    <h4 class="mandi-name">${m.name}</h4>
                    <span class="mandi-location">📍 ${m.city}, ${m.state}</span>
                  </div>
                  <span class="badge ${m.status.includes('Active') ? 'badge-emerald' : 'badge-cyan'}">${m.status}</span>
                </div>

                <div class="mandi-kpi-strip">
                  <div class="mandi-kpi-item">
                    <span class="label">Daily Arrivals</span>
                    <span class="val text-cyan">${m.dailyVolume}</span>
                  </div>
                  <div class="mandi-kpi-item">
                    <span class="label">Tomato Modal</span>
                    <span class="val text-emerald">₹${m.modalPrices.tomato || 35}/kg</span>
                  </div>
                  <div class="mandi-kpi-item">
                    <span class="label">Weather</span>
                    <span class="val">${m.weather.temp}</span>
                  </div>
                </div>

                <div class="mandi-commodities-row">
                  <span class="sub-label">Top Commodities:</span>
                  <div class="tag-chips-wrap">
                    ${m.topCommodities.map(c => `<span class="commodity-mini-chip">${c}</span>`).join('')}
                  </div>
                </div>

                <div class="mandi-card-footer">
                  <span class="hours-tag">⏰ ${m.operatingHours}</span>
                  <button class="btn btn-outline-cyan btn-xs" onclick="event.stopPropagation(); CFP_APP.mandiComponent.selectMandi('${m.id}'); CFP_APP.switchTab('mandi-markets');">
                    View Mandi Detail →
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Filter event
    const filter = document.getElementById("mandiStateFilter");
    if (filter) {
      filter.value = this.activeFilterState;
      filter.addEventListener("change", (e) => {
        this.activeFilterState = e.target.value;
        this.renderBrowser();
      });
    }
  }

  selectMandi(mandiId) {
    this.selectedMandiId = mandiId;
    this.render();
    
    // Scroll to detail smoothly
    const detailEl = document.getElementById("mandiDetailContainer");
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  renderDetail(mandiId) {
    const mandi = CFP_DATA.mandis.find(m => m.id === mandiId) || CFP_DATA.mandis[0];
    if (!this.detailContainer) return;

    this.detailContainer.innerHTML = `
      <div class="mandi-detail-view glass-card">
        <div class="detail-header-banner">
          <div>
            <div class="mandi-meta-tags">
              <span class="badge badge-emerald"><span class="pulse-dot"></span> APMC ACCREDITED</span>
              <span class="badge badge-cyan">Regulated Trading Floor</span>
              <span class="badge badge-purple">${mandi.stateCode} Mandi Network</span>
            </div>
            <h2 class="detail-mandi-title">${mandi.name}</h2>
            <p class="detail-mandi-sub">📍 ${mandi.city}, ${mandi.state} • Total Registered Commission Agents: <strong>${mandi.totalTraders}</strong></p>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary btn-sm" onclick="CFP_APP.loadForecastFor('tomato', '${mandi.id}')">
              📈 Forecast in ${mandi.city}
            </button>
          </div>
        </div>

        <div class="detail-metrics-grid">
          <div class="metric-card glass-card">
            <span class="metric-lbl">DAILY INFLOW VOLUME</span>
            <span class="metric-num text-cyan">${mandi.dailyVolume}</span>
            <span class="metric-hint">Average weekday traded volume</span>
          </div>
          <div class="metric-card glass-card">
            <span class="metric-lbl">OPERATING WINDOW</span>
            <span class="metric-num" style="font-size: 1.15rem;">${mandi.operatingHours}</span>
            <span class="metric-hint">Morning auction bells</span>
          </div>
          <div class="metric-card glass-card">
            <span class="metric-lbl">WEATHER CONDITIONS</span>
            <span class="metric-num text-emerald">${mandi.weather.temp}</span>
            <span class="metric-hint">${mandi.weather.condition} • Rain: ${mandi.weather.rainChance}</span>
          </div>
          <div class="metric-card glass-card">
            <span class="metric-lbl">KEY INBOUND SOURCE BELTS</span>
            <div class="sources-list">${mandi.primarySources.join(', ')}</div>
            <span class="metric-hint">Farm-gate supply origin</span>
          </div>
        </div>

        <div class="detail-content-columns">
          <!-- Left: Modal Prices & Projections Table -->
          <div class="detail-prices-block glass-card">
            <h4 class="section-heading">Today's Modal Prices & 7–30D Forecast in ${mandi.city}</h4>
            <div class="table-responsive">
              <table class="table-clean">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Current Modal</th>
                    <th>7-Day Forecast</th>
                    <th>30-Day Outlook</th>
                    <th>Trajectory</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.keys(mandi.modalPrices).map(cropKey => {
                    const cropObj = CFP_DATA.crops.find(c => c.id === cropKey) || { name: cropKey, icon: '🌱' };
                    const current = mandi.modalPrices[cropKey];
                    const fc7 = mandi.forecast7d && mandi.forecast7d[cropKey] ? mandi.forecast7d[cropKey] : (current + 3);
                    const fc30 = mandi.forecast30d && mandi.forecast30d[cropKey] ? mandi.forecast30d[cropKey] : (current + 6);
                    const isUp = fc7 >= current;

                    return `
                      <tr>
                        <td><strong>${cropObj.icon} ${cropObj.name}</strong></td>
                        <td>₹${current}/kg</td>
                        <td class="${isUp ? 'text-emerald' : 'text-amber'}"><strong>₹${fc7}/kg</strong></td>
                        <td class="text-cyan">₹${fc30}/kg</td>
                        <td>
                          <span class="badge ${isUp ? 'badge-rise' : 'badge-drop'}">
                            ${isUp ? '↑ Rising' : '↓ Soft'}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right: Nearby Mandis Arbitrage Check -->
          <div class="detail-nearby-block glass-card">
            <h4 class="section-heading">Nearby Mandis Price Spread Check</h4>
            <p class="card-subtitle" style="margin-bottom: 1rem;">Compare freight distances and price differentials to avoid selling in the wrong yard:</p>
            
            <div class="nearby-list">
              ${mandi.nearbyMandis.map(nm => `
                <div class="nearby-item">
                  <div class="nearby-info">
                    <strong>${nm.name}</strong>
                    <span class="text-xs text-muted">Distance: ${nm.distance}</span>
                  </div>
                  <div class="nearby-spread">
                    <span class="badge ${nm.spreadVsKoyambedu.startsWith('+') ? 'badge-emerald' : 'badge-amber'}">
                      ${nm.spreadVsKoyambedu} spread
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="mandi-narrative-box">
              <span class="icon">🏛️</span>
              <p>${mandi.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

if (typeof window !== "undefined") {
  window.MandiMarketsComponent = MandiMarketsComponent;
}
