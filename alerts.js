/**
 * CROP PRICE FORECASTER - Smart Alerts Component
 * Manages real-time agricultural advisories, custom crop/location preferences, and live broadcast simulator
 */

class SmartAlertsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedCrops = ["tomato", "onion", "chilli"];
    this.location = "Hosur";
    this.alerts = [...CFP_DATA.alerts];
    this.channels = { sms: true, whatsapp: true, webPush: true };
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="smart-alerts-wrapper">
        <div class="alerts-intro-banner">
          <div class="intro-left">
            <span class="badge badge-amber"><span class="pulse-dot"></span> EARLY WARNING SYSTEM</span>
            <h3 class="card-title">Agricultural Volatility & Opportunity Alerts</h3>
            <p class="card-subtitle">AI monitors 500+ mandis and IMD weather radar 24/7 to warn you before market conditions change.</p>
          </div>
          <div class="intro-actions">
            <button class="btn btn-warning" id="btnTriggerDemoAlert">
              ⚡ Trigger Live Demo Alert
            </button>
          </div>
        </div>

        <div class="alerts-layout-grid">
          <!-- Left Column: Preference Selector -->
          <div class="alert-prefs-card glass-card">
            <h4 class="prefs-title">Configure Your Alert Profile</h4>
            <p class="prefs-desc">Select the crops and mandi radius you want personalized intelligence for:</p>

            <div class="pref-section">
              <label class="pref-label">My Tracked Crops:</label>
              <div class="crop-checkbox-grid">
                ${CFP_DATA.crops.map(c => `
                  <label class="crop-check-item ${this.selectedCrops.includes(c.id) ? 'checked' : ''}">
                    <input type="checkbox" name="alertCrop" value="${c.id}" ${this.selectedCrops.includes(c.id) ? 'checked' : ''} />
                    <span class="check-box-custom"></span>
                    <span class="crop-check-icon">${c.icon}</span>
                    <span class="crop-check-name">${c.name}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="pref-section">
              <label class="pref-label" for="alertLocationInput">My Primary Market / Location:</label>
              <div class="input-with-icon">
                <span class="input-icon">📍</span>
                <input type="text" id="alertLocationInput" class="form-control" value="${this.location}" placeholder="e.g. Hosur, Kolar, Pune" />
              </div>
            </div>

            <div class="pref-section">
              <label class="pref-label">Delivery Channels:</label>
              <div class="channel-toggles">
                <label class="channel-toggle-item">
                  <input type="checkbox" id="chkWhatsApp" checked />
                  <span class="toggle-track"></span>
                  <span class="channel-name">📱 WhatsApp Advisory</span>
                </label>
                <label class="channel-toggle-item">
                  <input type="checkbox" id="chkSMS" checked />
                  <span class="toggle-track"></span>
                  <span class="channel-name">📩 Rural SMS (No Internet)</span>
                </label>
                <label class="channel-toggle-item">
                  <input type="checkbox" id="chkPush" checked />
                  <span class="toggle-track"></span>
                  <span class="channel-name">🔔 Browser Push</span>
                </label>
              </div>
            </div>

            <div class="prefs-buttons-row">
              <button type="button" class="btn btn-primary btn-block" id="btnSavePreferences">
                ✓ Save Crop & Location Profile
              </button>
            </div>
          </div>

          <!-- Right Column: Active Feed of Smart Alerts -->
          <div class="active-alerts-card glass-card">
            <div class="alerts-feed-header">
              <h4 class="feed-title">Active Volatility Signals for Your Profile</h4>
              <span class="alerts-count-badge">${this.alerts.length} Active Warnings</span>
            </div>

            <div class="alerts-card-list">
              ${this.alerts.map(a => this.createAlertCardHTML(a)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  createAlertCardHTML(a) {
    const borderClass = a.priority === "high" ? "alert-high" : (a.priority === "medium" ? "alert-medium" : "alert-normal");
    const badgeColorClass = a.type === "price_rise" ? "badge-rise" : (a.type === "weather" ? "badge-drop" : (a.type === "arbitrage" ? "badge-emerald" : "badge-cyan"));

    return `
      <div class="alert-item-card ${borderClass}" id="${a.id}">
        <div class="alert-card-top">
          <div class="alert-badge-group">
            <span class="badge ${badgeColorClass}">
              🔔 ${a.badge}
            </span>
            <span class="alert-crop-tag">${a.cropIcon} ${a.crop}</span>
          </div>
          <span class="alert-time text-muted">${a.timestamp}</span>
        </div>

        <h5 class="alert-headline">${a.title}</h5>
        <div class="alert-region"><i class="icon">📍</i> ${a.region}</div>
        <p class="alert-desc">${a.desc}</p>

        <div class="alert-footer-actions">
          <button class="btn btn-outline-cyan btn-xs" onclick="CFP_APP.handleAlertAction('${a.type}')">
            ${a.actionText} →
          </button>
          <button class="btn btn-ghost btn-xs text-muted" onclick="CFP_APP.dismissAlert('${a.id}')">
            Dismiss
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const btnSave = document.getElementById("btnSavePreferences");
    const btnTrigger = document.getElementById("btnTriggerDemoAlert");
    const checkBoxes = document.querySelectorAll("input[name='alertCrop']");
    const locInput = document.getElementById("alertLocationInput");

    checkBoxes.forEach(cb => {
      cb.addEventListener("change", (e) => {
        const parent = cb.closest(".crop-check-item");
        if (cb.checked) {
          parent.classList.add("checked");
          if (!this.selectedCrops.includes(cb.value)) this.selectedCrops.push(cb.value);
        } else {
          parent.classList.remove("checked");
          this.selectedCrops = this.selectedCrops.filter(id => id !== cb.value);
        }
      });
    });

    if (btnSave) {
      btnSave.addEventListener("click", () => {
        this.location = locInput.value.trim() || "Hosur";
        this.playBeep(520);
        if (window.CFP_APP && window.CFP_APP.showToast) {
          window.CFP_APP.showToast(
            "Alert Profile Saved!",
            `Notifications active for ${this.selectedCrops.length} crops in ${this.location} radius.`,
            "success"
          );
        }
      });
    }

    if (btnTrigger) {
      btnTrigger.addEventListener("click", () => {
        this.triggerLiveDemoAlert();
      });
    }
  }

  triggerLiveDemoAlert() {
    const demoAlert = {
      id: "live-alt-" + Date.now(),
      type: "price_rise",
      badge: "URGENT PRICE SURGE ALERT",
      crop: "Tomato (Kolar APMC)",
      cropIcon: "🍅",
      title: "Sudden +14% Price Spike Detected at Kolar & Madanapalle",
      region: "South Corridor (Kolar, Hosur, Bengaluru)",
      desc: "Incoming harvest arrivals dipped 22% due to rain. Wholesale bidding jumped to ₹38/kg in morning session.",
      actionText: "Check Forecast & Hold Harvest",
      timestamp: "Just Now",
      priority: "high"
    };

    this.alerts.unshift(demoAlert);
    this.render();

    // Play attention siren / double beep
    this.playEmergencyBeep();

    // Trigger high-visibility toast banner
    if (window.CFP_APP && window.CFP_APP.showToast) {
      window.CFP_APP.showToast(
        "🚨 URGENT: Tomato Price Surge Alert",
        "Kolar APMC reports 22% drop in crate arrivals. Wholesale rates jumped to ₹38/kg! Consider holding today's harvest.",
        "warning",
        8000
      );
    }
  }

  playBeep(freq = 440) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {}
  }

  playEmergencyBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const playTone = (freq, start, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      const now = audioCtx.currentTime;
      playTone(660, now, 0.15);
      playTone(880, now + 0.18, 0.25);
    } catch (e) {}
  }
}

if (typeof window !== "undefined") {
  window.SmartAlertsComponent = SmartAlertsComponent;
}
