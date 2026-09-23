/**
 * AGRISENSE - Farmer Profit Simulator & Selling Decision Assistant
 * Compares harvest liquidation scenarios (Sell Now vs +7d vs +14d vs Nearby Arbitrage)
 */

class ProfitSimulatorComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);

    // Default configuration for a 2-acre tomato farmer in Hosur / Kolar
    this.cropId = "tomato";
    this.varietyId = "shivam_hybrid";
    this.landArea = 2.0; // acres
    this.yieldPerAcre = 14000; // kg (14 tonnes)
    this.currentPrice = 35; // ₹/kg
    this.forecast7dPrice = 39; // ₹/kg
    this.forecast14dPrice = 41; // ₹/kg

    // Input costs (per acre)
    this.fertilizerCost = 14000;
    this.pesticideCost = 9000;
    this.labourCost = 16000;
    this.irrigationCost = 5000;
    this.machineryCost = 6000;
    this.transportCostPerKg = 1.20;
    this.storageCostPerKgPerWeek = 0.40;
  }

  init() {
    this.render();
  }

  calculateScenarios() {
    const totalYieldKg = this.landArea * this.yieldPerAcre;
    const baseFarmingCostPerAcre = this.fertilizerCost + this.pesticideCost + this.labourCost + this.irrigationCost + this.machineryCost;
    const totalBaseFarmingCost = baseFarmingCostPerAcre * this.landArea;

    // Scenario 1: Sell Today (Current Price, no storage cost)
    const costNow = totalBaseFarmingCost + (totalYieldKg * this.transportCostPerKg);
    const revenueNow = totalYieldKg * this.currentPrice;
    const profitNow = revenueNow - costNow;
    const roiNow = costNow > 0 ? ((profitNow / costNow) * 100).toFixed(1) : 0;

    // Scenario 2: Sell in 7 Days (Forecast 7d price, 1 week holding/storage, 3% transit shrink)
    const storage7d = totalYieldKg * this.storageCostPerKgPerWeek;
    const shrink7dKg = totalYieldKg * 0.02; // 2% weight loss
    const netYield7dKg = totalYieldKg - shrink7dKg;
    const cost7d = totalBaseFarmingCost + (netYield7dKg * this.transportCostPerKg) + storage7d;
    const revenue7d = netYield7dKg * this.forecast7dPrice;
    const profit7d = revenue7d - cost7d;
    const roi7d = cost7d > 0 ? ((profit7d / cost7d) * 100).toFixed(1) : 0;

    // Scenario 3: Sell in 14 Days (Forecast 14d price, 2 weeks storage, 4% shrink)
    const storage14d = totalYieldKg * (this.storageCostPerKgPerWeek * 2);
    const shrink14dKg = totalYieldKg * 0.04;
    const netYield14dKg = totalYieldKg - shrink14dKg;
    const cost14d = totalBaseFarmingCost + (netYield14dKg * this.transportCostPerKg) + storage14d;
    const revenue14d = netYield14dKg * this.forecast14dPrice;
    const profit14d = revenue14d - cost14d;
    const roi14d = cost14d > 0 ? ((profit14d / cost14d) * 100).toFixed(1) : 0;

    // Scenario 4: Sell in Nearby Metro Mandi (e.g. Koyambedu/Vashi +₹4/kg price, +₹2.20 transport)
    const nearbyPrice = this.currentPrice + 4.5;
    const nearbyTransportPerKg = this.transportCostPerKg + 2.20;
    const costNearby = totalBaseFarmingCost + (totalYieldKg * nearbyTransportPerKg);
    const revenueNearby = totalYieldKg * nearbyPrice;
    const profitNearby = revenueNearby - costNearby;
    const roiNearby = costNearby > 0 ? ((profitNearby / costNearby) * 100).toFixed(1) : 0;

    return {
      totalYieldKg,
      totalBaseFarmingCost,
      scenarios: [
        {
          name: "Scenario A: Sell Today",
          subtitle: "Immediate farm-gate / local mandi sale",
          pricePerKg: this.currentPrice,
          revenue: revenueNow,
          cost: costNow,
          profit: profitNow,
          roi: roiNow,
          badge: "Low Risk",
          badgeColor: "cyan"
        },
        {
          name: "Scenario B: Sell in 7 Days",
          subtitle: "Staggered picking to capture forecast rise",
          pricePerKg: this.forecast7dPrice,
          revenue: revenue7d,
          cost: cost7d,
          profit: profit7d,
          roi: roi7d,
          badge: "Recommended (+₹" + (profit7d - profitNow).toLocaleString() + ")",
          badgeColor: "emerald"
        },
        {
          name: "Scenario C: Sell in 14 Days",
          subtitle: "Extended holding; factoring storage shrink",
          pricePerKg: this.forecast14dPrice,
          revenue: revenue14d,
          cost: cost14d,
          profit: profit14d,
          roi: roi14d,
          badge: "Higher Volatility",
          badgeColor: "amber"
        },
        {
          name: "Scenario D: Inter-State Transport",
          subtitle: "Direct truck transit to metro consumption hub",
          pricePerKg: nearbyPrice,
          revenue: revenueNearby,
          cost: costNearby,
          profit: profitNearby,
          roi: roiNearby,
          badge: "Arbitrage Play",
          badgeColor: "purple"
        }
      ]
    };
  }

  render() {
    if (!this.container) return;

    const cropObj = CFP_DATA.crops.find(c => c.id === this.cropId) || CFP_DATA.crops[0];
    const data = this.calculateScenarios();

    this.container.innerHTML = `
      <div class="profit-simulator-wrapper">
        <div class="simulator-header-bar">
          <div>
            <span class="badge badge-emerald"><span class="pulse-dot"></span> DECISION OPTIMIZER</span>
            <h3 class="card-title">Farmer Profit Simulator & Selling Assistant</h3>
            <p class="card-subtitle">Evaluate how harvest timing, transport costs, and storage shrink impact your net take-home bank profit.</p>
          </div>
        </div>

        <div class="simulator-layout-grid">
          <!-- Left: Input Parameters Card -->
          <div class="simulator-inputs-card glass-card">
            <h4 class="form-card-title">Farm & Cost Parameters</h4>

            <div class="form-row-2">
              <div class="form-group">
                <label class="form-label" for="simCrop">Select Crop</label>
                <select id="simCrop" class="form-control">
                  ${CFP_DATA.crops.map(c => `
                    <option value="${c.id}" ${c.id === this.cropId ? 'selected' : ''}>
                      ${c.icon} ${c.name}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="simLandArea">Land Area (Acres)</label>
                <input type="number" id="simLandArea" class="form-control" value="${this.landArea}" step="0.5" min="0.5" />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label class="form-label" for="simYield">Expected Yield (kg/Acre)</label>
                <input type="number" id="simYield" class="form-control" value="${this.yieldPerAcre}" step="500" />
              </div>

              <div class="form-group">
                <label class="form-label" for="simCurrentPrice">Current Spot Price (₹/kg)</label>
                <input type="number" id="simCurrentPrice" class="form-control" value="${this.currentPrice}" step="0.5" />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label class="form-label" for="simForecast7d">7-Day Forecast (₹/kg)</label>
                <input type="number" id="simForecast7d" class="form-control" value="${this.forecast7dPrice}" step="0.5" />
              </div>

              <div class="form-group">
                <label class="form-label" for="simForecast14d">14-Day Forecast (₹/kg)</label>
                <input type="number" id="simForecast14d" class="form-control" value="${this.forecast14dPrice}" step="0.5" />
              </div>
            </div>

            <div class="accordion-costs-section">
              <h5 class="sub-heading">Per-Acre Input Costs Breakdown</h5>
              <div class="cost-inputs-grid">
                <div class="cost-input-item">
                  <label>Fertilizers:</label>
                  <span>₹<input type="number" id="simFertCost" value="${this.fertilizerCost}" step="500" /></span>
                </div>
                <div class="cost-input-item">
                  <label>Pesticides:</label>
                  <span>₹<input type="number" id="simPestCost" value="${this.pesticideCost}" step="500" /></span>
                </div>
                <div class="cost-input-item">
                  <label>Labour:</label>
                  <span>₹<input type="number" id="simLabourCost" value="${this.labourCost}" step="500" /></span>
                </div>
                <div class="cost-input-item">
                  <label>Irrigation / Power:</label>
                  <span>₹<input type="number" id="simIrrigCost" value="${this.irrigationCost}" step="500" /></span>
                </div>
              </div>
            </div>

            <button type="button" id="btnRecalculateProfit" class="btn btn-primary btn-block" style="margin-top: 1.25rem;">
              ⚡ Recalculate Profit Scenarios
            </button>
          </div>

          <!-- Right: Scenario Comparison Results -->
          <div class="simulator-results-card glass-card">
            <div class="sim-overview-bar">
              <div>
                <span class="sub-label">TOTAL HARVEST HARVESTED</span>
                <div class="large-harvest-val">${(data.totalYieldKg / 1000).toFixed(1)} Tonnes <span class="unit">(${data.totalYieldKg.toLocaleString()} kg)</span></div>
              </div>
              <div class="sim-total-cost-badge">
                <span class="sub-label">Total Cost Base:</span>
                <strong>₹${data.totalBaseFarmingCost.toLocaleString()}</strong>
              </div>
            </div>

            <div class="scenarios-cards-stream">
              ${data.scenarios.map((sc, idx) => `
                <div class="scenario-item-card ${idx === 1 ? 'scenario-best' : ''}">
                  <div class="scenario-top">
                    <div>
                      <span class="scenario-badge badge-${sc.badgeColor}">${sc.badge}</span>
                      <h4 class="scenario-title">${sc.name}</h4>
                      <span class="scenario-sub">${sc.subtitle}</span>
                    </div>
                    <div class="scenario-price-tag">
                      <span class="price">₹${sc.pricePerKg.toFixed(1)}</span>
                      <span class="unit">/kg</span>
                    </div>
                  </div>

                  <div class="scenario-financials-row">
                    <div class="financial-col">
                      <span class="f-lbl">Gross Revenue</span>
                      <span class="f-val">₹${Math.round(sc.revenue).toLocaleString()}</span>
                    </div>
                    <div class="financial-col">
                      <span class="f-lbl">Total Expenses</span>
                      <span class="f-val text-muted">₹${Math.round(sc.cost).toLocaleString()}</span>
                    </div>
                    <div class="financial-col">
                      <span class="f-lbl">Net Take-Home Profit</span>
                      <span class="f-val text-emerald" style="font-size: 1.25rem;">₹${Math.round(sc.profit).toLocaleString()}</span>
                    </div>
                    <div class="financial-col">
                      <span class="f-lbl">Return on Inv. (ROI)</span>
                      <span class="f-val text-cyan">${sc.roi}%</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="simulator-disclaimer-box">
              <span class="icon">ℹ️</span>
              <p>
                <strong>Decision Advisory Disclaimer:</strong> 
                This simulator is an informational decision-support tool based on statistical forecasts, not a guaranteed return. 
                Weather risks, harvest field spoilage, and local mandi commission fee fluctuations should be evaluated prior to holding crops.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindDOMEvents();
  }

  bindDOMEvents() {
    const btn = document.getElementById("btnRecalculateProfit");
    const cropSel = document.getElementById("simCrop");
    const landInp = document.getElementById("simLandArea");
    const yieldInp = document.getElementById("simYield");
    const curPInp = document.getElementById("simCurrentPrice");
    const fc7Inp = document.getElementById("simForecast7d");
    const fc14Inp = document.getElementById("simForecast14d");

    const fertInp = document.getElementById("simFertCost");
    const pestInp = document.getElementById("simPestCost");
    const labInp = document.getElementById("simLabourCost");
    const irrInp = document.getElementById("simIrrigCost");

    const syncAndRecalc = () => {
      this.cropId = cropSel ? cropSel.value : this.cropId;
      this.landArea = parseFloat(landInp ? landInp.value : this.landArea) || 1;
      this.yieldPerAcre = parseFloat(yieldInp ? yieldInp.value : this.yieldPerAcre) || 1000;
      this.currentPrice = parseFloat(curPInp ? curPInp.value : this.currentPrice) || 30;
      this.forecast7dPrice = parseFloat(fc7Inp ? fc7Inp.value : this.forecast7dPrice) || 35;
      this.forecast14dPrice = parseFloat(fc14Inp ? fc14Inp.value : this.forecast14dPrice) || 37;

      if (fertInp) this.fertilizerCost = parseFloat(fertInp.value) || 0;
      if (pestInp) this.pesticideCost = parseFloat(pestInp.value) || 0;
      if (labInp) this.labourCost = parseFloat(labInp.value) || 0;
      if (irrInp) this.irrigationCost = parseFloat(irrInp.value) || 0;

      this.render();
    };

    if (btn) btn.addEventListener("click", syncAndRecalc);
    if (cropSel) cropSel.addEventListener("change", syncAndRecalc);
  }
}

if (typeof window !== "undefined") {
  window.ProfitSimulatorComponent = ProfitSimulatorComponent;
}
