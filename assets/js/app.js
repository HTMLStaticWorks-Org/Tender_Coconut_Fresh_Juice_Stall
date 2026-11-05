/* ==========================================================================
   Tender Coconut & Fresh Juice Stall — Global Application Controller (app.js)
   Handles: Theme, Sticky Navbar, Dropdowns, Mobile Drawer, Search Modal,
   Wishlist Persistence & Drawer, Cart Persistence, Toast Notifications,
   Reusable Drink Cards, and Newsletter Subscription.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    CART: "cocoaura_cart_v1",
    WISHLIST: "cocoaura_wishlist_v1",
    THEME: "cocoaura_theme_v1",
    DISCOUNT: "cocoaura_discount_v1",
    DIRECTION: "cocoaura_dir_v1"
  };

  /* ------------------------------------------------------------------------
     1. THEME & DIRECTION initialization (Run immediately to prevent flash)
     ------------------------------------------------------------------------ */
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {}
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.innerHTML =
        theme === "dark"
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  }

  function getInitialDirection() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DIRECTION);
      if (saved === "rtl" || saved === "ltr") return saved;
    } catch (e) {}
    return "ltr";
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute("dir", dir);
    try {
      localStorage.setItem(STORAGE_KEYS.DIRECTION, dir);
    } catch (e) {}
    document.querySelectorAll("[data-rtl-toggle]").forEach((btn) => {
      btn.classList.toggle("is-active", dir === "rtl");
      btn.setAttribute("aria-pressed", dir === "rtl" ? "true" : "false");
      btn.setAttribute("title", dir === "rtl" ? "Switch to LTR Layout" : "Switch to RTL Layout");
      // strictly keep only the text RTL inside
      btn.textContent = "RTL";
    });
  }

  applyTheme(getInitialTheme());
  applyDirection(getInitialDirection());

  /* ------------------------------------------------------------------------
     2. DATA & STATE HELPERS
     ------------------------------------------------------------------------ */
  function getCatalog() {
    return (window.COCOAURA_DATA && window.COCOAURA_DATA.products) || [];
  }

  function getProductById(id) {
    return getCatalog().find((p) => p.id === id) || null;
  }

  function getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {}
    updateCartBadges();
    window.dispatchEvent(new CustomEvent("cocoaura:cart-updated", { detail: { cart } }));
  }

  function getWishlist() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }

  function saveWishlist(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    } catch (e) {}
    updateWishlistUI();
    window.dispatchEvent(new CustomEvent("cocoaura:wishlist-updated", { detail: { wishlist: list } }));
  }

  function getDiscountCode() {
    try {
      return localStorage.getItem(STORAGE_KEYS.DISCOUNT) || "";
    } catch (e) {
      return "";
    }
  }

  function setDiscountCode(code) {
    try {
      if (!code) localStorage.removeItem(STORAGE_KEYS.DISCOUNT);
      else localStorage.setItem(STORAGE_KEYS.DISCOUNT, code.toUpperCase().trim());
    } catch (e) {}
  }

  function formatMoney(amount) {
    return "$" + Number(amount || 0).toFixed(2);
  }

  /* ------------------------------------------------------------------------
     3. CART & WISHLIST ACTIONS
     ------------------------------------------------------------------------ */
  function addToCart(productId, sizeLabel, qty = 1, silent = false) {
    const product = getProductById(productId);
    if (!product) return false;

    const chosenSizeObj =
      (product.sizes && product.sizes.find((s) => s.label === sizeLabel)) ||
      (product.sizes && product.sizes.find((s) => s.label === product.defaultSize)) ||
      (product.sizes && product.sizes[0]) || { label: product.defaultSize || "Standard", price: product.price };

    const finalSize = chosenSizeObj.label;
    const unitPrice = Number(chosenSizeObj.price || product.price);
    const addQty = Math.max(1, parseInt(qty, 10) || 1);

    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.productId === productId && item.size === finalSize);

    if (existingIndex > -1) {
      cart[existingIndex].qty = Math.min(99, cart[existingIndex].qty + addQty);
      cart[existingIndex].price = unitPrice;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        size: finalSize,
        price: unitPrice,
        qty: addQty
      });
    }

    saveCart(cart);
    if (!silent) {
      showToast(`Added ${addQty} × ${product.name} (${finalSize}) to your cart.`);
    }
    return true;
  }

  function updateCartItemQty(productId, sizeLabel, newQty) {
    let cart = getCart();
    const idx = cart.findIndex((item) => item.productId === productId && item.size === sizeLabel);
    if (idx === -1) return;

    const parsed = parseInt(newQty, 10);
    if (isNaN(parsed) || parsed <= 0) {
      const removedName = cart[idx].name;
      cart.splice(idx, 1);
      saveCart(cart);
      showToast(`Removed ${removedName} from cart.`);
    } else {
      cart[idx].qty = Math.min(99, parsed);
      saveCart(cart);
    }
  }

  function removeCartItem(productId, sizeLabel) {
    updateCartItemQty(productId, sizeLabel, 0);
  }

  function calculateCartTotals() {
    const cart = getCart();
    const itemCount = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

    const code = getDiscountCode();
    let discountRate = 0;
    if (code === "FRESH10" || code === "COCOAURA10") discountRate = 0.10;
    else if (code === "STALL15" || code === "JUICE15" || code === "PURE15") discountRate = 0.15;
    else if (code === "COCONUT20" || code === "TROPICAL20") discountRate = 0.20;

    const discountAmount = subtotal * discountRate;
    const afterDiscount = Math.max(0, subtotal - discountAmount);
    const shipping = itemCount === 0 ? 0 : afterDiscount >= 60 ? 0 : 6.50;
    const total = afterDiscount + shipping;

    return {
      cart,
      itemCount,
      subtotal,
      discountCode: discountRate > 0 ? code : "",
      discountRate,
      discountAmount,
      shipping,
      total
    };
  }

  function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) {
      list.splice(idx, 1);
      saveWishlist(list);
      showToast(`Removed ${product.name} from Saved Items.`);
    } else {
      list.push(productId);
      saveWishlist(list);
      showToast(`Saved ${product.name} to your Wishlist.`);
    }
  }

  /* ------------------------------------------------------------------------
     4. UI UPDATERS (Badges, Wishlist Drawer, Toast)
     ------------------------------------------------------------------------ */
  function updateCartBadges() {
    const { itemCount } = calculateCartTotals();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(itemCount);
      el.style.display = itemCount > 0 ? "inline-flex" : "inline-flex";
    });
  }

  function updateWishlistUI() {
    const list = getWishlist();
    document.querySelectorAll("[data-wishlist-count]").forEach((el) => {
      el.textContent = String(list.length);
    });

    document.querySelectorAll("[data-wishlist-btn]").forEach((btn) => {
      const pid = btn.getAttribute("data-wishlist-btn");
      const active = list.includes(pid);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        active ? "Remove from wishlist" : "Add to wishlist"
      );
    });

    renderWishlistDrawerItems();
  }

  function showToast(message) {
    let container = document.getElementById("cocoaura-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "cocoaura-toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span style="color: var(--color-primary); display:inline-flex; flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span style="flex:1;">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  /* ------------------------------------------------------------------------
     5. REUSABLE PRODUCT CARD COMPONENT
     ------------------------------------------------------------------------ */
  function renderProductCard(product) {
    const wishlisted = getWishlist().includes(product.id);
    const allSizes = product.sizes ? product.sizes.map((s) => s.label).join(" · ") : product.defaultSize;

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-card-media">
          <a href="product-details.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
            <img src="${product.image}" alt="${product.name} — ${product.category}" loading="lazy" width="500" height="500">
          </a>
          <div class="product-card-badges">
            ${product.badge ? `<span class="badge badge-cream">${product.badge}</span>` : ""}
          </div>
          <button type="button" class="wishlist-btn ${wishlisted ? "is-active" : ""}" data-wishlist-btn="${product.id}" aria-label="${wishlisted ? "Remove from wishlist" : "Add to wishlist"}" aria-pressed="${wishlisted}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
        <div class="product-card-body">
          <div class="product-card-meta">
            <span>${product.category}</span>
            <span class="product-card-size" title="Available sizes: ${allSizes}">${product.defaultSize}</span>
          </div>
          <h3 class="product-card-title">
            <a href="product-details.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
          </h3>
          <p class="product-card-desc">${product.shortDesc}</p>
          <div class="product-card-footer">
            <div>
              <span class="product-price">${formatMoney(product.price)}</span>
              ${
                product.compareAtPrice
                  ? `<span class="product-price-compare">${formatMoney(product.compareAtPrice)}</span>`
                  : ""
              }
            </div>
            <div class="product-card-actions">
              <a href="product-details.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline btn-sm" aria-label="View details for ${product.name}">View</a>
              <button type="button" class="btn btn-primary btn-sm" data-quick-add="${product.id}" data-size="${product.defaultSize}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /* ------------------------------------------------------------------------
     6. GLOBAL SHELL (HEADER, SEARCH MODAL, WISHLIST DRAWER, FOOTER)
     ------------------------------------------------------------------------ */
  function getActivePageInfo() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const hash = window.location.hash || "";
    return { path, hash };
  }

  function injectGlobalShell() {
    const { path, hash } = getActivePageInfo();
    const isHome1 = path === "" || path === "index.html";
    const isHome2 = path === "home-2.html";
    const isHomeGroup = isHome1 || isHome2;
    const isShopGroup = path === "shop.html" || path === "product-details.html";
    const isStory = path === "our-story.html";
    const isSourcing = path === "sourcing.html";
    const isBlog = path === "blog.html";
    const isContact = path === "contact-bulk-enquiry.html";

    const headerMount = document.getElementById("site-header-mount");
    if (headerMount) {
      headerMount.innerHTML = `
        <header class="site-header" id="site-header">
          <div class="container navbar-container">
            <a href="index.html" class="brand-logo" aria-label="Tender Coconut Home">
              <span class="brand-logo-mark" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0 4.5 3.5 7.5 8 7.5s8-3 8-7.5c0-1.5-.5-3-1.5-4C17 7.5 14.5 7 12 7s-5 .5-6.5 3C4.5 11 4 12.5 4 14z"/><ellipse cx="12" cy="11" rx="6" ry="3"/><path d="M14 11l5-8"/><path d="M7 6c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-1.8-3-1.8-3-1.8 2-1.8 3z"/></svg>
              </span>
              <span>Tender Coconut</span>
            </a>

            <nav class="primary-nav" aria-label="Primary Navigation">
              <div class="nav-item has-dropdown">
                <a href="index.html" class="nav-link ${isHomeGroup ? "active" : ""}" aria-haspopup="true">
                  <span>Home</span>
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                </a>
                <div class="dropdown-menu" role="menu" aria-label="Home variations">
                  <a href="index.html" class="dropdown-link ${isHome1 ? "active" : ""}" role="menuitem">
                    <span>Home</span>
                    <span class="dropdown-meta">Tropical Flagship</span>
                  </a>
                  <a href="home-2.html" class="dropdown-link ${isHome2 ? "active" : ""}" role="menuitem">
                    <span>Home-2</span>
                    <span class="dropdown-meta">Editorial Atelier</span>
                  </a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a href="shop.html" class="nav-link ${isShopGroup ? "active" : ""}" aria-haspopup="true">
                  <span>Menu</span>
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                </a>
                <div class="dropdown-menu" role="menu" aria-label="Stall categories">
                  <a href="shop.html" class="dropdown-link" role="menuitem">
                    <span>All Drinks &amp; Coconuts</span>
                    <span class="dropdown-meta">10 Items</span>
                  </a>
                  <a href="shop.html?category=Tender+Coconuts" class="dropdown-link" role="menuitem">
                    <span>Tender Coconuts</span>
                    <span class="dropdown-meta">Live Cut</span>
                  </a>
                  <a href="shop.html?category=Cold-Pressed+Juices" class="dropdown-link" role="menuitem">
                    <span>Cold-Pressed Juices</span>
                    <span class="dropdown-meta">100% Pure</span>
                  </a>
                  <a href="shop.html?category=Malai+Shakes+%26+Smoothies" class="dropdown-link" role="menuitem">
                    <span>Malai Shakes &amp; Smoothies</span>
                    <span class="dropdown-meta">House Specialty</span>
                  </a>
                  <a href="shop.html?category=Coolers+%26+Detox" class="dropdown-link" role="menuitem">
                    <span>Coolers &amp; Detox</span>
                  </a>
                  <a href="shop.html?category=Bottled+Coconut+Water" class="dropdown-link" role="menuitem">
                    <span>Bottled Coconut Water</span>
                  </a>
                </div>
              </div>

              <div class="nav-item">
                <a href="our-story.html" class="nav-link ${isStory ? "active" : ""}">Our Story</a>
              </div>

              <div class="nav-item">
                <a href="sourcing.html" class="nav-link ${isSourcing ? "active" : ""}">Sourcing</a>
              </div>

              <div class="nav-item">
                <a href="blog.html" class="nav-link ${isBlog ? "active" : ""}">Blog</a>
              </div>

              <div class="nav-item">
                <a href="contact-bulk-enquiry.html" class="nav-link ${isContact ? "active" : ""}">Contact</a>
              </div>
            </nav>

            <div class="navbar-actions">
              <button type="button" class="icon-btn" data-open-search aria-label="Search drinks and coconuts" title="Search Menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>

              <button type="button" class="icon-btn" data-open-wishlist aria-label="Open saved items" title="Saved Favorites">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span class="count-badge" data-wishlist-count>0</span>
              </button>

              <a href="cart.html" class="icon-btn" aria-label="View stall cart" title="Stall Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span class="count-badge" data-cart-count>0</span>
              </a>

              <button type="button" class="icon-btn" data-rtl-toggle aria-label="Toggle RTL layout" title="Toggle RTL Layout">RTL</button>

              <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle color theme"></button>

              <a href="shop.html" class="btn btn-primary btn-sm nav-cta-btn">Order Fresh</a>

              <button type="button" class="icon-btn mobile-menu-toggle" data-open-mobile-menu aria-label="Open navigation menu" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </header>

        <!-- Mobile Navigation Drawer -->
        <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>
        <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile Navigation">
          <div class="mobile-drawer-header">
            <a href="index.html" class="brand-logo" aria-label="Tender Coconut Home">
              <span class="brand-logo-mark" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0 4.5 3.5 7.5 8 7.5s8-3 8-7.5c0-1.5-.5-3-1.5-4C17 7.5 14.5 7 12 7s-5 .5-6.5 3C4.5 11 4 12.5 4 14z"/><ellipse cx="12" cy="11" rx="6" ry="3"/><path d="M14 11l5-8"/><path d="M7 6c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-1.8-3-1.8-3-1.8 2-1.8 3z"/></svg>
              </span>
              <span>Tender Coconut</span>
            </a>
            <button type="button" class="icon-btn" data-close-mobile-menu aria-label="Close navigation menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Header Action Buttons moved inside menu page -->
          <div class="mobile-drawer-actions">
            <button type="button" class="icon-btn" data-open-search aria-label="Search drinks" title="Search Menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            <button type="button" class="icon-btn" data-open-wishlist aria-label="Open saved items" title="Saved Favorites">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span class="count-badge" data-wishlist-count>0</span>
            </button>

            <a href="cart.html" class="icon-btn" aria-label="View stall cart" title="Stall Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span class="count-badge" data-cart-count>0</span>
            </a>

            <button type="button" class="icon-btn" data-rtl-toggle aria-label="Toggle RTL layout" title="Toggle RTL Layout">RTL</button>

            <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle color theme" title="Switch Theme"></button>
          </div>

          <div class="mobile-drawer-body">
            <div class="mobile-nav-group">
              <button type="button" class="mobile-nav-trigger is-expanded" data-mobile-accordion="home-sub" aria-expanded="true">
                <span>Home</span>
                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="mobile-subnav is-open" id="home-sub">
                <a href="index.html" class="${isHome1 ? "active" : ""}">Home — Tropical Flagship</a>
                <a href="home-2.html" class="${isHome2 ? "active" : ""}">Home-2 — Editorial Atelier</a>
              </div>
            </div>

            <div class="mobile-nav-group">
              <button type="button" class="mobile-nav-trigger is-expanded" data-mobile-accordion="shop-sub" aria-expanded="true">
                <span>Menu</span>
                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="mobile-subnav is-open" id="shop-sub">
                <a href="shop.html" class="${path === "shop.html" && !hash ? "active" : ""}">All Drinks &amp; Coconuts</a>
                <a href="shop.html?category=Tender+Coconuts">Tender Coconuts</a>
                <a href="shop.html?category=Cold-Pressed+Juices">Cold-Pressed Juices</a>
                <a href="shop.html?category=Malai+Shakes+%26+Smoothies">Malai Shakes &amp; Smoothies</a>
                <a href="shop.html?category=Coolers+%26+Detox">Coolers &amp; Detox</a>
                <a href="shop.html?category=Bottled+Coconut+Water">Bottled Coconut Water</a>
              </div>
            </div>

            <div class="mobile-nav-group">
              <a href="our-story.html" class="mobile-nav-trigger ${isStory ? "active" : ""}">Our Story</a>
            </div>
            <div class="mobile-nav-group">
              <a href="sourcing.html" class="mobile-nav-trigger ${isSourcing ? "active" : ""}">Sourcing</a>
            </div>
            <div class="mobile-nav-group">
              <a href="blog.html" class="mobile-nav-trigger ${isBlog ? "active" : ""}">Blog</a>
            </div>
            <div class="mobile-nav-group">
              <a href="contact-bulk-enquiry.html" class="mobile-nav-trigger ${isContact ? "active" : ""}">Contact</a>
            </div>
          </div>
          <div class="mobile-drawer-footer">
            <a href="shop.html" class="btn btn-primary btn-block">Order Fresh</a>
            <a href="contact-bulk-enquiry.html#bulk-enquiry" class="btn btn-outline btn-block">Book Live Stall for Events</a>
          </div>
        </aside>
      `;
    }

    // Inject Search Modal & Wishlist Drawer once
    if (!document.getElementById("search-modal-overlay")) {
      const modalsWrapper = document.createElement("div");
      modalsWrapper.innerHTML = `
        <!-- Search Modal -->
        <div class="modal-overlay" id="search-modal-overlay" role="dialog" aria-modal="true" aria-label="Search Tender Coconut &amp; Fresh Juices">
          <div class="search-modal">
            <div class="search-modal-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="search" id="global-search-input" class="search-modal-input" placeholder="Search Green Coconut, Sugarcane, Orange, Malai Shake, Water..." autocomplete="off" aria-label="Search menu">
              <button type="button" class="icon-btn" data-close-search aria-label="Close search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="search-modal-body">
              <div class="search-quick-tags">
                <button type="button" class="search-tag" data-search-tag="Tender Coconuts">Tender Coconuts</button>
                <button type="button" class="search-tag" data-search-tag="Sugarcane">Sugarcane Juice</button>
                <button type="button" class="search-tag" data-search-tag="Orange">Valencia Orange</button>
                <button type="button" class="search-tag" data-search-tag="Malai Shake">Malai Shake</button>
                <button type="button" class="search-tag" data-search-tag="Water">Coconut Water</button>
                <button type="button" class="search-tag" data-search-tag="Pomegranate">Pomegranate</button>
              </div>
              <div id="global-search-results"></div>
            </div>
          </div>
        </div>

        <!-- Wishlist Drawer -->
        <div class="mobile-drawer-backdrop" id="wishlist-backdrop"></div>
        <aside class="wishlist-drawer" id="wishlist-drawer" aria-label="Saved Stall Favorites">
          <div class="mobile-drawer-header">
            <h3 class="heading-sm" style="margin:0;">Saved Stall Favorites</h3>
            <button type="button" class="icon-btn" data-close-wishlist aria-label="Close saved items">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="mobile-drawer-body" id="wishlist-drawer-items"></div>
          <div class="mobile-drawer-footer">
            <a href="shop.html" class="btn btn-primary btn-block">Explore Full Stall Menu</a>
          </div>
        </aside>
      `;
      document.body.appendChild(modalsWrapper);
    }

    // Inject Footer if mount exists
    const footerMount = document.getElementById("site-footer-mount");
    if (footerMount) {
      footerMount.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-newsletter-band">
              <div>
                <span class="eyebrow footer-eyebrow">Daily Farm-Fresh Harvest &amp; Stall Updates</span>
                <h3>Pure Hydration. Naturally Chilled.</h3>
                <p style="font-size: 0.95rem;">
                  Subscribe for morning harvest alerts, seasonal tropical juice drops, weekend stall specials, and live catering discounts.
                </p>
              </div>
              <form class="newsletter-form" data-newsletter-form novalidate>
                <label for="footer-newsletter-email" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;">Email address</label>
                <input type="email" id="footer-newsletter-email" name="email" placeholder="Enter your email address..." required>
                <button type="submit" class="btn btn-accent">Subscribe</button>
              </form>
            </div>

            <div class="footer-grid">
              <!-- Column 1: Brand Info -->
              <div class="footer-col">
                <a href="index.html" class="brand-logo" aria-label="Tender Coconut Home">
                  <span class="brand-logo-mark" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0 4.5 3.5 7.5 8 7.5s8-3 8-7.5c0-1.5-.5-3-1.5-4C17 7.5 14.5 7 12 7s-5 .5-6.5 3C4.5 11 4 12.5 4 14z"/><ellipse cx="12" cy="11" rx="6" ry="3"/><path d="M14 11l5-8"/><path d="M7 6c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8-1.8-3-1.8-3-1.8 2-1.8 3z"/></svg>
                  </span>
                  <span>Tender Coconut</span>
                </a>
                <p style="font-size: 0.9rem; margin-bottom: 1rem;">
                  Farm-fresh green tender coconuts cut live, 100% pure cold-pressed fruit juices, velvety malai shakes, and live stall catering for weddings and celebrations.
                </p>
                <div class="demo-info" style="font-size: 0.82rem; line-height: 1.6;">
                  <div><strong>Live Stall Location:</strong> Stall #4, Coastal Promenade &amp; Palm Beach Avenue (Sample Info)</div>
                  <div><strong>Enquiries:</strong> hello@tendercoconut-juice.example · +91 98200 55123 / +1 (808) 555-0194</div>
                </div>
                <div class="social-links" aria-label="Social Media Links">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Pinterest">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 20l4-9"/><path d="M10.7 14c.437 1.263 1.43 2 2.55 2 2.071 0 3.75-1.554 3.75-4a5 5 0 1 0-9.7 1.7"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Catering Enquiries on LinkedIn">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>

              <!-- Column 2: Fresh Stall Menu -->
              <div class="footer-col">
                <h4>Fresh Stall Menu</h4>
                <ul class="footer-links">
                  <li><a href="shop.html?category=Tender+Coconuts">Tender Coconuts</a></li>
                  <li><a href="shop.html?category=Cold-Pressed+Juices">Cold-Pressed Juices</a></li>
                  <li><a href="shop.html?category=Malai+Shakes+%26+Smoothies">Malai Shakes &amp; Smoothies</a></li>
                  <li><a href="shop.html?category=Coolers+%26+Detox">Coolers &amp; Detox</a></li>
                  <li><a href="shop.html?category=Bottled+Coconut+Water">Bottled Coconut Water</a></li>
                  <li><a href="shop.html">Full Stall Menu (10 Items)</a></li>
                </ul>
              </div>

              <!-- Column 3: Our Story & Sourcing -->
              <div class="footer-col">
                <h4>Our Story</h4>
                <ul class="footer-links">
                  <li><a href="our-story.html">About Our Stall</a></li>
                  <li><a href="sourcing.html">Coastal Grove Sourcing</a></li>
                  <li><a href="sourcing.html#quality-process">Live Cutting &amp; Cold-Press</a></li>
                  <li><a href="sourcing.html#production-gallery">Stall &amp; Orchard Gallery</a></li>
                  <li><a href="blog.html">The Fresh Stall Blog</a></li>
                  <li><a href="home-2.html">Home-2 Editorial Atelier</a></li>
                </ul>
              </div>

              <!-- Column 4: Stall Services & Catering -->
              <div class="footer-col">
                <h4>Stall Services</h4>
                <ul class="footer-links">
                  <li><a href="contact-bulk-enquiry.html">Visit &amp; Contact Stall</a></li>
                  <li><a href="contact-bulk-enquiry.html#bulk-enquiry">Wedding &amp; Event Stall Bookings</a></li>
                  <li><a href="contact-bulk-enquiry.html#faqs">Stall FAQs</a></li>
                  <li><a href="contact-bulk-enquiry.html#shipping-returns">Pickup &amp; Fast Delivery</a></li>
                  <li><a href="contact-bulk-enquiry.html#shipping-returns">Hygiene &amp; Safety Standards</a></li>
                  <li><a href="contact-bulk-enquiry.html#policies">Privacy &amp; Terms</a></li>
                </ul>
              </div>
            </div>

            <div class="footer-bottom">
              <div>© ${new Date().getFullYear()} Tender Coconut. All rights reserved. “Pure Hydration. Naturally Chilled.”</div>
              <div>Fresh Local Juicery &amp; Event Catering · Sample Stall &amp; Contact Data</div>
            </div>
          </div>
        </footer>
      `;
    }

    applyTheme(getInitialTheme());
    applyDirection(getInitialDirection());
    updateCartBadges();
    updateWishlistUI();
    renderSearchModalResults("");
  }

  /* ------------------------------------------------------------------------
     7. SEARCH & WISHLIST DRAWER RENDERERS
     ------------------------------------------------------------------------ */
  function renderSearchModalResults(query) {
    const container = document.getElementById("global-search-results");
    if (!container) return;

    const q = String(query || "").toLowerCase().trim();
    const products = getCatalog();
    const matches = !q
      ? products.slice(0, 5)
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q) ||
            p.productType.toLowerCase().includes(q)
        );

    if (matches.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem; color: var(--color-text-muted);">
          <p style="margin-bottom:0.75rem;">No drinks or coconuts matched "<strong>${query}</strong>".</p>
          <a href="shop.html" class="btn btn-outline btn-sm">Browse Full Stall Menu</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-light); margin-bottom: 0.65rem; font-weight: 700;">
        ${q ? `Matching Drinks (${matches.length})` : "Popular Stall Refreshers"}
      </div>
      <div style="display:flex; flex-direction:column; gap:0.35rem;">
        ${matches
          .map(
            (p) => `
          <div class="search-result-item">
            <a href="product-details.html?id=${encodeURIComponent(p.id)}">
              <img src="${p.image}" alt="${p.name}" width="58" height="58">
            </a>
            <div class="search-result-info">
              <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="search-result-title">${p.name}</a>
              <div class="search-result-meta">${p.category} · ${p.defaultSize} · <strong>${formatMoney(p.price)}</strong></div>
            </div>
            <button type="button" class="btn btn-primary btn-sm" data-quick-add="${p.id}" data-size="${p.defaultSize}">Add</button>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  function renderWishlistDrawerItems() {
    const container = document.getElementById("wishlist-drawer-items");
    if (!container) return;

    const ids = getWishlist();
    const items = ids.map((id) => getProductById(id)).filter(Boolean);

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: var(--color-text-muted);">
          <p style="margin-bottom: 1rem;">Your wishlist is currently empty. Save your favorite virgin oils, chips, and pantry staples for quick access.</p>
          <a href="shop.html" class="btn btn-outline btn-sm">Explore Products</a>
        </div>
      `;
      return;
    }

    container.innerHTML = items
      .map(
        (p) => `
      <div class="drawer-item">
        <a href="product-details.html?id=${encodeURIComponent(p.id)}">
          <img src="${p.image}" alt="${p.name}">
        </a>
        <div style="flex:1; min-width:0;">
          <a href="product-details.html?id=${encodeURIComponent(p.id)}" style="font-weight:600; font-size:0.94rem; display:block;">${p.name}</a>
          <div style="font-size:0.8rem; color:var(--color-text-muted); margin-bottom:0.45rem;">${p.defaultSize} · ${formatMoney(p.price)}</div>
          <div style="display:flex; gap:0.45rem;">
            <button type="button" class="btn btn-primary btn-sm" style="padding:0.35rem 0.8rem; font-size:0.78rem;" data-quick-add="${p.id}" data-size="${p.defaultSize}">Add to Cart</button>
            <button type="button" class="btn btn-outline btn-sm" style="padding:0.35rem 0.7rem; font-size:0.78rem;" data-wishlist-btn="${p.id}">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  /* ------------------------------------------------------------------------
     8. EVENT DELEGATION & INTERACTIONS
     ------------------------------------------------------------------------ */
  function bindGlobalEvents() {
    // Sticky header scroll state
    const onScroll = () => {
      const header = document.getElementById("site-header");
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 15);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Document click delegation
    document.addEventListener("click", (e) => {
      // Theme Toggle
      const themeBtn = e.target.closest("[data-theme-toggle]");
      if (themeBtn) {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
        return;
      }

      // RTL Layout Toggle (strictly text 'RTL' inside, matching theme button style)
      const rtlBtn = e.target.closest("[data-rtl-toggle]");
      if (rtlBtn) {
        const currentDir = document.documentElement.getAttribute("dir") || "ltr";
        const newDir = currentDir === "rtl" ? "ltr" : "rtl";
        applyDirection(newDir);
        showToast(newDir === "rtl" ? "Switched to RTL (Right-to-Left) layout" : "Switched to LTR (Left-to-Right) layout");
        return;
      }

      // Quick Add to Cart
      const quickAddBtn = e.target.closest("[data-quick-add]");
      if (quickAddBtn) {
        e.preventDefault();
        const pid = quickAddBtn.getAttribute("data-quick-add");
        const size = quickAddBtn.getAttribute("data-size");
        addToCart(pid, size, 1);
        return;
      }

      // Wishlist Toggle
      const wishBtn = e.target.closest("[data-wishlist-btn]");
      if (wishBtn) {
        e.preventDefault();
        const pid = wishBtn.getAttribute("data-wishlist-btn");
        toggleWishlist(pid);
        return;
      }

      // Open / Close Search Modal
      if (e.target.closest("[data-open-search]")) {
        // If opening from inside mobile drawer, dismiss drawer cleanly
        document.getElementById("mobile-drawer")?.classList.remove("is-active");
        document.getElementById("mobile-drawer-backdrop")?.classList.remove("is-active");
        const modal = document.getElementById("search-modal-overlay");
        if (modal) {
          modal.classList.add("is-active");
          setTimeout(() => {
            const inp = document.getElementById("global-search-input");
            if (inp) inp.focus();
          }, 80);
        }
        return;
      }
      if (e.target.closest("[data-close-search]") || e.target.id === "search-modal-overlay") {
        const modal = document.getElementById("search-modal-overlay");
        if (modal) modal.classList.remove("is-active");
        return;
      }

      // Search Quick Tag
      const searchTag = e.target.closest("[data-search-tag]");
      if (searchTag) {
        const tagVal = searchTag.getAttribute("data-search-tag");
        const inp = document.getElementById("global-search-input");
        if (inp) {
          inp.value = tagVal;
          renderSearchModalResults(tagVal);
        }
        return;
      }

      // Open / Close Wishlist Drawer
      if (e.target.closest("[data-open-wishlist]")) {
        // If opening from inside mobile drawer, dismiss drawer cleanly
        document.getElementById("mobile-drawer")?.classList.remove("is-active");
        document.getElementById("mobile-drawer-backdrop")?.classList.remove("is-active");
        document.getElementById("wishlist-drawer")?.classList.add("is-active");
        document.getElementById("wishlist-backdrop")?.classList.add("is-active");
        renderWishlistDrawerItems();
        return;
      }
      if (e.target.closest("[data-close-wishlist]") || e.target.id === "wishlist-backdrop") {
        document.getElementById("wishlist-drawer")?.classList.remove("is-active");
        document.getElementById("wishlist-backdrop")?.classList.remove("is-active");
        return;
      }

      // Open / Close Mobile Nav Drawer
      if (e.target.closest("[data-open-mobile-menu]")) {
        document.getElementById("mobile-drawer")?.classList.add("is-active");
        document.getElementById("mobile-drawer-backdrop")?.classList.add("is-active");
        return;
      }
      if (e.target.closest("[data-close-mobile-menu]") || e.target.id === "mobile-drawer-backdrop") {
        document.getElementById("mobile-drawer")?.classList.remove("is-active");
        document.getElementById("mobile-drawer-backdrop")?.classList.remove("is-active");
        return;
      }

      // Mobile Subnav Accordion
      const accBtn = e.target.closest("[data-mobile-accordion]");
      if (accBtn) {
        const targetId = accBtn.getAttribute("data-mobile-accordion");
        const sub = document.getElementById(targetId);
        if (sub) {
          const isOpen = sub.classList.toggle("is-open");
          accBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
          accBtn.classList.toggle("is-expanded", isOpen);
        }
        return;
      }
    });

    // Live Search Input
    document.addEventListener("input", (e) => {
      if (e.target && e.target.id === "global-search-input") {
        renderSearchModalResults(e.target.value);
      }
    });

    // Escape key closes modals/drawers
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.getElementById("search-modal-overlay")?.classList.remove("is-active");
        document.getElementById("wishlist-drawer")?.classList.remove("is-active");
        document.getElementById("wishlist-backdrop")?.classList.remove("is-active");
        document.getElementById("mobile-drawer")?.classList.remove("is-active");
        document.getElementById("mobile-drawer-backdrop")?.classList.remove("is-active");
        document.getElementById("shop-sidebar")?.classList.remove("is-active");
      }
    });

    // Global Newsletter Form Submission
    document.addEventListener("submit", (e) => {
      const form = e.target.closest("[data-newsletter-form]");
      if (!form) return;
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (emailInput) emailInput.classList.add("is-invalid");
        showToast("Please enter a valid email address to subscribe.");
        return;
      }
      if (emailInput) {
        emailInput.classList.remove("is-invalid");
        emailInput.value = "";
      }
      showToast("Welcome to Tender Coconut! You are subscribed to our daily fresh alerts.");
    });
  }

  /* ------------------------------------------------------------------------
     9. EXPORT GLOBAL API
     ------------------------------------------------------------------------ */
  window.COCOAURA_APP = {
    getCatalog,
    getProductById,
    getCart,
    saveCart,
    addToCart,
    updateCartItemQty,
    removeCartItem,
    calculateCartTotals,
    getDiscountCode,
    setDiscountCode,
    getWishlist,
    toggleWishlist,
    formatMoney,
    showToast,
    renderProductCard,
    updateWishlistUI,
    updateCartBadges,
    applyDirection
  };
  window.STALL_APP = window.COCOAURA_APP;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectGlobalShell();
      bindGlobalEvents();
    });
  } else {
    injectGlobalShell();
    bindGlobalEvents();
  }
})();

