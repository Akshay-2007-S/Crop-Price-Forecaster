/**
 * CROP PRICE FORECASTER - Farmer & Market Community Hub
 * Handles aggregated crowdsourced signals, live farmer/trader feed, and real-time report submission
 */

class CommunityComponent {
  constructor(signalsContainerId, feedContainerId) {
    this.signalsContainer = document.getElementById(signalsContainerId);
    this.feedContainer = document.getElementById(feedContainerId);
    this.posts = [...CFP_DATA.communityPosts];
  }

  init() {
    this.renderSignals();
    this.renderFeed();
    this.bindEvents();
  }

  bindEvents() {
    // "Share Market Update" Button
    const btnShare = document.getElementById("btnShareUpdate");
    const modal = document.getElementById("shareUpdateModal");
    const modalClose = document.getElementById("modalCloseBtn");
    const modalCancel = document.getElementById("modalCancelBtn");
    const form = document.getElementById("shareUpdateForm");

    if (btnShare && modal) {
      btnShare.addEventListener("click", () => {
        modal.classList.add("active");
      });
    }

    if (modalClose && modal) {
      modalClose.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (modalCancel && modal) {
      modalCancel.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleNewPostSubmit();
      });
    }
  }

  renderSignals() {
    if (!this.signalsContainer) return;

    this.signalsContainer.innerHTML = `
      <div class="community-signals-card glass-card">
        <div class="signals-header">
          <div class="signals-title-group">
            <span class="badge badge-purple"><span class="pulse-dot"></span> CROWDSOURCED GROUND TRUTH</span>
            <h3 class="card-title">Aggregated Community Signals</h3>
            <p class="card-subtitle">Real-time sentiment aggregated from 12,000+ verified Indian growers and mandi traders</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btnShareUpdate">
            <i>➕</i> Share Market Update
          </button>
        </div>

        <div class="signals-grid">
          ${CFP_DATA.communitySignals.map(sig => {
            const trendIcon = sig.trend === 'up' ? '↑' : (sig.trend === 'down' ? '↓' : '→');
            const trendClass = sig.trend === 'up' ? 'text-emerald' : (sig.trend === 'down' ? 'text-amber' : 'text-cyan');
            const barWidth = sig.pct;

            return `
              <div class="signal-item-box">
                <div class="sig-crop-row">
                  <div class="sig-crop-info">
                    <span class="sig-icon">${sig.icon}</span>
                    <span class="sig-name">${sig.crop}</span>
                  </div>
                  <div class="sig-trend-badge ${trendClass}">
                    <span>${trendIcon} ${sig.tag}</span>
                  </div>
                </div>

                <div class="sig-progress-wrap">
                  <div class="sig-progress-bar">
                    <div class="sig-progress-fill fill-${sig.sentimentColor}" style="width: ${barWidth}%"></div>
                  </div>
                </div>

                <div class="sig-footer-meta">
                  <span class="sig-pct-text">${sig.statusText}</span>
                  <span class="sig-consensus-tag">Consensus: ${sig.pct}%</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Re-bind share button in case it was re-rendered
    const btnShare = document.getElementById("btnShareUpdate");
    const modal = document.getElementById("shareUpdateModal");
    if (btnShare && modal) {
      btnShare.addEventListener("click", () => modal.classList.add("active"));
    }
  }

  renderFeed() {
    if (!this.feedContainer) return;

    this.feedContainer.innerHTML = `
      <div class="feed-header-row">
        <h4 class="feed-title">🌾 Live Field & Mandi Dispatches</h4>
        <div class="feed-filter-tags">
          <span class="feed-tag active">All Updates</span>
          <span class="feed-tag">Verified Farmers</span>
          <span class="feed-tag">Mandi Traders</span>
          <span class="feed-tag">Agri Officers</span>
        </div>
      </div>

      <div class="feed-cards-stream">
        ${this.posts.map(p => this.createPostCardHTML(p)).join('')}
      </div>
    `;

    this.bindUpvoteEvents();
  }

  createPostCardHTML(p) {
    const sentimentBadgeClass = p.sentiment === "Rising" 
      ? "badge-rise" 
      : (p.sentiment === "Softening" ? "badge-drop" : "badge-stable");
    const sentimentIcon = p.sentiment === "Rising" ? "↑" : (p.sentiment === "Softening" ? "↓" : "→");

    return `
      <div class="feed-post-card glass-card" id="post-${p.id}">
        <div class="post-top">
          <div class="post-author-block">
            <div class="author-avatar">${p.author.charAt(0)}</div>
            <div class="author-details">
              <div class="author-name">
                ${p.author}
                ${p.verified ? '<span class="verified-badge" title="Verified Producer/Trader">✓ Verified</span>' : ''}
              </div>
              <div class="author-meta">${p.role} • 📍 ${p.location}</div>
            </div>
          </div>
          <div class="post-badges">
            <span class="badge ${sentimentBadgeClass}">
              ${sentimentIcon} ${p.sentiment}
            </span>
            <span class="post-time">${p.time}</span>
          </div>
        </div>

        <div class="post-content">
          <span class="post-crop-tag">${p.cropIcon} ${p.crop}</span>
          <p class="post-text">${p.text}</p>
        </div>

        <div class="post-actions-bar">
          <button class="upvote-btn" data-id="${p.id}" onclick="CFP_APP.communityComponent.handleUpvote('${p.id}')">
            <i>👍</i> Helpful (<span class="upvote-count">${p.upvotes}</span>)
          </button>
          <span class="verified-source-note">Validated by 3 Nearby APMC Agents</span>
        </div>
      </div>
    `;
  }

  bindUpvoteEvents() {
    // Already handled via inline onclick
  }

  handleUpvote(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.upvotes += 1;
      const el = document.querySelector(`#post-${postId} .upvote-count`);
      if (el) el.innerText = post.upvotes;
      const btn = document.querySelector(`#post-${postId} .upvote-btn`);
      if (btn) btn.classList.add("upvoted");
      this.playChime(640);
    }
  }

  handleNewPostSubmit() {
    const cropSelect = document.getElementById("newPostCrop");
    const roleSelect = document.getElementById("newPostRole");
    const authorInput = document.getElementById("newPostAuthor");
    const locationInput = document.getElementById("newPostLocation");
    const sentimentSelect = document.getElementById("newPostSentiment");
    const textInput = document.getElementById("newPostText");

    const cropObj = CFP_DATA.crops.find(c => c.id === cropSelect.value) || CFP_DATA.crops[0];

    const newPost = {
      id: "post-" + Date.now(),
      author: authorInput.value.trim() || "Local Producer",
      role: roleSelect.value,
      location: locationInput.value.trim() || "Kolar, Karnataka",
      crop: cropObj.name,
      cropIcon: cropObj.icon,
      time: "Just now",
      text: textInput.value.trim() || "Local market prices are steady. Good volume trading today.",
      sentiment: sentimentSelect.value,
      upvotes: 1,
      verified: true
    };

    this.posts.unshift(newPost);
    this.renderFeed();

    // Close modal
    const modal = document.getElementById("shareUpdateModal");
    if (modal) modal.classList.remove("active");

    // Play pleasant confirmation audio chime
    this.playChime(880);

    // Show toast
    if (window.CFP_APP && window.CFP_APP.showToast) {
      window.CFP_APP.showToast(
        "Update Shared with Community!",
        `Your dispatch on ${cropObj.name} has been published to 12,000+ growers.`,
        "success"
      );
    }

    // Reset form
    document.getElementById("shareUpdateForm").reset();
  }

  playChime(freq = 440) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy
    }
  }
}

if (typeof window !== "undefined") {
  window.CommunityComponent = CommunityComponent;
}
