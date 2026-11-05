/* ==========================================================================
   Tender Coconut & Fresh Juice Stall — Interactive Controllers (page-handlers.js)
   Handles: Home-1 Spotlight, Home-2 Collection Tabs, Shop Filtering/Sorting/
   Pagination, Product Details Gallery & Buy Flow, Contact & Bulk Enquiry
   Validation, FAQ Accordions, Cart Management, and Checkout Flow.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const app = window.COCOAURA_APP;
    const data = window.COCOAURA_DATA;
    if (!app || !data) return;

    initHomePage(app, data);
    initHome2Page(app, data);
    initShopPage(app, data);
    initProductDetailsPage(app, data);
    initFaqAccordion();
    initContactAndBulkForms(app);
    initCartPage(app);
    initCheckoutPage(app);
  });

  /* ========================================================================
     1. HOME PAGE (index.html)
     ======================================================================== */
  function initHomePage(app, data) {
    // Featured Hero Product Spotlight (Virgin Coconut Oil)
    const spotlightEl = document.getElementById("vco-hero-spotlight");
    if (spotlightEl) {
      const vco = app.getProductById("vco-raw-glass") || data.products[0];
      let selectedSize = vco.defaultSize;
      let selectedPrice = vco.price;
      let qty = 1;

      const priceDisplay = spotlightEl.querySelector("[data-spotlight-price]");
      const skuDisplay = spotlightEl.querySelector("[data-spotlight-sku]");
      const qtyInput = spotlightEl.querySelector("[data-spotlight-qty]");

      spotlightEl.addEventListener("click", (e) => {
        const sizeBtn = e.target.closest("[data-spotlight-size]");
        if (sizeBtn) {
          selectedSize = sizeBtn.getAttribute("data-spotlight-size");
          selectedPrice = parseFloat(sizeBtn.getAttribute("data-price")) || vco.price;
          const sku = sizeBtn.getAttribute("data-sku") || "CA-VCO-500";
          spotlightEl.querySelectorAll("[data-spotlight-size]").forEach((b) => b.classList.remove("active"));
          sizeBtn.classList.add("active");
          if (priceDisplay) priceDisplay.textContent = app.formatMoney(selectedPrice);
          if (skuDisplay) skuDisplay.textContent = sku;
          return;
        }

        if (e.target.closest("[data-spotlight-qty-dec]")) {
          qty = Math.max(1, qty - 1);
          if (qtyInput) qtyInput.value = String(qty);
          return;
        }

        if (e.target.closest("[data-spotlight-qty-inc]")) {
          qty = Math.min(99, qty + 1);
          if (qtyInput) qtyInput.value = String(qty);
          return;
        }

        if (e.target.closest("[data-spotlight-add]")) {
          app.addToCart(vco.id, selectedSize, qty);
          return;
        }
      });
    }

    // Featured Products Grid on Home Page
    const featuredMount = document.getElementById("home-featured-products");
    if (featuredMount) {
      const featuredList = data.products.filter((p) => p.isFeatured).slice(0, 4);
      featuredMount.innerHTML = featuredList.map((p) => app.renderProductCard(p)).join("");
      app.updateWishlistUI();
    }
  }

  /* ========================================================================
     2. HOME-2 PAGE (home-2.html)
     ======================================================================== */
  function initHome2Page(app, data) {
    const gridMount = document.getElementById("home2-collection-grid");
    if (!gridMount) return;

    function renderHome2Collection(filterGroup) {
      let list = data.products;
      if (filterGroup === "coconuts" || filterGroup === "oils") {
        list = data.products.filter(
          (p) => p.category === "Tender Coconuts" || p.category === "Bottled Coconut Water"
        );
      } else if (filterGroup === "juices" || filterGroup === "pantry") {
        list = data.products.filter((p) => p.category === "Cold-Pressed Juices");
      } else if (filterGroup === "shakes-coolers" || filterGroup === "snacks-drinks") {
        list = data.products.filter((p) => p.category === "Malai Shakes & Smoothies" || p.category === "Coolers & Detox");
      } else {
        list = data.products.slice(0, 8);
      }
      gridMount.innerHTML = list.map((p) => app.renderProductCard(p)).join("");
      app.updateWishlistUI();
    }

    renderHome2Collection("all");

    document.querySelectorAll("[data-home2-tab]").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        document.querySelectorAll("[data-home2-tab]").forEach((b) => b.classList.remove("active"));
        tabBtn.classList.add("active");
        renderHome2Collection(tabBtn.getAttribute("data-home2-tab"));
      });
    });
  }

  /* ========================================================================
     3. SHOP & PRODUCTS PAGE (shop.html)
     ======================================================================== */
  function initShopPage(app, data) {
    const shopGrid = document.getElementById("shop-products-grid");
    if (!shopGrid) return;

    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category") || "all";
    const initialSearch = params.get("search") || "";

    const state = {
      search: initialSearch,
      category: initialCategory,
      priceRange: "all",
      size: "all",
      availability: "all",
      productType: "all",
      sort: "featured",
      visibleCount: 8
    };

    const searchInput = document.getElementById("shop-search-input");
    const sortSelect = document.getElementById("shop-sort-select");
    const resultCountEl = document.getElementById("shop-result-count");
    const activeChipsEl = document.getElementById("shop-active-chips");
    const loadMoreWrap = document.getElementById("shop-load-more-wrap");
    const loadMoreBtn = document.getElementById("shop-load-more-btn");

    if (searchInput && state.search) searchInput.value = state.search;

    function syncSidebarInputs() {
      document.querySelectorAll('input[name="filter-category"]').forEach((inp) => {
        inp.checked = inp.value === state.category;
      });
      document.querySelectorAll('input[name="filter-price"]').forEach((inp) => {
        inp.checked = inp.value === state.priceRange;
      });
      document.querySelectorAll('input[name="filter-size"]').forEach((inp) => {
        inp.checked = inp.value === state.size;
      });
      document.querySelectorAll('input[name="filter-availability"]').forEach((inp) => {
        inp.checked = inp.value === state.availability;
      });
      document.querySelectorAll('input[name="filter-type"]').forEach((inp) => {
        inp.checked = inp.value === state.productType;
      });
      document.querySelectorAll("[data-cat-pill]").forEach((pill) => {
        pill.classList.toggle("active", pill.getAttribute("data-cat-pill") === state.category);
      });
    }

    function getFilteredProducts() {
      let list = [...data.products];

      // Search
      if (state.search.trim()) {
        const q = state.search.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q) ||
            p.productType.toLowerCase().includes(q)
        );
      }

      // Category
      if (state.category !== "all") {
        list = list.filter((p) => p.category === state.category);
      }

      // Price Range
      if (state.priceRange === "under-15") {
        list = list.filter((p) => p.price < 15);
      } else if (state.priceRange === "15-25") {
        list = list.filter((p) => p.price >= 15 && p.price <= 25);
      } else if (state.priceRange === "over-25") {
        list = list.filter((p) => p.price > 25);
      }

      // Size
      if (state.size !== "all") {
        list = list.filter(
          (p) =>
            p.defaultSize === state.size ||
            (p.sizes && p.sizes.some((s) => s.label === state.size))
        );
      }

      // Availability
      if (state.availability !== "all") {
        list = list.filter((p) => p.availability === state.availability);
      }

      // Product Type
      if (state.productType !== "all") {
        list = list.filter((p) => p.productType === state.productType);
      }

      // Sorting
      if (state.sort === "new") {
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      } else if (state.sort === "price-asc") {
        list.sort((a, b) => a.price - b.price);
      } else if (state.sort === "price-desc") {
        list.sort((a, b) => b.price - a.price);
      } else {
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
      }

      return list;
    }

    function renderActiveChips() {
      if (!activeChipsEl) return;
      const chips = [];

      if (state.search.trim()) {
        chips.push({ key: "search", label: `Search: "${state.search.trim()}"` });
      }
      if (state.category !== "all") {
        chips.push({ key: "category", label: `Category: ${state.category}` });
      }
      if (state.priceRange !== "all") {
        const priceLabels = {
          "under-15": "Under $15",
          "15-25": "$15 – $25",
          "over-25": "Over $25"
        };
        chips.push({ key: "priceRange", label: `Price: ${priceLabels[state.priceRange]}` });
      }
      if (state.size !== "all") {
        chips.push({ key: "size", label: `Size: ${state.size}` });
      }
      if (state.availability !== "all") {
        chips.push({ key: "availability", label: `Status: ${state.availability}` });
      }
      if (state.productType !== "all") {
        chips.push({ key: "productType", label: `Type: ${state.productType}` });
      }

      if (chips.length === 0) {
        activeChipsEl.innerHTML = "";
        activeChipsEl.style.display = "none";
        return;
      }

      activeChipsEl.style.display = "flex";
      activeChipsEl.innerHTML = `
        ${chips
          .map(
            (c) => `
          <span class="filter-chip">
            <span>${c.label}</span>
            <button type="button" data-remove-chip="${c.key}" aria-label="Remove ${c.label} filter" style="font-weight:700; margin-left:2px;">×</button>
          </span>
        `
          )
          .join("")}
        <button type="button" class="btn btn-outline btn-sm" id="clear-all-filters-btn" style="padding: 0.3rem 0.8rem; font-size: 0.78rem;">
          Clear All Filters
        </button>
      `;
    }

    function renderShop() {
      syncSidebarInputs();
      renderActiveChips();

      const filtered = getFilteredProducts();
      const visible = filtered.slice(0, state.visibleCount);

      if (resultCountEl) {
        resultCountEl.innerHTML = `Showing <strong>${visible.length}</strong> of <strong>${filtered.length}</strong> coconut products`;
      }

      if (filtered.length === 0) {
        shopGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <h3 class="heading-md" style="margin-bottom: 0.65rem;">No Matching Coconut Products Found</h3>
            <p style="color: var(--color-text-muted); max-width: 460px; margin: 0 auto 1.5rem;">
              Try clearing one or more active filters or searching for another coconut staple such as Virgin Coconut Oil or Coconut Chips.
            </p>
            <button type="button" class="btn btn-primary" data-reset-shop-filters>Reset All Filters</button>
          </div>
        `;
      } else {
        shopGrid.innerHTML = visible.map((p) => app.renderProductCard(p)).join("");
        app.updateWishlistUI();
      }

      if (loadMoreWrap && loadMoreBtn) {
        if (filtered.length > state.visibleCount) {
          loadMoreWrap.style.display = "block";
          loadMoreBtn.textContent = `Show All ${filtered.length} Products (+${filtered.length - state.visibleCount} More)`;
        } else {
          loadMoreWrap.style.display = "none";
        }
      }
    }

    // Event listeners for Shop
    document.querySelectorAll('input[name="filter-category"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        state.category = inp.value;
        state.visibleCount = 8;
        renderShop();
      });
    });

    document.querySelectorAll('input[name="filter-price"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        state.priceRange = inp.value;
        state.visibleCount = 8;
        renderShop();
      });
    });

    document.querySelectorAll('input[name="filter-size"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        state.size = inp.value;
        state.visibleCount = 8;
        renderShop();
      });
    });

    document.querySelectorAll('input[name="filter-availability"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        state.availability = inp.value;
        state.visibleCount = 8;
        renderShop();
      });
    });

    document.querySelectorAll('input[name="filter-type"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        state.productType = inp.value;
        state.visibleCount = 8;
        renderShop();
      });
    });

    document.querySelectorAll("[data-cat-pill]").forEach((pill) => {
      pill.addEventListener("click", () => {
        state.category = pill.getAttribute("data-cat-pill");
        state.visibleCount = 8;
        renderShop();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.search = searchInput.value;
        state.visibleCount = 8;
        renderShop();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        renderShop();
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        state.visibleCount = 99;
        renderShop();
      });
    }

    document.addEventListener("click", (e) => {
      const chipRemove = e.target.closest("[data-remove-chip]");
      if (chipRemove) {
        const key = chipRemove.getAttribute("data-remove-chip");
        if (key === "search") {
          state.search = "";
          if (searchInput) searchInput.value = "";
        } else {
          state[key] = "all";
        }
        renderShop();
        return;
      }

      if (e.target.id === "clear-all-filters-btn" || e.target.closest("[data-reset-shop-filters]")) {
        state.search = "";
        state.category = "all";
        state.priceRange = "all";
        state.size = "all";
        state.availability = "all";
        state.productType = "all";
        state.visibleCount = 8;
        if (searchInput) searchInput.value = "";
        renderShop();
        return;
      }

      // Mobile Filter Drawer Toggle
      if (e.target.closest("[data-open-shop-filters]")) {
        document.getElementById("shop-sidebar")?.classList.add("is-active");
        document.getElementById("shop-filter-backdrop")?.classList.add("is-active");
        return;
      }
      if (e.target.closest("[data-close-shop-filters]") || e.target.id === "shop-filter-backdrop") {
        document.getElementById("shop-sidebar")?.classList.remove("is-active");
        document.getElementById("shop-filter-backdrop")?.classList.remove("is-active");
      }
    });

    renderShop();
  }

  /* ========================================================================
     4. PRODUCT DETAILS PAGE (product-details.html)
     ======================================================================== */
  function initProductDetailsPage(app, data) {
    const pdpMount = document.getElementById("pdp-mount");
    if (!pdpMount) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id") || "vco-raw-glass";
    const product = app.getProductById(requestedId) || app.getProductById("vco-raw-glass") || data.products[0];

    let selectedSizeObj =
      (product.sizes && product.sizes.find((s) => s.label === product.defaultSize)) ||
      (product.sizes && product.sizes[0]) || { label: product.defaultSize, price: product.price, sku: "CA-001" };
    let qty = 1;
    let currentImgIndex = 0;
    const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.image];

    document.title = `${product.name} | Tender Coconut`;

    const bcCategory = document.getElementById("pdp-breadcrumb-category");
    const bcName = document.getElementById("pdp-breadcrumb-name");
    if (bcCategory) {
      bcCategory.textContent = product.category;
      bcCategory.href = `shop.html?category=${encodeURIComponent(product.category)}`;
    }
    if (bcName) {
      bcName.textContent = product.name;
    }

    const isWishlisted = app.getWishlist().includes(product.id);

    pdpMount.innerHTML = `
      <div class="pdp-grid">
        <!-- Left Column: Image Gallery -->
        <div class="pdp-gallery">
          <div class="pdp-main-image" id="pdp-main-image-box">
            <img src="${galleryImages[0]}" alt="${product.name}" id="pdp-active-img" width="700" height="700">
            ${
              product.badge
                ? `<span class="badge badge-cream" style="position:absolute; top:1rem; left:1rem;">${product.badge}</span>`
                : ""
            }
          </div>
          <div class="pdp-thumbs" role="list" aria-label="Product image thumbnails">
            ${galleryImages
              .map(
                (imgSrc, idx) => `
              <button type="button" class="pdp-thumb ${idx === 0 ? "active" : ""}" data-pdp-thumb="${idx}" aria-label="View product angle ${idx + 1}">
                <img src="${imgSrc}" alt="${product.name} view ${idx + 1}" width="140" height="140">
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Right Column: Product Information & Purchase Controls -->
        <div class="pdp-details">
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.75rem; margin-bottom:0.65rem;">
            <a href="shop.html?category=${encodeURIComponent(product.category)}" class="eyebrow" style="margin:0;">${product.category}</a>
            <span class="badge badge-outline">${product.availability}</span>
            <span style="font-size:0.8rem; color:var(--color-text-light);" id="pdp-sku-label">SKU: ${selectedSizeObj.sku}</span>
          </div>

          <h1 class="heading-xl" style="margin-bottom:0.75rem;">${product.name}</h1>

          <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:1.25rem;">
            <span class="heading-lg" id="pdp-live-price" style="font-family:var(--font-body); font-weight:700;">${app.formatMoney(selectedSizeObj.price)}</span>
            ${
              product.compareAtPrice
                ? `<span class="product-price-compare" style="font-size:1.05rem;">${app.formatMoney(product.compareAtPrice)}</span>`
                : ""
            }
            <span style="font-size:0.82rem; color:var(--color-supporting); font-weight:600;">· Traceable Single-Origin Batch</span>
          </div>

          <p class="lead-text" style="margin-bottom:1.5rem;">${product.description}</p>

          <!-- Key Extraction & Source Highlights Box -->
          <div class="spotlight-specs" style="margin-top:0; margin-bottom:1.65rem;">
            <div class="spotlight-spec-item">
              <span>Extraction / Craft Method</span>
              <strong>${product.specs.extractionMethod}</strong>
            </div>
            <div class="spotlight-spec-item">
              <span>Coconut Source</span>
              <strong>${product.specs.coconutSource}</strong>
            </div>
            <div class="spotlight-spec-item">
              <span>Primary Packaging</span>
              <strong>${product.specs.packagingMaterial}</strong>
            </div>
            <div class="spotlight-spec-item">
              <span>Sample Batch Reference</span>
              <strong>${product.specs.sampleBatchId}</strong>
            </div>
          </div>

          <!-- Size Selector -->
          <div style="margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; font-size:0.88rem; font-weight:600; margin-bottom:0.5rem;">
              <span>Select Packaging Size: <strong id="pdp-selected-size-text">${selectedSizeObj.label}</strong></span>
              <a href="contact-bulk-enquiry.html#bulk-enquiry" style="color:var(--color-supporting); text-decoration:underline;">Need 5L / 20kg Bulk Formats?</a>
            </div>
            <div class="size-pills">
              ${product.sizes
                .map(
                  (s) => `
                <button type="button" class="size-pill ${s.label === selectedSizeObj.label ? "active" : ""}" data-pdp-size="${s.label}" data-price="${s.price}" data-sku="${s.sku}">
                  ${s.label} — ${app.formatMoney(s.price)}
                </button>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Quantity + Add to Cart + Buy Now + Wishlist -->
          <div class="pdp-buy-actions">
            <div class="qty-control" aria-label="Product quantity">
              <button type="button" class="qty-btn" id="pdp-qty-dec" aria-label="Decrease quantity">−</button>
              <input type="number" class="qty-input" id="pdp-qty-input" value="1" min="1" max="99" aria-label="Quantity">
              <button type="button" class="qty-btn" id="pdp-qty-inc" aria-label="Increase quantity">+</button>
            </div>

            <button type="button" class="btn btn-primary" id="pdp-add-to-cart" style="flex:1; min-width:170px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Add to Cart</span>
            </button>

            <button type="button" class="btn btn-accent" id="pdp-buy-now" style="flex:1; min-width:150px;">
              <span>Buy Now</span>
            </button>

            <button type="button" class="btn btn-outline ${isWishlisted ? "is-active" : ""}" data-wishlist-btn="${product.id}" aria-label="Save to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>

          <!-- Structured Specifications, Ingredients, Storage & Usage -->
          <div class="pdp-info-tabs">
            <div style="padding: 1.35rem 0; border-bottom: 1px solid var(--color-border-subtle);">
              <h2 class="heading-sm" style="margin-bottom:0.45rem;">Ingredients</h2>
              <p style="color:var(--color-text-muted); font-size:0.93rem;">${product.ingredients}</p>
            </div>

            <div style="padding: 1.35rem 0; border-bottom: 1px solid var(--color-border-subtle);">
              <h2 class="heading-sm" style="margin-bottom:0.65rem;">Culinary &amp; Everyday Usage Suggestions</h2>
              <ul style="display:flex; flex-direction:column; gap:0.45rem; color:var(--color-text-muted); font-size:0.93rem; padding-left:1.1rem; list-style:disc;">
                ${product.usageSuggestions.map((u) => `<li>${u}</li>`).join("")}
              </ul>
            </div>

            <div style="padding: 1.35rem 0; border-bottom: 1px solid var(--color-border-subtle);">
              <h2 class="heading-sm" style="margin-bottom:0.45rem;">Product Specifications (Sample Batch Data)</h2>
              <table class="pdp-spec-table">
                <tbody>
                  <tr>
                    <th>Extraction / Process</th>
                    <td>${product.specs.extractionMethod}</td>
                  </tr>
                  <tr>
                    <th>Coconut Origin</th>
                    <td>${product.specs.coconutSource}</td>
                  </tr>
                  <tr>
                    <th>Moisture / Clarity Profile</th>
                    <td>${product.specs.moistureContent} · ${product.specs.appearance}</td>
                  </tr>
                  <tr>
                    <th>Packaging Format</th>
                    <td>${product.packagingInfo}</td>
                  </tr>
                  <tr>
                    <th>Storage Recommendations</th>
                    <td>${product.storageInstructions}</td>
                  </tr>
                  <tr>
                    <th>Shipping &amp; Handling</th>
                    <td>${product.shippingInfo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Gallery Thumbnails & Touch Swipe
    const activeImg = document.getElementById("pdp-active-img");
    const mainBox = document.getElementById("pdp-main-image-box");

    function setGalleryImage(idx) {
      currentImgIndex = (idx + galleryImages.length) % galleryImages.length;
      if (activeImg) activeImg.src = galleryImages[currentImgIndex];
      pdpMount.querySelectorAll("[data-pdp-thumb]").forEach((btn, i) => {
        btn.classList.toggle("active", i === currentImgIndex);
      });
    }

    pdpMount.querySelectorAll("[data-pdp-thumb]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setGalleryImage(parseInt(btn.getAttribute("data-pdp-thumb"), 10) || 0);
      });
    });

    if (mainBox) {
      let touchStartX = 0;
      mainBox.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      mainBox.addEventListener("touchend", (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 40) {
          setGalleryImage(diff < 0 ? currentImgIndex + 1 : currentImgIndex - 1);
        }
      }, { passive: true });
    }

    // Bind Size Selection
    pdpMount.querySelectorAll("[data-pdp-size]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pdpMount.querySelectorAll("[data-pdp-size]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const label = btn.getAttribute("data-pdp-size");
        const price = parseFloat(btn.getAttribute("data-price")) || product.price;
        const sku = btn.getAttribute("data-sku") || "CA-001";
        selectedSizeObj = { label, price, sku };
        document.getElementById("pdp-live-price").textContent = app.formatMoney(price);
        document.getElementById("pdp-selected-size-text").textContent = label;
        document.getElementById("pdp-sku-label").textContent = `SKU: ${sku}`;
      });
    });

    // Bind Quantity Selector
    const qtyInput = document.getElementById("pdp-qty-input");
    document.getElementById("pdp-qty-dec")?.addEventListener("click", () => {
      qty = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
      qtyInput.value = String(qty);
    });
    document.getElementById("pdp-qty-inc")?.addEventListener("click", () => {
      qty = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
      qtyInput.value = String(qty);
    });
    qtyInput?.addEventListener("change", () => {
      qty = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
      qtyInput.value = String(qty);
    });

    // Add to Cart & Buy Now
    document.getElementById("pdp-add-to-cart")?.addEventListener("click", () => {
      app.addToCart(product.id, selectedSizeObj.label, qty);
    });

    document.getElementById("pdp-buy-now")?.addEventListener("click", () => {
      app.addToCart(product.id, selectedSizeObj.label, qty, true);
      window.location.href = "checkout.html";
    });

    // Render Related Products
    const relatedMount = document.getElementById("pdp-related-products");
    if (relatedMount) {
      const related = data.products
        .filter((p) => p.id !== product.id)
        .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
        .slice(0, 4);
      relatedMount.innerHTML = related.map((p) => app.renderProductCard(p)).join("");
    }

    // Render Other Quick-Switch Products Pill Bar on PDP
    const switcherMount = document.getElementById("pdp-product-switcher");
    if (switcherMount) {
      switcherMount.innerHTML = data.products
        .map(
          (p) => `
        <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="size-pill ${p.id === product.id ? "active" : ""}" style="font-size:0.8rem; padding:0.42rem 0.9rem;">
          ${p.name}
        </a>
      `
        )
        .join("");
    }

    app.updateWishlistUI();
  }

  /* ========================================================================
     5. FAQ ACCORDION
     ======================================================================== */
  function initFaqAccordion() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".faq-trigger");
      if (!trigger) return;
      const item = trigger.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  }

  /* ========================================================================
     6. CONTACT & BULK ENQUIRY FORMS (contact-bulk-enquiry.html)
     ======================================================================== */
  function initContactAndBulkForms(app) {
    function validateForm(form) {
      let valid = true;
      const requiredInputs = form.querySelectorAll("[required]");
      requiredInputs.forEach((inp) => {
        const val = inp.value.trim();
        let fieldOk = val.length > 0;
        if (inp.type === "email") {
          fieldOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        inp.classList.toggle("is-invalid", !fieldOk);
        if (!fieldOk) valid = false;
      });
      return valid;
    }

    // Clear invalid state on input
    document.querySelectorAll("#general-contact-form .form-control, #bulk-enquiry-form .form-control").forEach((inp) => {
      inp.addEventListener("input", () => inp.classList.remove("is-invalid"));
    });

    // General Contact Form
    const contactForm = document.getElementById("general-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm(contactForm)) {
          app.showToast("Please complete all required fields in the contact form.");
          return;
        }
        const statusBox = document.getElementById("general-contact-status");
        const senderName = contactForm.querySelector('[name="name"]')?.value || "Friend";
        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.innerHTML = `
            <div style="padding: 1.25rem; background-color: var(--color-success-bg); border: 1px solid var(--color-success); border-radius: var(--radius-sm); color: var(--color-text);">
              <strong style="display:block; margin-bottom:0.25rem;">Thank you, ${senderName}! Your message has been received.</strong>
              <span style="font-size:0.88rem; color:var(--color-text-muted);">Reference ID: <strong>CA-MSG-${Math.floor(100000 + Math.random() * 900000)}</strong>. Our Customer Care team responds within 1 business day (Frontend Demo Confirmation).</span>
            </div>
          `;
        }
        contactForm.reset();
        app.showToast("Your message has been sent to our Stall Management Team.");
      });
    }

    // Bulk / Wholesale Enquiry Form
    const bulkForm = document.getElementById("bulk-enquiry-form");
    if (bulkForm) {
      bulkForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm(bulkForm)) {
          app.showToast("Please complete all required wholesale enquiry fields.");
          return;
        }
        const statusBox = document.getElementById("bulk-enquiry-status");
        const bizName = bulkForm.querySelector('[name="businessName"]')?.value || "Partner";
        const productInterest = bulkForm.querySelector('[name="productOfInterest"]')?.value || "Coconut Products";
        const refCode = `CA-BULK-${Math.floor(100000 + Math.random() * 900000)}`;

        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.innerHTML = `
            <div style="padding: 1.4rem; background-color: var(--color-success-bg); border: 1.5px solid var(--color-success); border-radius: var(--radius-md); color: var(--color-text);">
              <strong style="display:block; font-size:1.05rem; margin-bottom:0.35rem;">Wholesale Enquiry Logged — Reference #${refCode}</strong>
              <p style="font-size:0.9rem; color:var(--color-text-muted); margin-bottom:0.5rem;">
                Thank you! We have registered the bulk enquiry for <strong>${bizName}</strong> regarding <strong>${productInterest}</strong>.
              </p>
              <p style="font-size:0.82rem; color:var(--color-text-muted);">
                <em>Note: This form is a wholesale enquiry interface, not an automated order or binding quotation system. Our Trade &amp; Export Desk will review your volume, packaging format, and destination to prepare a custom specification sheet and FOB/CIF quote.</em>
              </p>
            </div>
          `;
        }
        bulkForm.reset();
        app.showToast(`Wholesale Enquiry #${refCode} submitted!`);
      });
    }
  }

  /* ========================================================================
     7. CART PAGE (cart.html)
     ======================================================================== */
  function initCartPage(app) {
    const cartMount = document.getElementById("cart-page-mount");
    if (!cartMount) return;

    function renderCartView() {
      const totals = app.calculateCartTotals();
      const { cart, itemCount, subtotal, discountCode, discountAmount, shipping, total } = totals;

      if (cart.length === 0) {
        cartMount.innerHTML = `
          <div style="text-align:center; padding: 4.5rem 1.5rem; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); max-width: 640px; margin: 0 auto;">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--color-secondary); color:var(--color-primary); display:inline-flex; align-items:center; justify-content:center; margin-bottom:1.25rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h2 class="heading-lg" style="margin-bottom:0.65rem;">Your Stall Cart is Empty</h2>
            <p style="color:var(--color-text-muted); margin-bottom:1.75rem;">
              Explore our freshly cut green tender coconuts, 100% pure cold-pressed fruit juices, velvety malai shakes, and chilled fruit coolers.
            </p>
            <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.85rem;">
              <a href="shop.html" class="btn btn-primary">Explore Full Stall Menu</a>
              <button type="button" class="btn btn-outline" id="load-sample-cart-btn">Add Stall Favorite Trio</button>
            </div>
          </div>
        `;
        return;
      }

      const freeShippingRemaining = Math.max(0, 60 - (subtotal - discountAmount));
      const freeShippingProgress = Math.min(100, ((subtotal - discountAmount) / 60) * 100);

      cartMount.innerHTML = `
        <div class="cart-layout">
          <!-- Cart Items Column -->
          <div>
            <!-- Free Shipping Meter -->
            <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:1rem 1.25rem; margin-bottom:1.25rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:0.5rem;">
                <span>
                  ${
                    freeShippingRemaining === 0
                      ? "✦ <strong>You have unlocked Complimentary Ground Shipping!</strong>"
                      : `Add <strong>${app.formatMoney(freeShippingRemaining)}</strong> more to unlock Complimentary Shipping ($60+)`
                  }
                </span>
                <span style="font-weight:700; color:var(--color-supporting);">${Math.round(freeShippingProgress)}%</span>
              </div>
              <div style="height:6px; background:var(--color-secondary); border-radius:99px; overflow:hidden;">
                <div style="height:100%; width:${freeShippingProgress}%; background:var(--color-primary); transition:width 0.3s ease;"></div>
              </div>
            </div>

            <!-- Item Rows -->
            <div>
              ${cart
                .map(
                  (item) => `
                <div class="cart-item-row" data-cart-row="${item.productId}" data-cart-size="${item.size}">
                  <a href="product-details.html?id=${encodeURIComponent(item.productId)}">
                    <img src="${item.image}" alt="${item.name}">
                  </a>
                  <div>
                    <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-supporting); font-weight:700;">${item.category}</div>
                    <a href="product-details.html?id=${encodeURIComponent(item.productId)}" style="font-family:var(--font-heading); font-size:1.18rem; color:var(--color-text);">${item.name}</a>
                    <div style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.2rem;">
                      Selected Size: <strong>${item.size}</strong> · Unit Price: ${app.formatMoney(item.price)}
                    </div>
                  </div>
                  <div class="cart-item-actions" style="display:flex; align-items:center; gap:1rem;">
                    <div class="qty-control" style="height:38px;">
                      <button type="button" class="qty-btn" data-cart-dec="${item.productId}" data-size="${item.size}" aria-label="Decrease quantity">−</button>
                      <input type="number" class="qty-input" value="${item.qty}" min="1" max="99" data-cart-qty-input="${item.productId}" data-size="${item.size}" aria-label="Quantity">
                      <button type="button" class="qty-btn" data-cart-inc="${item.productId}" data-size="${item.size}" aria-label="Increase quantity">+</button>
                    </div>
                    <div style="min-width:74px; text-align:right; font-weight:700; font-size:1.05rem;">
                      ${app.formatMoney(item.price * item.qty)}
                    </div>
                    <button type="button" class="icon-btn" data-cart-remove="${item.productId}" data-size="${item.size}" aria-label="Remove ${item.name}" title="Remove item" style="color:var(--color-danger);">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:1rem; margin-top:1.25rem;">
              <a href="shop.html" class="btn btn-outline btn-sm">← Continue Shopping</a>
              <button type="button" class="btn btn-outline btn-sm" id="clear-entire-cart-btn">Clear Cart</button>
            </div>
          </div>

          <!-- Order Summary Column -->
          <aside class="summary-box" aria-label="Order Summary">
            <h2 class="heading-md" style="margin-bottom:1rem;">Order Summary</h2>

            <!-- Discount Code Demo Box -->
            <form id="cart-discount-form" style="margin-bottom:1.25rem; padding-bottom:1.25rem; border-bottom:1px solid var(--color-border-subtle);">
              <label for="cart-promo-input" class="form-label" style="display:block; margin-bottom:0.4rem;">
                Promo Code <span style="font-weight:400; color:var(--color-text-light);">(Try <code>FRESH10</code> or <code>STALL15</code>)</span>
              </label>
              <div style="display:flex; gap:0.5rem;">
                <input type="text" id="cart-promo-input" class="form-control" placeholder="Enter code" value="${discountCode}" style="padding:0.6rem 0.85rem;">
                <button type="submit" class="btn btn-secondary btn-sm">Apply</button>
              </div>
              ${
                discountCode
                  ? `<div style="font-size:0.8rem; color:var(--color-success); margin-top:0.45rem; display:flex; justify-content:space-between;">
                      <span>✓ Code <strong>${discountCode}</strong> applied (-${Math.round(totals.discountRate * 100)}%)</span>
                      <button type="button" id="remove-discount-btn" style="text-decoration:underline;">Remove</button>
                    </div>`
                  : ""
              }
            </form>

            <div class="summary-line">
              <span>Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})</span>
              <strong>${app.formatMoney(subtotal)}</strong>
            </div>

            ${
              discountAmount > 0
                ? `<div class="summary-line" style="color:var(--color-success);">
                    <span>Discount (${discountCode})</span>
                    <strong>−${app.formatMoney(discountAmount)}</strong>
                  </div>`
                : ""
            }

            <div class="summary-line">
              <span>Estimated Shipping</span>
              <strong>${shipping === 0 ? "Free" : app.formatMoney(shipping)}</strong>
            </div>

            <div class="summary-line total">
              <span>Order Total</span>
              <span>${app.formatMoney(total)}</span>
            </div>

            <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-top:1.35rem;">
              Proceed to Checkout
            </a>

            <div style="margin-top:1.1rem; font-size:0.78rem; color:var(--color-text-light); text-align:center; line-height:1.5;">
              Plastic-free protective glass packaging · Traceable single-origin coconut batches
            </div>
          </aside>
        </div>
      `;
    }

    cartMount.addEventListener("click", (e) => {
      const decBtn = e.target.closest("[data-cart-dec]");
      if (decBtn) {
        const pid = decBtn.getAttribute("data-cart-dec");
        const size = decBtn.getAttribute("data-size");
        const item = app.getCart().find((i) => i.productId === pid && i.size === size);
        if (item) app.updateCartItemQty(pid, size, item.qty - 1);
        renderCartView();
        return;
      }

      const incBtn = e.target.closest("[data-cart-inc]");
      if (incBtn) {
        const pid = incBtn.getAttribute("data-cart-inc");
        const size = incBtn.getAttribute("data-size");
        const item = app.getCart().find((i) => i.productId === pid && i.size === size);
        if (item) app.updateCartItemQty(pid, size, item.qty + 1);
        renderCartView();
        return;
      }

      const rmBtn = e.target.closest("[data-cart-remove]");
      if (rmBtn) {
        app.removeCartItem(rmBtn.getAttribute("data-cart-remove"), rmBtn.getAttribute("data-size"));
        renderCartView();
        return;
      }

      if (e.target.id === "clear-entire-cart-btn") {
        app.saveCart([]);
        app.showToast("Cleared all items from your cart.");
        renderCartView();
        return;
      }

      if (e.target.id === "remove-discount-btn") {
        app.setDiscountCode("");
        app.showToast("Removed discount code.");
        renderCartView();
        return;
      }

      if (e.target.id === "load-sample-cart-btn") {
        app.addToCart("vco-raw-glass", "Regular Green (350ml)", 1, true);
        app.addToCart("chips-golden-toasted", "Tall Glass (350 ml)", 1, true);
        app.addToCart("water-tender-glass", "Single Bottle (330 ml)", 1, true);
        app.showToast("Added Stall Favorite Trio to your cart!");
        renderCartView();
      }
    });

    cartMount.addEventListener("change", (e) => {
      const qtyInp = e.target.closest("[data-cart-qty-input]");
      if (qtyInp) {
        const pid = qtyInp.getAttribute("data-cart-qty-input");
        const size = qtyInp.getAttribute("data-size");
        app.updateCartItemQty(pid, size, parseInt(qtyInp.value, 10) || 1);
        renderCartView();
      }
    });

    cartMount.addEventListener("submit", (e) => {
      if (e.target.id === "cart-discount-form") {
        e.preventDefault();
        const inp = document.getElementById("cart-promo-input");
        const code = (inp ? inp.value : "").trim().toUpperCase();
        if (code === "FRESH10" || code === "STALL15" || code === "COCONUT20" || code === "JUICE15" || code === "COCOAURA10" || code === "PURE15" || code === "TROPICAL20") {
          app.setDiscountCode(code);
          app.showToast(`Applied discount code ${code}!`);
        } else {
          app.showToast("Invalid promo code. Try FRESH10 or STALL15.");
        }
        renderCartView();
      }
    });

    window.addEventListener("cocoaura:cart-updated", renderCartView);
    renderCartView();
  }

  /* ========================================================================
     8. CHECKOUT PAGE (checkout.html)
     ======================================================================== */
  function initCheckoutPage(app) {
    const checkoutMount = document.getElementById("checkout-page-mount");
    if (!checkoutMount) return;

    let deliveryAddon = 0;

    function updateCheckoutSummary() {
      const summaryItemsEl = document.getElementById("checkout-summary-items");
      const subtotalEl = document.getElementById("checkout-subtotal");
      const discountRowEl = document.getElementById("checkout-discount-row");
      const discountValEl = document.getElementById("checkout-discount-val");
      const shippingEl = document.getElementById("checkout-shipping");
      const totalEl = document.getElementById("checkout-total");

      const totals = app.calculateCartTotals();
      const { cart, subtotal, discountCode, discountAmount, shipping } = totals;
      const finalShipping = cart.length === 0 ? 0 : deliveryAddon > 0 ? deliveryAddon : shipping;
      const finalTotal = Math.max(0, subtotal - discountAmount) + finalShipping;

      if (summaryItemsEl) {
        if (cart.length === 0) {
          summaryItemsEl.innerHTML = `
            <div style="padding:1rem; background:var(--color-secondary); border-radius:var(--radius-sm); font-size:0.88rem; color:var(--color-text-muted);">
              Your cart is currently empty. <a href="shop.html" style="color:var(--color-primary); text-decoration:underline; font-weight:600;">Add products</a> to complete a demo order.
            </div>
          `;
        } else {
          summaryItemsEl.innerHTML = cart
            .map(
              (item) => `
            <div style="display:flex; align-items:center; justify-content:space-between; gap:0.75rem; padding:0.65rem 0; border-bottom:1px solid var(--color-border-subtle);">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; border-radius:var(--radius-xs); object-fit:cover; border:1px solid var(--color-border);">
                <div>
                  <div style="font-weight:600; font-size:0.9rem;">${item.name}</div>
                  <div style="font-size:0.78rem; color:var(--color-text-muted);">${item.size} × ${item.qty}</div>
                </div>
              </div>
              <strong style="font-size:0.92rem;">${app.formatMoney(item.price * item.qty)}</strong>
            </div>
          `
            )
            .join("");
        }
      }

      if (subtotalEl) subtotalEl.textContent = app.formatMoney(subtotal);
      if (discountRowEl && discountValEl) {
        discountRowEl.style.display = discountAmount > 0 ? "flex" : "none";
        discountValEl.textContent = `−${app.formatMoney(discountAmount)} (${discountCode})`;
      }
      if (shippingEl) {
        shippingEl.textContent = finalShipping === 0 ? "Free" : app.formatMoney(finalShipping);
      }
      if (totalEl) totalEl.textContent = app.formatMoney(finalTotal);
    }

    // Delivery method radio change
    document.querySelectorAll('input[name="deliveryMethod"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        deliveryAddon = parseFloat(radio.getAttribute("data-shipping-cost")) || 0;
        updateCheckoutSummary();
      });
    });

    // Billing address checkbox toggle
    const sameBillingCheck = document.getElementById("billing-same-checkbox");
    const customBillingFields = document.getElementById("custom-billing-fields");
    if (sameBillingCheck && customBillingFields) {
      sameBillingCheck.addEventListener("change", () => {
        customBillingFields.style.display = sameBillingCheck.checked ? "none" : "block";
      });
    }

    // Payment method tab highlight
    document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        const cardFields = document.getElementById("payment-card-fields");
        if (cardFields) {
          cardFields.style.display = radio.value === "Credit / Debit Card (Demo)" ? "block" : "none";
        }
      });
    });

    // Checkout form validation & submission
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.querySelectorAll(".form-control").forEach((inp) => {
        inp.addEventListener("input", () => inp.classList.remove("is-invalid"));
      });

      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const totals = app.calculateCartTotals();
        if (totals.cart.length === 0) {
          app.showToast("Your cart is empty. Please add a coconut product before placing an order.");
          return;
        }

        let valid = true;
        checkoutForm.querySelectorAll("[required]").forEach((inp) => {
          const val = inp.value.trim();
          let ok = val.length > 0;
          if (inp.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          inp.classList.toggle("is-invalid", !ok);
          if (!ok) valid = false;
        });

        if (!valid) {
          app.showToast("Please complete all required customer and shipping details.");
          return;
        }

        const firstName = checkoutForm.querySelector('[name="firstName"]')?.value || "Customer";
        const email = checkoutForm.querySelector('[name="email"]')?.value || "customer@example.com";
        const address = checkoutForm.querySelector('[name="address"]')?.value || "";
        const city = checkoutForm.querySelector('[name="city"]')?.value || "";
        const paymentMethod =
          checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value || "Card (Demo)";
        const orderNumber = `CA-${Math.floor(100000 + Math.random() * 900000)}`;
        const finalShipping = deliveryAddon > 0 ? deliveryAddon : totals.shipping;
        const finalTotal = Math.max(0, totals.subtotal - totals.discountAmount) + finalShipping;
        const orderedItems = [...totals.cart];

        // Clear cart upon order confirmation
        app.saveCart([]);
        app.setDiscountCode("");

        // Render Order Confirmation State
        checkoutMount.innerHTML = `
          <div style="max-width: 760px; margin: 0 auto; background: var(--color-surface); border: 1.5px solid var(--color-primary); border-radius: var(--radius-xl); padding: clamp(2rem, 4vw, 3.25rem); box-shadow: var(--shadow-md);">
            <div style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.4rem 1rem; border-radius:var(--radius-pill); background:var(--color-success-bg); color:var(--color-success); font-weight:700; font-size:0.8rem; margin-bottom:1.25rem;">
              ✓ ORDER CONFIRMED · FRONTEND ECOMMERCE DEMONSTRATION
            </div>
            <h2 class="heading-xl" style="margin-bottom:0.5rem;">Thank You for Your Order, ${firstName}!</h2>
            <p class="lead-text" style="margin-bottom:1.75rem;">
              Your sample order <strong>#${orderNumber}</strong> has been registered. A confirmation summary has been prepared for <strong>${email}</strong>.
            </p>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; padding:1.25rem; background:var(--color-secondary); border-radius:var(--radius-md); margin-bottom:1.75rem; font-size:0.88rem;">
              <div>
                <span style="color:var(--color-text-light); display:block;">Order Reference</span>
                <strong>#${orderNumber}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-light); display:block;">Shipping Destination</span>
                <strong>${address}, ${city}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-light); display:block;">Payment Method</span>
                <strong>${paymentMethod}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-light); display:block;">Total Charged (Demo)</span>
                <strong>${app.formatMoney(finalTotal)}</strong>
              </div>
            </div>

            <h3 class="heading-sm" style="margin-bottom:0.85rem;">Items in Your Shipment</h3>
            <div style="border-top:1px solid var(--color-border); margin-bottom:1.75rem;">
              ${orderedItems
                .map(
                  (item) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 0; border-bottom:1px solid var(--color-border-subtle);">
                  <div style="display:flex; align-items:center; gap:0.85rem;">
                    <img src="${item.image}" alt="${item.name}" style="width:52px; height:52px; border-radius:var(--radius-xs); object-fit:cover;">
                    <div>
                      <strong>${item.name}</strong>
                      <div style="font-size:0.82rem; color:var(--color-text-muted);">Size: ${item.size} · Qty: ${item.qty}</div>
                    </div>
                  </div>
                  <strong>${app.formatMoney(item.price * item.qty)}</strong>
                </div>
              `
                )
                .join("")}
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:0.85rem;">
              <a href="shop.html" class="btn btn-primary">Continue Exploring Stall Menu</a>
              <a href="index.html" class="btn btn-outline">Return to Homepage</a>
            </div>
          </div>
        `;
        window.scrollTo({ top: 0, behavior: "smooth" });
        app.showToast(`Order #${orderNumber} confirmed!`);
      });
    }

    updateCheckoutSummary();
  }
})();

