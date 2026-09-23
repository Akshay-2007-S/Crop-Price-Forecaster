/**
 * CROP PRICE FORECASTER - Automated 2-Minute Hackathon Demo Tour
 * Guides hackathon evaluators seamlessly through the exact 12 steps
 */

class DemoTourComponent {
  constructor() {
    this.steps = CFP_DATA.hackathonDemoSteps;
    this.currentStepIdx = 0;
    this.isActive = false;
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
  }

  init() {
    this.createTourWidget();
    this.bindEvents();
  }

  createTourWidget() {
    let widget = document.getElementById("demoTourWidget");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "demoTourWidget";
      widget.className = "demo-tour-widget";
      document.body.appendChild(widget);
    }
  }

  start() {
    this.isActive = true;
    this.currentStepIdx = 0;
    this.renderStep(this.currentStepIdx);
  }

  stop() {
    this.isActive = false;
    this.clearAutoPlay();
    const widget = document.getElementById("demoTourWidget");
    if (widget) widget.classList.remove("active");
    this.clearHighlights();
  }

  renderStep(idx) {
    const step = this.steps[idx];
    if (!step) return;

    const widget = document.getElementById("demoTourWidget");
    if (!widget) return;

    widget.classList.add("active");
    widget.innerHTML = `
      <div class="tour-card glass-card">
        <div class="tour-top-bar">
          <div class="tour-badge"><span class="pulse-dot"></span> HACKATHON EVALUATION MODE</div>
          <button class="tour-close-btn" id="tourCloseBtn" title="Exit Tour">✕</button>
        </div>

        <div class="tour-step-info">
          <span class="tour-step-counter">STEP ${idx + 1} OF ${this.steps.length}</span>
          <h4 class="tour-step-title">${step.title}</h4>
          <p class="tour-step-desc">${step.description}</p>
        </div>

        <div class="tour-progress-bar">
          <div class="tour-progress-fill" style="width: ${((idx + 1) / this.steps.length) * 100}%"></div>
        </div>

        <div class="tour-controls-row">
          <button class="btn btn-outline-cyan btn-xs" id="tourPrevBtn" ${idx === 0 ? 'disabled' : ''}>
            ← Previous
          </button>

          <button class="btn btn-ghost btn-xs text-cyan" id="tourAutoPlayBtn">
            ${this.isAutoPlaying ? '⏸ Pause Tour' : '▶ Auto-Play'}
          </button>

          <button class="btn btn-primary btn-xs" id="tourNextBtn">
            ${idx === this.steps.length - 1 ? 'Finish Tour ✓' : 'Next Step →'}
          </button>
        </div>
      </div>
    `;

    // Execute state changes for this step
    this.executeStepActions(step);

    // Rebind tour controls
    document.getElementById("tourCloseBtn").addEventListener("click", () => this.stop());
    document.getElementById("tourPrevBtn").addEventListener("click", () => this.prevStep());
    document.getElementById("tourNextBtn").addEventListener("click", () => this.nextStep());
    document.getElementById("tourAutoPlayBtn").addEventListener("click", () => this.toggleAutoPlay());
  }

  executeStepActions(step) {
    this.clearHighlights();

    // 1. Switch Tab if needed
    if (step.targetTab && window.CFP_APP) {
      window.CFP_APP.switchTab(step.targetTab);
    }

    // 2. Adjust forecast filters if specified
    if (step.crop && step.state && window.CFP_APP) {
      window.CFP_APP.setForecastSelection(step.crop, step.state, step.horizon || 7);
    }

    // 3. Highlight target element
    if (step.highlightSelector) {
      setTimeout(() => {
        const el = document.querySelector(step.highlightSelector);
        if (el) {
          el.classList.add("tour-highlight-pulse");
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }

    // Special step triggers:
    if (step.step === 11) {
      // Trigger a live alert demonstration
      setTimeout(() => {
        if (window.CFP_APP && window.CFP_APP.alertsComponent) {
          window.CFP_APP.alertsComponent.triggerLiveDemoAlert();
        }
      }, 400);
    }
  }

  clearHighlights() {
    document.querySelectorAll(".tour-highlight-pulse").forEach(el => {
      el.classList.remove("tour-highlight-pulse");
    });
  }

  nextStep() {
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      this.renderStep(this.currentStepIdx);
    } else {
      this.stop();
      if (window.CFP_APP && window.CFP_APP.showToast) {
        window.CFP_APP.showToast(
          "Hackathon Walkthrough Complete! 🎉",
          "You've seen the full end-to-end loop: Forecast, India Market, Community, Local Shops, and Smart Alerts.",
          "success",
          6000
        );
      }
    }
  }

  prevStep() {
    if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      this.renderStep(this.currentStepIdx);
    }
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.clearAutoPlay();
      this.renderStep(this.currentStepIdx);
    } else {
      this.isAutoPlaying = true;
      this.renderStep(this.currentStepIdx);
      this.scheduleAutoPlay();
    }
  }

  scheduleAutoPlay() {
    this.clearAutoPlay();
    this.autoPlayTimer = setTimeout(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.nextStep();
        if (this.isAutoPlaying) this.scheduleAutoPlay();
      } else {
        this.stop();
      }
    }, 6000);
  }

  clearAutoPlay() {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    this.isAutoPlaying = false;
  }

  bindEvents() {
    const triggerButtons = document.querySelectorAll(".btn-launch-demo-tour");
    triggerButtons.forEach(btn => {
      btn.addEventListener("click", () => this.start());
    });
  }
}

if (typeof window !== "undefined") {
  window.DemoTourComponent = DemoTourComponent;
}
