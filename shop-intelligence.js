/**
 * CROP PRICE FORECASTER - Local Shop Price Intelligence Module
 * Empowers small vegetable & fruit shops to analyze margins, compare nearby shops, and time their wholesale procurement
 */

class ShopIntelligenceComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.crop = "tomato";
    this.buyingPrice = 32;
    this.sellingPrice = 40;
    this.location = "Hosur";
  }

  init() {
    this.render();
  }

  calculate() {
    const cropObj = CFP_DATA.crops.find(c => c.id === this.crop) || CFP_DATA.crops[0];
    const locData = CFP_DATA.shopIntelligenceData.locations[this.location] || CFP_DATA.shopIntelligenceData.locations["Hosur"];

    const marginAmt = this.sellingPrice - this.buyingPrice;
    const marginPct = this.buyingPrice > 0 ? ((marginAmt / this.buyingPrice) * 100).toFixed(1) : 0;
    
    // Scale nearby mandi average with chosen crop base
    const priceScale = cropObj.currentPrice / 35;
    const mandiAvg = +(locData.mandiAvg * priceScale).toFixed(1);
    const forecast7d = +(locData.forecast7d * priceScale).toFixed(1);

    const priceVsMandi = +(this.buyingPrice - mandiAvg).toFixed(1);
    const buyingRating = priceVsMandi <= 0 ? "Good Rate (Below Mandi Avg)" : "Higher than Mandi Avg";

    const shops = locData.nearbyShops.map((s, idx) => {
      const p = +(s.price * priceScale).toFixed(1);
      return {
        name: s.name,
        price: p,
        location: s.location
      };
    });

    return {
      cropObj,
      locData,
      marginAmt: marginAmt.toFixed(1),
      marginPct,
      mandiAvg,
      forecast7d,
      priceVsMandi,
      buyingRating,
      demand: locData.demand,
      trend: locData.trend,
      advice: locData.advice,
      shops
    };
  }

  render() {
    if (!this.container) return;

    const data = this.calculate();

    this.container.innerHTML = `
      <div class="shop-intelligence-wrapper">
        <div class="shop-intel-intro">
          <span class="badge badge-cyan"><i class="icon">🏪</i> RETAIL PRICE INTELLIGENCE</span>
          <h3 class="card-title">Local Shop & Small Trader Margin Optimizer</h3>
          <p class="card-subtitle">Designed for neighborhood sabzi mandis, kirana stores, and fruit vendors to avoid buying at the wrong time and preserve margins.</p>
        </div>

        <div class="shop-intel-grid">
          <!-- Input Form Column -->
          <div class="shop-form-card glass-card">
            <h4 class="form-card-title">Enter Your Shop's Daily Rate</h4>
            
            <form id="shopCalcForm" class="shop-form">
              <div class="form-group">
                <label class="form-label" for="shopCropSelect">Select Crop</label>
                <select id="shopCropSelect" class="form-control">
                  ${CFP_DATA.crops.map(c => `
                    <option value="${c.id}" ${c.id === this.crop ? 'selected' : ''}>
                      ${c.icon} ${c.name} (${c.hindi})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="shopBuyPrice">Current Buying Price (₹/kg)</label>
                  <div class="input-with-symbol">
                    <span class="symbol">₹</span>
                    <input type="number" id="shopBuyPrice" class="form-control" value="${this.buyingPrice}" min="1" step="0.5" />
                  </div>
                  <span class="field-hint">What you pay at wholesale</span>
                </div>

                <div class="form-group">
                  <label class="form-label" for="shopSellPrice">Current Selling Price (₹/kg)</label>
                  <div class="input-with-symbol">
                    <span class="symbol">₹</span>
                    <input type="number" id="shopSellPrice" class="form-control" value="${this.sellingPrice}" min="1" step="0.5" />
                  </div>
                  <span class="field-hint">Your retail shop board price</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="shopLocationSelect">Your Shop Location</label>
                <select id="shopLocationSelect" class="form-control">
                  <option value="Hosur" ${this.location === 'Hosur' ? 'selected' : ''}>Hosur (Tamil Nadu)</option>
                  <option value="Bengaluru" ${this.location === 'Bengaluru' ? 'selected' : ''}>Bengaluru (Karnataka)</option>
                  <option value="Pune" ${this.location === 'Pune' ? 'selected' : ''}>Pune (Maharashtra)</option>
                  <option value="Chennai" ${this.location === 'Chennai' ? 'selected' : ''}>Chennai (Tamil Nadu)</option>
                </select>
                <span class="field-hint">Nearby APMC Mandi will be automatically matched</span>
              </div>

              <button type="button" id="btnRecalculateShop" class="btn btn-primary btn-block">
                ⚡ Analyze Margin & Wholesale Timing
              </button>
            </form>
          </div>

          <!-- Intelligence Results Column -->
          <div class="shop-results-card glass-card">
            <div class="results-header-bar">
              <div>
                <span class="tag-status">MARKET INTELLIGENCE REPORT</span>
                <h4 class="results-location-title">${this.location} Retail Radius Analysis</h4>
              </div>
              <div class="margin-badge ${data.marginAmt >= 0 ? 'margin-good' : 'margin-bad'}">
                <div class="margin-val">₹${data.marginAmt}/kg</div>
                <div class="margin-pct">(${data.marginPct}% Gross Margin)</div>
              </div>
            </div>

            <!-- 4 Core Metric KPI Blocks -->
            <div class="shop-kpi-row">
              <div class="shop-kpi-box">
                <span class="kpi-label">NEARBY MARKET AVERAGE</span>
                <span class="kpi-num text-cyan">₹${data.mandiAvg}<span class="unit">/kg</span></span>
                <span class="kpi-desc">${data.locData.nearbyMarket}</span>
              </div>

              <div class="shop-kpi-box">
                <span class="kpi-label">7-DAY EXPECTED PRICE</span>
                <span class="kpi-num text-emerald">₹${data.forecast7d}<span class="unit">/kg</span></span>
                <span class="kpi-desc">Wholesale Mandi Forecast</span>
              </div>

              <div class="shop-kpi-box">
                <span class="kpi-label">LOCAL DEMAND</span>
                <div class="kpi-demand-tag"><span class="pulse-dot"></span> ${data.demand}</div>
                <span class="kpi-desc">High consumer footfall</span>
              </div>

              <div class="shop-kpi-box">
                <span class="kpi-label">PRICE TREND</span>
                <span class="kpi-trend text-emerald">↑ Rising</span>
                <span class="kpi-desc">Next 7 days trajectory</span>
              </div>
            </div>

            <!-- Actionable Procurement Advisory -->
            <div class="shop-advice-box">
              <div class="advice-icon">💡</div>
              <div class="advice-content">
                <strong>Suggested Action for Your Shop:</strong>
                <p>“${data.advice}”</p>
              </div>
            </div>

            <!-- Nearby Shops Benchmarking -->
            <div class="nearby-shops-block">
              <div class="nearby-title">🏪 Competitor Price Check in Your Vicinity</div>
              <div class="nearby-shops-list">
                ${data.shops.map((s, idx) => `
                  <div class="nearby-shop-item">
                    <div class="shop-details">
                      <span class="shop-name">${s.name}</span>
                      <span class="shop-loc">📍 ${s.location}</span>
                    </div>
                    <div class="shop-price-tag">
                      <span class="price">₹${s.price}</span>
                      <span class="unit">/kg</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindDOMEvents();
  }

  bindDOMEvents() {
    const cropSelect = document.getElementById("shopCropSelect");
    const buyPrice = document.getElementById("shopBuyPrice");
    const sellPrice = document.getElementById("shopSellPrice");
    const locSelect = document.getElementById("shopLocationSelect");
    const btn = document.getElementById("btnRecalculateShop");

    const update = () => {
      this.crop = cropSelect.value;
      this.buyingPrice = parseFloat(buyPrice.value) || 0;
      this.sellingPrice = parseFloat(sellPrice.value) || 0;
      this.location = locSelect.value;
      this.render();
    };

    if (btn) btn.addEventListener("click", update);
    if (cropSelect) cropSelect.addEventListener("change", update);
    if (locSelect) locSelect.addEventListener("change", update);
  }
}

if (typeof window !== "undefined") {
  window.ShopIntelligenceComponent = ShopIntelligenceComponent;
}
