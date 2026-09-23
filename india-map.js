/**
 * CROP PRICE FORECASTER - India Market Interactive Map & State Comparison Module
 */

class IndiaMarketComponent {
  constructor(containerId, detailContainerId, comparisonContainerId) {
    this.container = document.getElementById(containerId);
    this.detailContainer = document.getElementById(detailContainerId);
    this.comparisonContainer = document.getElementById(comparisonContainerId);
    this.selectedStateId = "tamil_nadu";
    this.comparisonStateIds = ["tamil_nadu", "karnataka", "maharashtra", "andhra_pradesh"];
    this.activeCropFilter = "tomato";
  }

  init() {
    this.renderMap();
    this.renderStateDetail(this.selectedStateId);
    this.renderComparisonMatrix();
    this.bindEvents();
  }

  bindEvents() {
    // Crop filter pills for India market view
    const filterPills = document.querySelectorAll(".market-crop-pill");
    filterPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeCropFilter = pill.getAttribute("data-crop");
        this.renderMap();
        this.renderStateDetail(this.selectedStateId);
        this.renderComparisonMatrix();
      });
    });
  }

  selectState(stateId) {
    this.selectedStateId = stateId;
    // Update SVG active state
    const paths = this.container.querySelectorAll(".state-region");
    paths.forEach(p => {
      if (p.getAttribute("data-state-id") === stateId) {
        p.classList.add("active-state");
      } else {
        p.classList.remove("active-state");
      }
    });

    this.renderStateDetail(stateId);
  }

  renderMap() {
    // Stylized high-tech geometric map layout for India's major agricultural states
    const states = CFP_DATA.states.filter(s => s.id !== "all_india");
    
    // We create a clean, responsive futuristic SVG with geometric paths representing key regions
    const svgHTML = `
      <div class="map-wrapper">
        <div class="map-overlay-header">
          <div class="map-badge"><span class="pulse-dot"></span> LIVE APMC SATELLITE TELEMETRY</div>
          <div class="map-crop-tag">Showing: <strong class="text-emerald">${this.activeCropFilter.toUpperCase()}</strong></div>
        </div>
        
        <svg viewBox="0 0 540 620" class="futuristic-india-svg" id="indiaSvg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="stateGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#059669" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#047857" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="stateGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#0369a1" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="stateGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="stateGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#d97706" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#b45309" stop-opacity="0.5"/>
            </linearGradient>
          </defs>

          <!-- Background Tech Grid -->
          <g class="tech-grid" opacity="0.15">
            <line x1="50" y1="50" x2="490" y2="50" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="50" y1="150" x2="490" y2="150" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="50" y1="250" x2="490" y2="250" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="50" y1="350" x2="490" y2="350" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="50" y1="450" x2="490" y2="450" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="50" y1="550" x2="490" y2="550" stroke="#38bdf8" stroke-dasharray="4,4"/>
            
            <line x1="100" y1="40" x2="100" y2="580" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="200" y1="40" x2="200" y2="580" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="300" y1="40" x2="300" y2="580" stroke="#38bdf8" stroke-dasharray="4,4"/>
            <line x1="400" y1="40" x2="400" y2="580" stroke="#38bdf8" stroke-dasharray="4,4"/>
          </g>

          <!-- North Region: Jammu & Kashmir / Ladakh outline backdrop -->
          <polygon points="180,30 220,15 260,35 270,75 240,95 200,90 170,60" class="map-bg-territory" />
          <polygon points="160,95 200,90 220,120 180,135 150,115" class="map-bg-territory" />

          <!-- PUNJAB (PB) -->
          <g class="state-group" data-state="punjab">
            <polygon id="state-punjab" data-state-id="punjab" 
              points="145,120 190,110 205,145 175,165 140,150" 
              class="state-region ${this.selectedStateId === 'punjab' ? 'active-state' : ''}" />
            <text x="168" y="138" class="state-label">PB</text>
            <circle cx="168" cy="148" r="4" class="mandi-pulse" />
          </g>

          <!-- UTTAR PRADESH (UP) -->
          <g class="state-group" data-state="uttar_pradesh">
            <polygon id="state-uttar_pradesh" data-state-id="uttar_pradesh" 
              points="205,145 285,135 340,185 305,230 235,215 195,175" 
              class="state-region ${this.selectedStateId === 'uttar_pradesh' ? 'active-state' : ''}" />
            <text x="260" y="180" class="state-label">UP</text>
            <circle cx="260" cy="192" r="4" class="mandi-pulse" />
          </g>

          <!-- GUJARAT (GJ) -->
          <g class="state-group" data-state="gujarat">
            <polygon id="state-gujarat" data-state-id="gujarat" 
              points="75,235 145,225 160,285 125,325 70,305 60,265" 
              class="state-region ${this.selectedStateId === 'gujarat' ? 'active-state' : ''}" />
            <text x="110" y="275" class="state-label">GJ</text>
            <circle cx="110" cy="287" r="4" class="mandi-pulse" />
          </g>

          <!-- MAHARASHTRA (MH) -->
          <g class="state-group" data-state="maharashtra">
            <polygon id="state-maharashtra" data-state-id="maharashtra" 
              points="130,325 210,290 280,315 285,375 220,405 155,395 130,355" 
              class="state-region ${this.selectedStateId === 'maharashtra' ? 'active-state' : ''}" />
            <text x="200" y="355" class="state-label">MH</text>
            <circle cx="200" cy="367" r="4" class="mandi-pulse" />
          </g>

          <!-- TELANGANA (TG) -->
          <g class="state-group" data-state="telangana">
            <polygon id="state-telangana" data-state-id="telangana" 
              points="225,405 285,375 320,415 275,460 230,445" 
              class="state-region ${this.selectedStateId === 'telangana' ? 'active-state' : ''}" />
            <text x="270" y="425" class="state-label">TG</text>
            <circle cx="270" cy="437" r="4" class="mandi-pulse" />
          </g>

          <!-- ANDHRA PRADESH (AP) -->
          <g class="state-group" data-state="andhra_pradesh">
            <polygon id="state-andhra_pradesh" data-state-id="andhra_pradesh" 
              points="275,460 320,415 355,360 375,405 320,525 265,510" 
              class="state-region ${this.selectedStateId === 'andhra_pradesh' ? 'active-state' : ''}" />
            <text x="315" y="475" class="state-label">AP</text>
            <circle cx="315" cy="487" r="4" class="mandi-pulse" />
          </g>

          <!-- KARNATAKA (KA) -->
          <g class="state-group" data-state="karnataka">
            <polygon id="state-karnataka" data-state-id="karnataka" 
              points="155,395 225,405 265,490 240,545 190,520 175,445" 
              class="state-region ${this.selectedStateId === 'karnataka' ? 'active-state' : ''}" />
            <text x="215" y="470" class="state-label">KA</text>
            <circle cx="215" cy="482" r="4" class="mandi-pulse" />
          </g>

          <!-- TAMIL NADU (TN) -->
          <g class="state-group" data-state="tamil_nadu">
            <polygon id="state-tamil_nadu" data-state-id="tamil_nadu" 
              points="240,535 305,525 290,595 245,605 220,565" 
              class="state-region ${this.selectedStateId === 'tamil_nadu' ? 'active-state' : ''}" />
            <text x="265" y="565" class="state-label">TN</text>
            <circle cx="265" cy="577" r="4" class="mandi-pulse" />
          </g>

          <!-- KERALA (KL) -->
          <g class="state-group" data-state="kerala">
            <polygon id="state-kerala" data-state-id="kerala" 
              points="190,535 225,545 220,600 200,605 185,565" 
              class="state-region ${this.selectedStateId === 'kerala' ? 'active-state' : ''}" />
            <text x="202" y="575" class="state-label">KL</text>
            <circle cx="202" cy="587" r="4" class="mandi-pulse" />
          </g>

          <!-- Arbitrage Corridor Line: Karnataka to Maharashtra -->
          <path d="M 215,470 Q 210,410 200,365" class="trade-corridor-path" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" fill="none" />
          <polygon points="198,360 204,372 194,370" fill="#10b981" />

          <!-- Highlighting Rings on Active State -->
          <circle cx="265" cy="565" r="18" class="scanner-ring" id="mapScannerRing" />
        </svg>

        <div class="map-legend">
          <div class="legend-item"><span class="legend-color legend-up"></span> ₹38 - ₹45+ / kg (Premium Demand)</div>
          <div class="legend-item"><span class="legend-color legend-stable"></span> ₹30 - ₹37 / kg (Balanced Trading)</div>
          <div class="legend-item"><span class="legend-color legend-down"></span> Below ₹30 / kg (Surplus Inflow)</div>
          <div class="legend-item"><span class="legend-line"></span> Inter-State Trade Corridor</div>
        </div>
      </div>
    `;

    this.container.innerHTML = svgHTML;

    // Attach click events to state polygons
    const stateGroups = this.container.querySelectorAll(".state-group");
    stateGroups.forEach(group => {
      const stateId = group.getAttribute("data-state");
      group.addEventListener("click", () => {
        this.selectState(stateId);
      });
      group.addEventListener("mouseenter", (e) => {
        const stateObj = CFP_DATA.states.find(s => s.id === stateId);
        if (stateObj) {
          this.showMapTooltip(e, stateObj);
        }
      });
      group.addEventListener("mouseleave", () => {
        this.hideMapTooltip();
      });
    });
  }

  showMapTooltip(event, state) {
    let tooltip = document.getElementById("mapHoverTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "mapHoverTooltip";
      tooltip.className = "map-floating-tooltip";
      document.body.appendChild(tooltip);
    }
    const cropPrice = state.cropPrices[this.activeCropFilter] || state.avgPrice;
    tooltip.innerHTML = `
      <div class="tooltip-header">
        <strong>${state.name} (${state.code})</strong>
        <span class="badge ${state.trend === 'up' ? 'badge-rise' : (state.trend === 'down' ? 'badge-drop' : 'badge-stable')}">
          ${state.trend === 'up' ? '↑ Rising' : (state.trend === 'down' ? '↓ Soft' : '→ Stable')}
        </span>
      </div>
      <div class="tooltip-body">
        <div>${this.activeCropFilter.toUpperCase()}: <strong>₹${cropPrice}/kg</strong></div>
        <div class="text-xs text-muted">7-Day Change: ${state.change7d}</div>
        <div class="text-xs text-cyan">Click to inspect state</div>
      </div>
    `;
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY - 20}px`;
    tooltip.style.display = "block";
  }

  hideMapTooltip() {
    const tooltip = document.getElementById("mapHoverTooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  }

  renderStateDetail(stateId) {
    const state = CFP_DATA.states.find(s => s.id === stateId) || CFP_DATA.states[0];
    const cropPrice = state.cropPrices[this.activeCropFilter] || state.avgPrice;
    const crop = CFP_DATA.crops.find(c => c.id === this.activeCropFilter) || CFP_DATA.crops[0];

    const trendBadge = state.trend === "up" 
      ? `<span class="badge badge-rise"><i class="icon-up">↑</i> Rising</span>`
      : (state.trend === "down" 
        ? `<span class="badge badge-drop"><i class="icon-down">↓</i> Dropping</span>` 
        : `<span class="badge badge-stable"><i class="icon-stable">→</i> Stable</span>`);

    this.detailContainer.innerHTML = `
      <div class="state-inspector-card glass-card">
        <div class="inspector-header">
          <div>
            <span class="state-code-pill">${state.code}</span>
            <h3 class="state-title">${state.name}</h3>
            <div class="state-subtitle">Regional Mandi Telemetry</div>
          </div>
          <div class="state-price-display">
            <div class="price-val">₹${cropPrice}<span class="unit">/kg</span></div>
            <div class="price-crop">${crop.icon} ${crop.name}</div>
          </div>
        </div>

        <div class="inspector-metrics-grid">
          <div class="metric-box">
            <span class="metric-lbl">CURRENT AVG PRICE</span>
            <span class="metric-num">₹${cropPrice} / kg</span>
            <span class="metric-hint">Modal APMC Rate</span>
          </div>

          <div class="metric-box">
            <span class="metric-lbl">PRICE TREND</span>
            <div class="metric-badge-wrap">${trendBadge}</div>
            <span class="metric-hint">${state.trend === 'up' ? 'Bullish buying' : 'Regular trading'}</span>
          </div>

          <div class="metric-box">
            <span class="metric-lbl">7-DAY CHANGE</span>
            <span class="metric-num ${state.change7d.startsWith('+') ? 'text-emerald' : 'text-amber'}">${state.change7d}</span>
            <span class="metric-hint">Trajectory</span>
          </div>

          <div class="metric-box">
            <span class="metric-lbl">TOP COMMODITY</span>
            <span class="metric-num">${state.topCropIcon} ${state.topCrop}</span>
            <span class="metric-hint">Highest volume traded</span>
          </div>
        </div>

        <div class="inspector-section">
          <div class="section-title-sm"><i class="icon">🏛️</i> Key Reporting Mandis in ${state.name}</div>
          <div class="mandi-tags-wrap">
            ${state.keyMandis.map(m => `<span class="mandi-chip">${m}</span>`).join('')}
          </div>
        </div>

        <div class="inspector-section">
          <div class="section-title-sm"><i class="icon">💡</i> Regional Trade Insights</div>
          <p class="inspector-narrative">${state.insights}</p>
        </div>

        <div class="inspector-actions">
          <button class="btn btn-primary btn-sm" onclick="CFP_APP.loadForecastFor('${crop.id}', '${state.id}')">
            📊 View Detailed Forecast for ${state.name}
          </button>
        </div>
      </div>
    `;

    // Move scanner ring on SVG
    const scanner = document.getElementById("mapScannerRing");
    const stateEl = document.getElementById(`state-${state.id}`);
    if (scanner && stateEl) {
      const bbox = stateEl.getBBox();
      scanner.setAttribute("cx", bbox.x + bbox.width / 2);
      scanner.setAttribute("cy", bbox.y + bbox.height / 2);
    }
  }

  renderComparisonMatrix() {
    const selectedCrops = this.activeCropFilter;
    const cropObj = CFP_DATA.crops.find(c => c.id === selectedCrops) || CFP_DATA.crops[0];

    // States to compare
    const compareList = CFP_DATA.states.filter(s => this.comparisonStateIds.includes(s.id));

    // Calculate arbitrage difference (highest vs lowest)
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let minState = null;
    let maxState = null;

    compareList.forEach(s => {
      const p = s.cropPrices[selectedCrops] || s.avgPrice;
      if (p < minPrice) { minPrice = p; minState = s; }
      if (p > maxPrice) { maxPrice = p; maxState = s; }
    });

    const priceSpread = maxPrice - minPrice;

    this.comparisonContainer.innerHTML = `
      <div class="comparison-card glass-card">
        <div class="comparison-header">
          <div>
            <h3 class="card-title">Compare Prices Across States</h3>
            <p class="card-subtitle">Real-time inter-state price differentials for <strong>${cropObj.icon} ${cropObj.name}</strong></p>
          </div>
          <div class="spread-indicator">
            <span class="spread-lbl">MAX ARBITRAGE SPREAD</span>
            <span class="spread-val text-emerald">₹${priceSpread.toFixed(1)} / kg</span>
            <span class="spread-route">${minState ? minState.code : ''} → ${maxState ? maxState.code : ''}</span>
          </div>
        </div>

        <div class="comparison-grid">
          ${compareList.map(s => {
            const price = s.cropPrices[selectedCrops] || s.avgPrice;
            const isHigh = price === maxPrice;
            const isLow = price === minPrice;
            const trendIcon = s.trend === 'up' ? '↑' : (s.trend === 'down' ? '↓' : '→');
            const trendClass = s.trend === 'up' ? 'text-emerald' : (s.trend === 'down' ? 'text-red' : 'text-cyan');

            return `
              <div class="compare-item-card ${isHigh ? 'border-highlight-high' : ''} ${isLow ? 'border-highlight-low' : ''}" onclick="CFP_APP.marketComponent.selectState('${s.id}')">
                <div class="compare-card-top">
                  <span class="compare-state-name">${s.name}</span>
                  <span class="compare-state-code">${s.code}</span>
                </div>
                <div class="compare-price-row">
                  <div class="compare-price">₹${price}<span class="unit">/kg</span></div>
                  <div class="compare-trend ${trendClass}">${trendIcon}</div>
                </div>
                <div class="compare-meta">
                  <span>7D: ${s.change7d}</span>
                  <span>${isHigh ? '🔥 Highest' : (isLow ? '📦 Source Mandi' : 'Balanced')}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="arbitrage-summary-banner">
          <div class="arbitrage-icon">🚚</div>
          <div class="arbitrage-text">
            <strong>Inter-State Trader Opportunity:</strong> 
            Prices in <strong>${maxState ? maxState.name : 'Maharashtra'}</strong> (₹${maxPrice}/kg) are currently 
            <strong>₹${priceSpread}/kg higher</strong> than <strong>${minState ? minState.name : 'Karnataka'}</strong> (₹${minPrice}/kg). 
            With estimated road transport & transit shrinkage cost of ~₹3.50/kg, inter-state traders can capture ~₹${Math.max(0, priceSpread - 3.5).toFixed(1)}/kg net arbitrage margin.
          </div>
        </div>
      </div>
    `;
  }
}

if (typeof window !== "undefined") {
  window.IndiaMarketComponent = IndiaMarketComponent;
}
