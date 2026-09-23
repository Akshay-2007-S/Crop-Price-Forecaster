/**
 * AGRISENSE - Crop Intelligence, Variety Advisor & Crop Care Component
 * Provides crop cards, variety comparison, and dual traditional/modern crop care recommendations
 */

class CropIntelligenceComponent {
  constructor(cardsContainerId, advisorContainerId, careContainerId) {
    this.cardsContainer = document.getElementById(cardsContainerId);
    this.advisorContainer = document.getElementById(advisorContainerId);
    this.careContainer = document.getElementById(careContainerId);

    this.selectedCropId = "tomato";
    this.selectedCareCropId = "tomato";
    this.selectedCareStageIndex = 0;
  }

  init() {
    this.render();
  }

  render() {
    if (this.cardsContainer) this.renderCropCards();
    if (this.advisorContainer) this.renderVarietyAdvisor();
    if (this.careContainer) this.renderCropCare();
  }

  renderCropCards() {
    this.cardsContainer.innerHTML = `
      <div class="crop-intelligence-wrapper">
        <div class="section-title-wrap" style="margin-bottom: 1.25rem;">
          <span class="badge badge-emerald"><span class="pulse-dot"></span> 9 CORE COMMODITIES</span>
          <h3 class="card-title">Crop Intelligence & Profiles</h3>
          <p class="card-subtitle">Granular agronomic parameters, price forecasts, and market demand profiles for decision-making.</p>
        </div>

        <div class="crop-cards-grid">
          ${CFP_DATA.crops.map(c => {
            const isUp = c.trend === 'up';
            const isDown = c.trend === 'down';
            const trendClass = isUp ? 'badge-rise' : (isDown ? 'badge-drop' : 'badge-stable');

            return `
              <div class="crop-profile-card glass-card" onclick="CFP_APP.cropComponent.selectCropForAdvisor('${c.id}')">
                <div class="crop-card-top">
                  <div class="crop-avatar-box">
                    <span class="crop-emoji">${c.icon}</span>
                  </div>
                  <div>
                    <h4 class="crop-name">${c.name}</h4>
                    <span class="crop-regional-names">${c.hindi} • ${c.tamil}</span>
                  </div>
                  <span class="badge ${trendClass}">${c.trendLabel}</span>
                </div>

                <div class="crop-price-stat-row">
                  <div class="stat-cell">
                    <span class="lbl">Current Modal</span>
                    <span class="val">₹${c.currentPrice}/kg</span>
                  </div>
                  <div class="stat-cell">
                    <span class="lbl">7-Day Forecast</span>
                    <span class="val text-emerald">₹${c.forecast7d}/kg</span>
                  </div>
                  <div class="stat-cell">
                    <span class="lbl">Confidence</span>
                    <span class="val text-cyan">${c.confidence}%</span>
                  </div>
                </div>

                <div class="crop-specs-list">
                  <div class="spec-row">
                    <span class="spec-label">Growth Cycle:</span>
                    <span class="spec-val">${c.growthDuration}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">Typical Yield:</span>
                    <span class="spec-val">${c.typicalYieldAcre}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">Water Need:</span>
                    <span class="spec-val">${c.waterRequirement}</span>
                  </div>
                </div>

                <div class="crop-card-actions">
                  <button class="btn btn-outline-cyan btn-xs" onclick="event.stopPropagation(); CFP_APP.loadForecastFor('${c.id}', 'tamil_nadu')">
                    Forecast →
                  </button>
                  <button class="btn btn-primary btn-xs" onclick="event.stopPropagation(); CFP_APP.cropComponent.selectCropForCare('${c.id}')">
                    Crop Care 🧪
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  selectCropForAdvisor(cropId) {
    this.selectedCropId = cropId;
    this.renderVarietyAdvisor();
    const el = document.getElementById("varietyAdvisorContainer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  selectCropForCare(cropId) {
    this.selectedCareCropId = cropId;
    this.selectedCareStageIndex = 0;
    this.renderCropCare();
    const el = document.getElementById("cropCareContainer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderVarietyAdvisor() {
    const crop = CFP_DATA.crops.find(c => c.id === this.selectedCropId) || CFP_DATA.crops[0];
    const varieties = crop.varieties || [];

    if (!this.advisorContainer) return;

    this.advisorContainer.innerHTML = `
      <div class="variety-advisor-card glass-card">
        <div class="advisor-header">
          <div>
            <span class="badge badge-purple">SEED & VARIETY DECISION ADVISOR</span>
            <h3 class="card-title">Variety Switching Evaluator: ${crop.name}</h3>
            <p class="card-subtitle">Should you continue with traditional seed or switch to a commercial hybrid? Compare yield, costs, and market demand below:</p>
          </div>
          <div class="crop-selector-wrap">
            <select id="varietyCropSelector" class="form-control" style="width: auto;">
              ${CFP_DATA.crops.filter(c => c.varieties && c.varieties.length > 0).map(c => `
                <option value="${c.id}" ${c.id === this.selectedCropId ? 'selected' : ''}>
                  ${c.icon} ${c.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="varieties-comparison-grid">
          ${varieties.map((v, idx) => `
            <div class="variety-card glass-card ${idx === 0 ? 'variety-recommended' : ''}">
              <div class="variety-card-header">
                <div>
                  <span class="variety-badge ${idx === 0 ? 'badge-emerald' : 'badge-cyan'}">${v.type}</span>
                  <h4 class="variety-name">${v.name}</h4>
                </div>
                <div class="variety-price-box">
                  <span class="v-price-lbl">Expected Rate</span>
                  <span class="v-price-val text-emerald">₹${v.expectedPrice}/kg</span>
                </div>
              </div>

              <div class="variety-metrics-table">
                <div class="v-metric-row">
                  <span class="v-label">🌾 Potential Yield per Acre:</span>
                  <strong>${v.yieldAcre}</strong>
                </div>
                <div class="v-metric-row">
                  <span class="v-label">⏱️ Maturity Cycle:</span>
                  <strong>${v.maturityDays} Days</strong>
                </div>
                <div class="v-metric-row">
                  <span class="v-label">💧 Water Requirement:</span>
                  <strong>${v.waterNeed}</strong>
                </div>
                <div class="v-metric-row">
                  <span class="v-label">💰 Cultivation Cost / Acre:</span>
                  <strong class="text-amber">₹${v.costAcre.toLocaleString()}</strong>
                </div>
                <div class="v-metric-row">
                  <span class="v-label">📦 Shelf-Life & Transit:</span>
                  <strong>${v.shelfLife}</strong>
                </div>
                <div class="v-metric-row">
                  <span class="v-label">🛡️ Pest & Disease Resistance:</span>
                  <strong>${v.pestResistance}</strong>
                </div>
              </div>

              <div class="variety-verdict-box">
                <strong>Agronomic Verdict:</strong>
                <p>${v.verdict}</p>
                <div class="market-pref-tag">🛒 ${v.marketPreference}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const sel = document.getElementById("varietyCropSelector");
    if (sel) {
      sel.addEventListener("change", (e) => {
        this.selectedCropId = e.target.value;
        this.renderVarietyAdvisor();
      });
    }
  }

  renderCropCare() {
    const cropId = this.selectedCareCropId;
    const crop = CFP_DATA.crops.find(c => c.id === cropId) || CFP_DATA.crops[0];
    const careData = CFP_DATA.cropCare[cropId] || CFP_DATA.cropCare["tomato"];
    const stages = careData.stages || [];
    const activeStage = stages[this.selectedCareStageIndex] || stages[0];

    if (!this.careContainer) return;

    this.careContainer.innerHTML = `
      <div class="crop-care-wrapper glass-card">
        <div class="care-header-bar">
          <div>
            <span class="badge badge-emerald">🧪 CROP-CARE ADVISOR</span>
            <h3 class="card-title">Pesticide & Fertilizer Recommendations</h3>
            <p class="card-subtitle">Dual guidance: traditional older-generation wisdom alongside modern scientific agronomic schedules.</p>
          </div>
          <div class="care-crop-pills">
            <button class="care-pill ${cropId === 'tomato' ? 'active' : ''}" onclick="CFP_APP.cropComponent.selectCropForCare('tomato')">🍅 Tomato</button>
            <button class="care-pill ${cropId === 'rice' ? 'active' : ''}" onclick="CFP_APP.cropComponent.selectCropForCare('rice')">🌾 Rice</button>
            <button class="care-pill ${cropId === 'onion' ? 'active' : ''}" onclick="CFP_APP.cropComponent.selectCropForCare('onion')">🧅 Onion</button>
          </div>
        </div>

        <!-- Growth Stage Timeline Selector -->
        <div class="stage-timeline-container">
          <span class="timeline-title">Select Growth Stage:</span>
          <div class="stage-timeline-buttons">
            ${stages.map((stg, idx) => `
              <button class="stage-step-btn ${idx === this.selectedCareStageIndex ? 'stage-active' : ''}" onclick="CFP_APP.cropComponent.setCareStage(${idx})">
                <span class="step-num">${idx + 1}</span>
                <span class="step-text">${stg.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Active Stage Advisory Card -->
        <div class="active-stage-card">
          <div class="stage-card-intro">
            <h4 class="stage-title">${activeStage.name}</h4>
            <p class="stage-desc">${activeStage.description}</p>
          </div>

          <div class="care-cards-columns">
            <!-- Fertilizer Recommendation -->
            <div class="care-detail-box glass-card">
              <div class="box-header-title">
                <span class="icon">🌱</span>
                <strong>Fertilizer & Nutrient Schedule</strong>
              </div>
              
              <div class="dosage-badge-box">
                <span class="badge-title">Recommended Formulation:</span>
                <p class="dosage-text">${activeStage.fertilizer.schedule}</p>
              </div>

              <div class="organic-box">
                <span class="badge badge-cyan">Organic / Natural Option</span>
                <p class="organic-text">${activeStage.fertilizer.organicAlt}</p>
              </div>

              <div class="dual-wisdom-section">
                <div class="wisdom-item tradition-wisdom">
                  <div class="wisdom-tag">👴 Traditional Farmer Wisdom:</div>
                  <p>${activeStage.fertilizer.traditionalNote}</p>
                </div>
                <div class="wisdom-item modern-wisdom">
                  <div class="wisdom-tag">🔬 Modern Scientific Guidance:</div>
                  <p>${activeStage.fertilizer.modernNote}</p>
                </div>
              </div>
            </div>

            <!-- Pest & Disease Management -->
            <div class="care-detail-box glass-card">
              <div class="box-header-title">
                <span class="icon">🛡️</span>
                <strong>Pest & Disease Management</strong>
              </div>

              <div class="symptom-alert-box">
                <span class="symptom-lbl">⚠️ Symptoms to Watch Out For:</span>
                <p class="symptom-text">${activeStage.pestsDiseases.symptoms}</p>
              </div>

              <div class="dosage-badge-box" style="border-left-color: var(--alert-red);">
                <span class="badge-title">Prescribed Remedy & Dosage:</span>
                <p class="dosage-text">${activeStage.pestsDiseases.remedy}</p>
              </div>

              <div class="app-rule-box">
                <strong>When & How to Apply:</strong>
                <p>${activeStage.pestsDiseases.applicationRule}</p>
              </div>

              <div class="precaution-box">
                <strong>Safety Precautions:</strong>
                <p>${activeStage.pestsDiseases.precaution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setCareStage(idx) {
    this.selectedCareStageIndex = idx;
    this.renderCropCare();
  }
}

if (typeof window !== "undefined") {
  window.CropIntelligenceComponent = CropIntelligenceComponent;
}
