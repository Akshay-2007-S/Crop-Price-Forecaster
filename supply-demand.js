/**
 * AGRISENSE - 4-Tier Supply-Demand Pressure Meter Component
 * Shows market pressure across District -> State -> Region -> National tiers
 */

class SupplyDemandComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeCropId = "tomato";
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const cropObj = CFP_DATA.crops.find(c => c.id === this.activeCropId) || CFP_DATA.crops[0];
    const pressureData = CFP_DATA.supplyDemandPressure[this.activeCropId] || CFP_DATA.supplyDemandPressure["tomato"];

    const getPressureBadge = (status, level) => {
      if (status === "red") return `<span class="badge badge-pressure-red"><span class="pressure-dot dot-red"></span> 🔴 High Pressure</span>`;
      if (status === "yellow") return `<span class="badge badge-pressure-yellow"><span class="pressure-dot dot-yellow"></span> 🟡 Medium Pressure</span>`;
      return `<span class="badge badge-pressure-green"><span class="pressure-dot dot-green"></span> 🟢 Low Pressure</span>`;
    };

    this.container.innerHTML = `
      <div class="supply-demand-wrapper glass-card">
        <div class="pressure-header-bar">
          <div>
            <span class="badge badge-cyan"><span class="pulse-dot"></span> HIERARCHICAL MARKET EQUILIBRIUM</span>
            <h3 class="card-title">4-Tier Supply–Demand Pressure Meter</h3>
            <p class="card-subtitle">Visualizes inventory pressure and buyer competition from the local panchayat mandi up to the national terminal index.</p>
          </div>
          <div class="pressure-crop-selector">
            <select id="pressureCropSelect" class="form-control" style="width: auto;">
              ${CFP_DATA.crops.map(c => `
                <option value="${c.id}" ${c.id === this.activeCropId ? 'selected' : ''}>
                  ${c.icon} ${c.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="pressure-hierarchy-grid">
          <!-- Tier 1: District -->
          <div class="tier-card glass-card">
            <div class="tier-top">
              <div class="tier-level-info">
                <span class="tier-icon">📍</span>
                <div>
                  <h4 class="tier-name">District Tier</h4>
                  <span class="tier-scope">Local APMC & Farm-Gate Radius</span>
                </div>
              </div>
              ${getPressureBadge(pressureData.district.status, pressureData.district.level)}
            </div>

            <div class="pressure-gauge-bar">
              <div class="gauge-fill fill-${pressureData.district.status}" style="width: ${pressureData.district.score}%;"></div>
            </div>

            <div class="tier-desc-box">
              <span class="score-label">Demand Intensity: <strong>${pressureData.district.score}%</strong></span>
              <p>${pressureData.district.desc}</p>
            </div>
          </div>

          <!-- Tier 2: State -->
          <div class="tier-card glass-card">
            <div class="tier-top">
              <div class="tier-level-info">
                <span class="tier-icon">🏛️</span>
                <div>
                  <h4 class="tier-name">State Tier</h4>
                  <span class="tier-scope">State APMC Boards & Primary Hubs</span>
                </div>
              </div>
              ${getPressureBadge(pressureData.state.status, pressureData.state.level)}
            </div>

            <div class="pressure-gauge-bar">
              <div class="gauge-fill fill-${pressureData.state.status}" style="width: ${pressureData.state.score}%;"></div>
            </div>

            <div class="tier-desc-box">
              <span class="score-label">Demand Intensity: <strong>${pressureData.state.score}%</strong></span>
              <p>${pressureData.state.desc}</p>
            </div>
          </div>

          <!-- Tier 3: Region -->
          <div class="tier-card glass-card">
            <div class="tier-top">
              <div class="tier-level-info">
                <span class="tier-icon">🌏</span>
                <div>
                  <h4 class="tier-name">Regional Zone</h4>
                  <span class="tier-scope">Inter-State Transit Corridor</span>
                </div>
              </div>
              ${getPressureBadge(pressureData.region.status, pressureData.region.level)}
            </div>

            <div class="pressure-gauge-bar">
              <div class="gauge-fill fill-${pressureData.region.status}" style="width: ${pressureData.region.score}%;"></div>
            </div>

            <div class="tier-desc-box">
              <span class="score-label">Demand Intensity: <strong>${pressureData.region.score}%</strong></span>
              <p>${pressureData.region.desc}</p>
            </div>
          </div>

          <!-- Tier 4: National -->
          <div class="tier-card glass-card">
            <div class="tier-top">
              <div class="tier-level-info">
                <span class="tier-icon">🇮🇳</span>
                <div>
                  <h4 class="tier-name">National Tier</h4>
                  <span class="tier-scope">All-India e-NAM & Terminal Ports</span>
                </div>
              </div>
              ${getPressureBadge(pressureData.national.status, pressureData.national.level)}
            </div>

            <div class="pressure-gauge-bar">
              <div class="gauge-fill fill-${pressureData.national.status}" style="width: ${pressureData.national.score}%;"></div>
            </div>

            <div class="tier-desc-box">
              <span class="score-label">Demand Intensity: <strong>${pressureData.national.score}%</strong></span>
              <p>${pressureData.national.desc}</p>
            </div>
          </div>
        </div>

        <div class="pressure-integration-note">
          <span class="icon">💡</span>
          <p>
            <strong>How Pressure Influences AI Forecasting:</strong> 
            When District demand (85%) outpaces National pressure (58%), local farm-gate prices surge rapidly above the national wholesale average. 
            This localized tension triggers our <strong>Price Rise Alert</strong>.
          </p>
        </div>
      </div>
    `;

    const sel = document.getElementById("pressureCropSelect");
    if (sel) {
      sel.addEventListener("change", (e) => {
        this.activeCropId = e.target.value;
        this.render();
      });
    }
  }
}

if (typeof window !== "undefined") {
  window.SupplyDemandComponent = SupplyDemandComponent;
}
