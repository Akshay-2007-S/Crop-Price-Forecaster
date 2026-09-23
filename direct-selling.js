/**
 * AGRISENSE - Local Crop Seller & Direct Selling Marketplace
 * Allows farmers to publish their harvest lots with asking price and connect directly with verified buyers
 */

class DirectSellingComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.listings = [...CFP_DATA.directListings];
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="direct-selling-wrapper">
        <div class="direct-header-bar">
          <div>
            <span class="badge badge-emerald"><span class="pulse-dot"></span> DIRECT FARM-GATE COMMERCE</span>
            <h3 class="card-title">Local Crop Seller Marketplace</h3>
            <p class="card-subtitle">Zero middleman fees. Farmers set their own asking price; retail buyers and institutional traders contact you directly.</p>
          </div>
          <div class="direct-actions">
            <button class="btn btn-primary" id="btnOpenListCropModal">
              ➕ Sell My Crop (List Harvest)
            </button>
          </div>
        </div>

        <div class="direct-selling-grid">
          ${this.listings.map(item => `
            <div class="listing-item-card glass-card">
              <div class="listing-top">
                <div class="farmer-avatar-block">
                  <div class="avatar-circle">${item.farmerName.charAt(0)}</div>
                  <div>
                    <h4 class="farmer-title">
                      ${item.farmerName} 
                      ${item.verifiedFarmer ? '<span class="verified-tag">✓ Verified Grower</span>' : ''}
                    </h4>
                    <span class="farmer-loc">📍 ${item.location} • ${item.postedTime}</span>
                  </div>
                </div>

                <div class="asking-price-box">
                  <span class="p-lbl">Farmer Asking Price</span>
                  <div class="p-num text-emerald">₹${item.askingPrice}<span class="unit">/kg</span></div>
                  <span class="mandi-bench">Mandi benchmark: ₹${item.mandiBenchmark}/kg</span>
                </div>
              </div>

              <div class="listing-crop-meta">
                <div class="meta-tag-pill">🌱 <strong>${item.crop}</strong> (${item.variety})</div>
                <div class="meta-tag-pill">📦 Available: <strong>${item.availableQty}</strong></div>
                <div class="meta-tag-pill">🚜 Land: <strong>${item.landArea}</strong></div>
              </div>

              <div class="harvest-ready-badge">
                <span class="icon">📅</span>
                <span><strong>Harvest Readiness:</strong> ${item.harvestDate}</span>
              </div>

              <p class="listing-desc">${item.description}</p>

              <div class="listing-footer">
                <div class="contact-number-tag">
                  <span class="icon">📞</span>
                  <span>${item.farmerPhone}</span>
                </div>
                <div class="contact-buttons-group">
                  <button class="btn btn-outline-cyan btn-xs" onclick="CFP_APP.directSellingComponent.handleContactFarmer('${item.farmerName}', '${item.farmerPhone}', '${item.crop}')">
                    📱 Contact via WhatsApp
                  </button>
                  <button class="btn btn-primary btn-xs" onclick="CFP_APP.directSellingComponent.handleDirectCall('${item.farmerName}', '${item.farmerPhone}')">
                    📞 Direct Call
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btnOpen = document.getElementById("btnOpenListCropModal");
    const modal = document.getElementById("listCropModal");
    const modalClose = document.getElementById("closeListCropModal");
    const form = document.getElementById("listCropForm");

    if (btnOpen && modal) {
      btnOpen.addEventListener("click", () => modal.classList.add("active"));
    }
    if (modalClose && modal) {
      modalClose.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  }

  handleFormSubmit() {
    const nameInp = document.getElementById("lcName");
    const phoneInp = document.getElementById("lcPhone");
    const locInp = document.getElementById("lcLocation");
    const cropSel = document.getElementById("lcCrop");
    const varietyInp = document.getElementById("lcVariety");
    const landInp = document.getElementById("lcLandArea");
    const qtyInp = document.getElementById("lcQuantity");
    const dateInp = document.getElementById("lcHarvestDate");
    const priceInp = document.getElementById("lcAskingPrice");
    const descInp = document.getElementById("lcDescription");

    const newListing = {
      id: "lst-" + Date.now(),
      farmerName: nameInp.value.trim() || "Local Producer",
      farmerPhone: phoneInp.value.trim() || "+91 98400 12345",
      location: locInp.value.trim() || "Kolar, Karnataka",
      crop: cropSel.value,
      variety: varietyInp.value.trim() || "Commercial Lot",
      landArea: `${landInp.value.trim() || '2'} Acres`,
      availableQty: qtyInp.value.trim() || "5 Tonnes",
      harvestDate: dateInp.value.trim() || "Ready in 4 days",
      askingPrice: parseFloat(priceInp.value) || 35,
      unit: "₹/kg",
      mandiBenchmark: 35,
      description: descInp.value.trim() || "Fresh harvest lot directly from farm gate.",
      verifiedFarmer: true,
      postedTime: "Just now"
    };

    this.listings.unshift(newListing);
    this.render();

    const modal = document.getElementById("listCropModal");
    if (modal) modal.classList.remove("active");

    if (window.CFP_APP && window.CFP_APP.showToast) {
      window.CFP_APP.showToast(
        "Listing Published to Buyers!",
        `Your ${newListing.crop} harvest lot has been posted to our network of 1,450+ verified traders.`,
        "success"
      );
    }

    document.getElementById("listCropForm").reset();
  }

  handleContactFarmer(farmerName, phone, crop) {
    if (window.CFP_APP && window.CFP_APP.showToast) {
      window.CFP_APP.showToast(
        `Connecting to ${farmerName}`,
        `Simulating secure WhatsApp negotiation channel for ${crop}. Direct line: ${phone}`,
        "info"
      );
    }
  }

  handleDirectCall(farmerName, phone) {
    if (window.CFP_APP && window.CFP_APP.showToast) {
      window.CFP_APP.showToast(
        `Calling ${farmerName}`,
        `Dialing ${phone} via rural telecom gateway. Zero broker deductions.`,
        "success"
      );
    }
  }
}

if (typeof window !== "undefined") {
  window.DirectSellingComponent = DirectSellingComponent;
}
