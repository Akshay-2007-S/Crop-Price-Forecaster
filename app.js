/**
 * CROP PRICE FORECASTER - Master Application Controller
 * Coordinates views, state, charts, interactive filters, notifications, and language support
 */

class CropPriceForecasterApp {
  constructor() {
    this.currentTab = "dashboard";
    this.selectedCrop = "tomato";
    this.selectedState = "tamil_nadu";
    this.selectedHorizon = 7;
    this.currentLang = "en";

    this.chartEngine = null;
    this.marketComponent = null;
    this.communityComponent = null;
    this.shopComponent = null;
    this.alertsComponent = null;
    this.tourComponent = null;
  }

  init() {
    console.log("Initializing Crop Price Forecaster Prototype...");
    this.renderTicker();
    this.initNavigation();
    this.initComponents();
    this.initForecastControls();
    this.updateForecastDisplay();
    this.initLanguageSelector();
    this.bindGlobalActions();
  }

  renderTicker() {
    const track = document.getElementById("tickerTrack");
    if (!track) return;

    // Render items twice for infinite loop
    const items = [...CFP_DATA.tickerItems, ...CFP_DATA.tickerItems];
    track.innerHTML = items.map(t => `
      <div class="ticker-chip">
        <span class="ticker-mandi">${t.mandi}</span>
        <span class="ticker-crop">${t.crop}</span>
        <span class="ticker-price">${t.price}</span>
        <span class="ticker-change ${t.trend === 'up' ? 'text-emerald' : 'text-red'}">${t.change}</span>
      </div>
    `).join('');
  }

  initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.getAttribute("data-tab");
        if (tab) this.switchTab(tab);
      });
    });

    // Mobile nav toggle
    const mobileToggle = document.getElementById("mobileNavToggle");
    const navMenu = document.getElementById("mainNavMenu");
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update nav links active class
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-tab") === tabName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update tab sections
    document.querySelectorAll(".app-section").forEach(sec => {
      if (sec.id === `section-${tabName}`) {
        sec.classList.add("active-section");
      } else {
        sec.classList.remove("active-section");
      }
    });

    // Close mobile nav if open
    const navMenu = document.getElementById("mainNavMenu");
    if (navMenu) navMenu.classList.remove("open");

    // Specific triggers per tab
    if (tabName === "forecast") {
      setTimeout(() => {
        if (this.chartEngine) {
          this.chartEngine.setupDPI();
          this.updateForecastDisplay();
        }
      }, 50);
    } else if (tabName === "india-market") {
      setTimeout(() => {
        if (this.marketComponent) this.marketComponent.renderMap();
      }, 50);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  initComponents() {
    // 1. Chart Engine
    this.chartEngine = new ForecastChartEngine("forecastMainCanvas");

    // 2. India Market
    this.marketComponent = new IndiaMarketComponent(
      "indiaMapContainer",
      "stateDetailContainer",
      "stateComparisonContainer"
    );
    this.marketComponent.init();

    // 3. Community
    this.communityComponent = new CommunityComponent(
      "communitySignalsContainer",
      "communityFeedContainer"
    );
    this.communityComponent.init();

    // 4. Shop Intelligence
    this.shopComponent = new ShopIntelligenceComponent("shopIntelligenceContainer");
    this.shopComponent.init();

    // 5. Smart Alerts
    this.alertsComponent = new SmartAlertsComponent("smartAlertsContainer");
    this.alertsComponent.init();

    // 6. Hackathon Demo Tour
    this.tourComponent = new DemoTourComponent();
    this.tourComponent.init();
  }

  initForecastControls() {
    // Crop selector
    const cropSel = document.getElementById("selectForecastCrop");
    if (cropSel) {
      cropSel.addEventListener("change", (e) => {
        this.selectedCrop = e.target.value;
        this.updateForecastDisplay();
      });
    }

    // State selector
    const stateSel = document.getElementById("selectForecastState");
    if (stateSel) {
      stateSel.addEventListener("change", (e) => {
        this.selectedState = e.target.value;
        this.updateForecastDisplay();
      });
    }

    // Horizon buttons (7, 14, 30 days)
    const horizonBtns = document.querySelectorAll(".horizon-btn");
    horizonBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        horizonBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedHorizon = parseInt(btn.getAttribute("data-days"), 10);
        this.updateForecastDisplay();
      });
    });

    // Quick Crop Pill Selector
    const cropPills = document.querySelectorAll(".quick-crop-pill");
    cropPills.forEach(pill => {
      pill.addEventListener("click", () => {
        cropPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.selectedCrop = pill.getAttribute("data-crop");
        if (cropSel) cropSel.value = this.selectedCrop;
        this.updateForecastDisplay();
      });
    });
  }

  loadForecastFor(cropId, stateId) {
    this.selectedCrop = cropId;
    this.selectedState = stateId;
    this.switchTab("forecast");

    const cropSel = document.getElementById("selectForecastCrop");
    const stateSel = document.getElementById("selectForecastState");
    if (cropSel) cropSel.value = cropId;
    if (stateSel) stateSel.value = stateId;

    this.updateForecastDisplay();
  }

  setForecastSelection(cropId, stateId, horizonDays = 7) {
    this.selectedCrop = cropId;
    this.selectedState = stateId;
    this.selectedHorizon = horizonDays;

    const cropSel = document.getElementById("selectForecastCrop");
    const stateSel = document.getElementById("selectForecastState");
    if (cropSel) cropSel.value = cropId;
    if (stateSel) stateSel.value = stateId;

    document.querySelectorAll(".horizon-btn").forEach(btn => {
      if (parseInt(btn.getAttribute("data-days"), 10) === horizonDays) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.updateForecastDisplay();
  }

  updateForecastDisplay() {
    const crop = CFP_DATA.crops.find(c => c.id === this.selectedCrop) || CFP_DATA.crops[0];
    const state = CFP_DATA.states.find(s => s.id === this.selectedState) || CFP_DATA.states[0];

    // Generate chart data series
    const series = generateChartTimeSeries(this.selectedCrop, this.selectedState, this.selectedHorizon);

    // Update Chart Canvas
    if (this.chartEngine) {
      this.chartEngine.updateData(series);
    }

    // Update Summary Header on Forecast Page
    const titleEl = document.getElementById("forecastPageCropTitle");
    const stateEl = document.getElementById("forecastPageLocation");
    const currentPriceEl = document.getElementById("fcCurrentPrice");
    const expectedPriceEl = document.getElementById("fcExpectedPrice");
    const trendBadgeEl = document.getElementById("fcTrendBadge");
    const confidenceEl = document.getElementById("fcConfidenceVal");
    const expectedChangeEl = document.getElementById("fcExpectedChange");
    const confidenceBarEl = document.getElementById("fcConfidenceBar");

    if (titleEl) titleEl.innerHTML = `${crop.icon} ${crop.name} <span class="hindi-text">(${crop.hindi})</span>`;
    if (stateEl) stateEl.innerText = `${state.name} • ${this.selectedHorizon}-Day AI Projection`;
    if (currentPriceEl) currentPriceEl.innerText = `₹${series.currentPrice}`;
    if (expectedPriceEl) expectedPriceEl.innerText = `₹${series.forecastEndPrice}`;
    if (expectedChangeEl) {
      const isPos = series.pctChange >= 0;
      expectedChangeEl.innerText = `${isPos ? '+' : ''}${series.pctChange}%`;
      expectedChangeEl.className = `metric-num ${isPos ? 'text-emerald' : 'text-red'}`;
    }

    if (trendBadgeEl) {
      const isUp = crop.trend === "up";
      const isDown = crop.trend === "down";
      trendBadgeEl.className = `badge ${isUp ? 'badge-rise' : (isDown ? 'badge-drop' : 'badge-stable')}`;
      trendBadgeEl.innerHTML = `${isUp ? '↑ LIKELY TO RISE' : (isDown ? '↓ SOFTENING' : '→ STABLE')}`;
    }

    if (confidenceEl) confidenceEl.innerText = `${crop.confidence}%`;
    if (confidenceBarEl) confidenceBarEl.style.width = `${crop.confidence}%`;

    // Render Farmer-Friendly Explanation Box
    const whyContainer = document.getElementById("forecastWhyContainer");
    if (whyContainer) {
      whyContainer.innerHTML = `
        <div class="why-explanation-card glass-card">
          <div class="why-header">
            <span class="badge badge-emerald">SIMPLE FARMER INSIGHT</span>
            <h4 class="why-title">WHY IS ${crop.name.toUpperCase()} PRICE EXPECTED TO ${crop.trend === 'up' ? 'RISE' : (crop.trend === 'down' ? 'SOFTEN' : 'REMAIN STABLE')}?</h4>
          </div>

          <div class="why-bullets-list">
            ${crop.whyExplanation.map(point => `
              <div class="why-bullet-item">
                <span class="check-icon">✓</span>
                <span class="bullet-text">${point}</span>
              </div>
            `).join('')}
          </div>

          <div class="farmer-action-advisory">
            <div class="advisory-icon">🌾</div>
            <div class="advisory-text">
              <strong>Advisory for Growers:</strong> ${crop.farmerAdvice}
            </div>
          </div>

          <div class="forecast-summary-strip">
            <div class="strip-item">
              <span class="strip-label">PRICE TRAJECTORY:</span>
              <span class="strip-val">₹${series.currentPrice} → ₹${series.forecastEndPrice}/kg</span>
            </div>
            <div class="strip-item">
              <span class="strip-label">EXPECTED CHANGE:</span>
              <span class="strip-val ${series.pctChange >= 0 ? 'text-emerald' : 'text-red'}">
                ${series.pctChange >= 0 ? '+' : ''}${series.pctChange}%
              </span>
            </div>
            <div class="strip-item">
              <span class="strip-label">AI CONFIDENCE:</span>
              <span class="strip-val text-cyan">${crop.confidence}%</span>
            </div>
          </div>
        </div>
      `;
    }

    // Render Signal Matrix
    const signalsContainer = document.getElementById("forecastSignalsContainer");
    if (signalsContainer) {
      const sig = crop.signals;
      signalsContainer.innerHTML = `
        <div class="signals-matrix-card glass-card">
          <div class="matrix-header">
            <span class="badge badge-cyan">TELEMETRY DECODED</span>
            <h4 class="card-title">Weather + Market Signals Impact Matrix</h4>
            <p class="card-subtitle">How different multi-modal signals synthesize into the final AI forecast without confusing mathematics.</p>
          </div>

          <div class="signals-flow-grid">
            <div class="signal-node-box">
              <span class="node-icon">📈</span>
              <span class="node-category">MARKET SIGNAL</span>
              <strong class="node-val">${sig.market.value}</strong>
              <span class="node-desc">${sig.market.desc}</span>
            </div>

            <div class="flow-arrow">+</div>

            <div class="signal-node-box">
              <span class="node-icon">🌧️</span>
              <span class="node-category">WEATHER SIGNAL</span>
              <strong class="node-val">${sig.weather.value}</strong>
              <span class="node-desc">${sig.weather.desc}</span>
            </div>

            <div class="flow-arrow">+</div>

            <div class="signal-node-box">
              <span class="node-icon">📦</span>
              <span class="node-category">SUPPLY SIGNAL</span>
              <strong class="node-val">${sig.supply.value}</strong>
              <span class="node-desc">${sig.supply.desc}</span>
            </div>

            <div class="flow-arrow">+</div>

            <div class="signal-node-box">
              <span class="node-icon">🎉</span>
              <span class="node-category">SEASONAL SIGNAL</span>
              <strong class="node-val">${sig.seasonal.value}</strong>
              <span class="node-desc">${sig.seasonal.desc}</span>
            </div>

            <div class="flow-arrow">=</div>

            <div class="signal-result-box ${crop.trend === 'up' ? 'result-up' : (crop.trend === 'down' ? 'result-down' : 'result-stable')}">
              <span class="node-category">AI FORECAST SIGNAL</span>
              <strong class="result-title">${crop.trend === 'up' ? '↑ PRICE LIKELY TO RISE' : (crop.trend === 'down' ? '↓ PRICE LIKELY TO FALL' : '→ PRICE STABLE')}</strong>
              <span class="result-meta">Ensemble Confidence: <strong>${crop.confidence}%</strong></span>
            </div>
          </div>
        </div>
      `;
    }
  }

  initLanguageSelector() {
    const langSelect = document.getElementById("appLanguageSelect");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        this.currentLang = e.target.value;
        this.showToast(
          "Language Updated",
          `Interface localized for Indian regional context (${e.target.options[e.target.selectedIndex].text}).`,
          "info"
        );
      });
    }
  }

  bindGlobalActions() {
    // Dismiss alerts helper
    window.dismissAlert = (alertId) => this.dismissAlert(alertId);

    // Hero buttons
    const btnExplore = document.getElementById("heroBtnExploreForecast");
    const btnIndiaMarket = document.getElementById("heroBtnViewIndiaMarket");

    if (btnExplore) {
      btnExplore.addEventListener("click", () => this.switchTab("forecast"));
    }
    if (btnIndiaMarket) {
      btnIndiaMarket.addEventListener("click", () => this.switchTab("india-market"));
    }
  }

  handleAlertAction(alertType) {
    if (alertType === "price_rise" || alertType === "weather") {
      this.switchTab("forecast");
    } else if (alertType === "arbitrage") {
      this.switchTab("india-market");
    } else {
      this.switchTab("community");
    }
  }

  dismissAlert(alertId) {
    const el = document.getElementById(alertId);
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(50px)";
      setTimeout(() => el.remove(), 300);
    }
  }

  showToast(title, message, type = "info", duration = 4000) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    let icon = "🔔";
    if (type === "success") icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "info") icon = "ℹ️";

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <h5 class="toast-title">${title}</h5>
        <p class="toast-msg">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  window.CFP_APP = new CropPriceForecasterApp();
  window.CFP_APP.init();
});
