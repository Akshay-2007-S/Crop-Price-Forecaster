/**
 * CROP PRICE FORECASTER - High-Fidelity Canvas Charting Engine
 * Custom zero-dependency 60fps canvas renderer with uncertainty bands & neon glows
 */

class ForecastChartEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.seriesData = null;
    this.hoverIndex = -1;
    this.animationProgress = 1;
    this.animating = false;

    this.setupDPI();
    this.bindEvents();
  }

  setupDPI() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.setupDPI();
      if (this.seriesData) this.draw();
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.handleHover(mouseX);
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.hoverIndex = -1;
      this.hideTooltip();
      this.draw();
    });
  }

  updateData(seriesData) {
    this.seriesData = seriesData;
    this.animate();
  }

  animate() {
    this.animationProgress = 0;
    this.animating = true;
    const start = performance.now();
    const duration = 600;

    const step = (now) => {
      const elapsed = now - start;
      this.animationProgress = Math.min(1, elapsed / duration);
      // Ease out cubic
      this.animationProgress = 1 - Math.pow(1 - this.animationProgress, 3);
      this.draw();

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        this.animating = false;
        this.animationProgress = 1;
        this.draw();
      }
    };
    requestAnimationFrame(step);
  }

  handleHover(mouseX) {
    if (!this.seriesData) return;
    const padL = 55;
    const padR = 30;
    const chartW = this.width - padL - padR;
    const totalPoints = this.seriesData.labels.length;
    const stepX = chartW / (totalPoints - 1);

    const idx = Math.round((mouseX - padL) / stepX);
    if (idx >= 0 && idx < totalPoints) {
      if (this.hoverIndex !== idx) {
        this.hoverIndex = idx;
        this.draw();
        this.showTooltip(idx);
      }
    } else {
      this.hoverIndex = -1;
      this.hideTooltip();
      this.draw();
    }
  }

  showTooltip(idx) {
    let tooltip = document.getElementById("forecastChartTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "forecastChartTooltip";
      tooltip.className = "forecast-chart-tooltip";
      document.body.appendChild(tooltip);
    }

    const label = this.seriesData.labels[idx];
    const isForecast = idx >= 14;
    const histVal = this.seriesData.historical[idx];
    const foreVal = this.seriesData.forecast[idx];
    const upper = this.seriesData.upperBand[idx];
    const lower = this.seriesData.lowerBand[idx];

    let content = `
      <div class="tip-date">${label} ${idx === 14 ? '<span class="tip-today">TODAY</span>' : ''}</div>
    `;

    if (histVal !== null && histVal !== undefined) {
      content += `
        <div class="tip-row">
          <span class="tip-indicator dot-hist"></span>
          <span>Mandi Traded Price:</span>
          <strong>₹${histVal.toFixed(1)}/kg</strong>
        </div>
      `;
    }

    if (isForecast && foreVal !== null) {
      content += `
        <div class="tip-row">
          <span class="tip-indicator dot-fore"></span>
          <span>AI Forecast Price:</span>
          <strong class="text-emerald">₹${foreVal.toFixed(1)}/kg</strong>
        </div>
        <div class="tip-row text-xs text-muted">
          <span>Uncertainty Range:</span>
          <span class="text-cyan">₹${lower.toFixed(1)} – ₹${upper.toFixed(1)}/kg</span>
        </div>
      `;
    }

    tooltip.innerHTML = content;

    const padL = 55;
    const padR = 30;
    const chartW = this.width - padL - padR;
    const totalPoints = this.seriesData.labels.length;
    const stepX = chartW / (totalPoints - 1);

    const rect = this.canvas.getBoundingClientRect();
    const px = rect.left + padL + idx * stepX;
    const py = rect.top + 30;

    tooltip.style.left = `${px}px`;
    tooltip.style.top = `${py}px`;
    tooltip.style.display = "block";
  }

  hideTooltip() {
    const tooltip = document.getElementById("forecastChartTooltip");
    if (tooltip) tooltip.style.display = "none";
  }

  draw() {
    if (!this.seriesData || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    const padL = 55;
    const padR = 30;
    const padT = 35;
    const padB = 40;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Find min and max price across all data
    let allValues = [];
    this.seriesData.historical.forEach(v => { if (v !== null) allValues.push(v); });
    this.seriesData.forecast.forEach(v => { if (v !== null) allValues.push(v); });
    this.seriesData.upperBand.forEach(v => { if (v !== null) allValues.push(v); });
    this.seriesData.lowerBand.forEach(v => { if (v !== null) allValues.push(v); });

    let minVal = Math.floor(Math.min(...allValues) - 2);
    let maxVal = Math.ceil(Math.max(...allValues) + 2);
    if (minVal < 0) minVal = 0;
    if (maxVal - minVal < 6) maxVal = minVal + 6;

    const valToY = (val) => {
      const norm = (val - minVal) / (maxVal - minVal);
      return padT + chartH - (norm * chartH);
    };

    const totalPoints = this.seriesData.labels.length;
    const stepX = chartW / (totalPoints - 1);
    const idxToX = (idx) => padL + idx * stepX;

    // Draw horizontal grid lines & Y labels
    const ySteps = 5;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
    ctx.fillStyle = "#64748b";
    ctx.font = "11px 'Plus Jakarta Sans', Inter, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= ySteps; i++) {
      const val = minVal + ((maxVal - minVal) / ySteps) * i;
      const y = valToY(val);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(`₹${val.toFixed(0)}`, padL - 8, y + 4);
    }

    // Today separator line (at index 14)
    const todayX = idxToX(14);
    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(todayX, padT - 10);
    ctx.lineTo(todayX, h - padB);
    ctx.stroke();

    // "TODAY" Badge on chart
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("TODAY", todayX, padT - 15);
    ctx.restore();

    // Draw Uncertainty Band (Filled polygon between upper and lower bands)
    if (this.seriesData.forecast.length > 14) {
      ctx.save();
      ctx.beginPath();
      let first = true;
      // Upper band from index 14 to end
      for (let i = 14; i < totalPoints; i++) {
        const x = idxToX(i);
        const y = valToY(this.seriesData.upperBand[i]);
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      // Lower band back to index 14
      for (let i = totalPoints - 1; i >= 14; i--) {
        const x = idxToX(i);
        const y = valToY(this.seriesData.lowerBand[i]);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      const gradBand = ctx.createLinearGradient(todayX, 0, w - padR, 0);
      gradBand.addColorStop(0, "rgba(16, 185, 129, 0.1)");
      gradBand.addColorStop(1, "rgba(16, 185, 129, 0.25)");
      ctx.fillStyle = gradBand;
      ctx.fill();

      // Band border edges
      ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // Draw Historical Line (Blue)
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= 14; i++) {
      const val = this.seriesData.historical[i];
      const x = idxToX(i);
      const y = valToY(val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();

    // Draw Historical Points
    ctx.save();
    for (let i = 0; i <= 14; i += 2) {
      const val = this.seriesData.historical[i];
      const x = idxToX(i);
      const y = valToY(val);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#0c4a6e";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();

    // Draw Forecast Line (Emerald Neon)
    ctx.save();
    ctx.beginPath();
    const animLimit = 14 + (totalPoints - 14) * this.animationProgress;
    for (let i = 14; i < totalPoints; i++) {
      if (i > animLimit) break;
      const val = this.seriesData.forecast[i];
      const x = idxToX(i);
      const y = valToY(val);
      if (i === 14) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 4]);
    ctx.shadowColor = "rgba(16, 185, 129, 0.7)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    // Forecast Points
    ctx.save();
    for (let i = 14; i < totalPoints; i++) {
      if (i > animLimit) break;
      const val = this.seriesData.forecast[i];
      const x = idxToX(i);
      const y = valToY(val);
      ctx.beginPath();
      ctx.arc(x, y, i === totalPoints - 1 ? 5.5 : 4, 0, Math.PI * 2);
      ctx.fillStyle = i === totalPoints - 1 ? "#10b981" : "#064e3b";
      ctx.fill();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Show terminal projected price tag on the last point
      if (i === totalPoints - 1 && this.animationProgress > 0.8) {
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`₹${val.toFixed(1)}/kg`, x + 8, y + 4);
      }
    }
    ctx.restore();

    // Draw X-axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    const labelInterval = totalPoints > 25 ? 4 : 2;
    for (let i = 0; i < totalPoints; i += labelInterval) {
      const x = idxToX(i);
      ctx.fillText(this.seriesData.labels[i], x, h - padB + 18);
    }
    // Always render last label
    ctx.fillText(this.seriesData.labels[totalPoints - 1], idxToX(totalPoints - 1), h - padB + 18);

    // Hover Crosshair
    if (this.hoverIndex >= 0 && this.hoverIndex < totalPoints) {
      const hx = idxToX(this.hoverIndex);
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(hx, padT);
      ctx.lineTo(hx, h - padB);
      ctx.stroke();

      const activeVal = this.hoverIndex <= 14 ? this.seriesData.historical[this.hoverIndex] : this.seriesData.forecast[this.hoverIndex];
      if (activeVal !== null) {
        const hy = valToY(activeVal);
        ctx.beginPath();
        ctx.arc(hx, hy, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      ctx.restore();
    }
  }
}

if (typeof window !== "undefined") {
  window.ForecastChartEngine = ForecastChartEngine;
}
