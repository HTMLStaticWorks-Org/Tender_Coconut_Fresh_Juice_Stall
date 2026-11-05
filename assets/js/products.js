/* ==========================================================================
   COCOAURA — Product Catalog, Categories, Testimonials & Brand Data
   Note: All pricing, batch lots, and specifications represent realistic
   sample demonstration data for the COCOAURA ecommerce showcase.
   ========================================================================== */

window.COCOAURA_DATA = {
  categories: [
    {
      id: "Virgin Coconut Oil",
      slug: "virgin-coconut-oil",
      name: "Virgin Coconut Oil",
      tagline: "Centrifuge-Spun Fresh Kernel Oil",
      description: "Pressed from fresh, mature white coconut kernel within hours of husking for a delicate aroma and clean finish.",
      image: "assets/images/cat-vco.jpg",
      productCount: 2
    },
    {
      id: "Cold-Pressed Coconut Oil",
      slug: "cold-pressed-coconut-oil",
      name: "Cold-Pressed Coconut Oil",
      tagline: "Unrefined Expeller-Pressed below 42°C",
      description: "Slow mechanical extraction preserving the warm, nutty character of sun-matured coastal coconuts.",
      image: "assets/images/product-cold-pressed.jpg",
      productCount: 2
    },
    {
      id: "Desiccated Coconut",
      slug: "desiccated-coconut",
      name: "Desiccated Coconut",
      tagline: "Snowy-White Fine & Medium Cuts",
      description: "Gently air-dried mature coconut meat with zero sweeteners, sulfites, or bleaching agents.",
      image: "assets/images/cat-desiccated.jpg",
      productCount: 2
    },
    {
      id: "Coconut Chips",
      slug: "coconut-chips",
      name: "Coconut Chips",
      tagline: "Crisp Slow-Toasted Kernel Ribbons",
      description: "Thick-shaved coconut ribbons kettle-baked in small batches for an irresistibly crisp texture.",
      image: "assets/images/cat-chips.jpg",
      productCount: 2
    },
    {
      id: "Coconut Water",
      slug: "coconut-water",
      name: "Coconut Water",
      tagline: "Single-Origin Tender Harvest",
      description: "Bottled at the grove from young green coconuts with a naturally crisp, refreshing mineral palate.",
      image: "assets/images/cat-water.jpg",
      productCount: 1
    }
  ],

  products: [
    {
      id: "vco-raw-glass",
      name: "Artisanal Raw Virgin Coconut Oil",
      category: "Virgin Coconut Oil",
      productType: "Culinary Oil",
      price: 24.00,
      compareAtPrice: 28.00,
      defaultSize: "500 ml",
      sizes: [
        { label: "250 ml", price: 15.00, sku: "CA-VCO-250" },
        { label: "500 ml", price: 24.00, sku: "CA-VCO-500" },
        { label: "1000 ml", price: 42.00, sku: "CA-VCO-1000" }
      ],
      badge: "Flagship Harvest",
      availability: "In Stock",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-vco-jar.jpg",
      gallery: [
        "assets/images/product-vco-jar.jpg",
        "assets/images/hero-main.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Centrifuge-extracted from fresh coconut milk within 6 hours of cracking. Crystal-clear when warm, velvety snow-white when cool.",
      description: "Our flagship Artisanal Raw Virgin Coconut Oil represents the purest expression of fresh tropical coconut. Harvested from mature 12-month coastal palms, the fresh white kernel is cold-pressed into rich coconut cream and spun in chilled stainless-steel centrifuges to separate the oil without heat or solvents. The result is an ultra-light, silky oil with a subtle, fresh-off-the-tree aroma that elevates everyday sautéing, baking, and natural body care rituals.",
      ingredients: "100% Pure Unrefined Virgin Coconut Oil (Cocos nucifera). Single-ingredient product.",
      specs: {
        extractionMethod: "Chilled Wet-Milling & Three-Stage Centrifuge (No Heat)",
        coconutSource: "Single-Origin Coastal Groves (12-Month Mature Coconuts)",
        packagingMaterial: "Heavyweight UV-Resistant Apothecary Flint Glass Jar with Bamboo-Clad Seal",
        moistureContent: "< 0.08% (Sample Batch Specification)",
        appearance: "Water-clear liquid above 24°C (76°F); creamy white solid below 24°C",
        sampleBatchId: "DEMO-LOT-VCO-2026A"
      },
      packagingInfo: "Packaged in food-grade recyclable glass jars with BPA-free inner freshness liners. Bulk 5L and 20L food-service pails available via Wholesale Enquiry.",
      storageInstructions: "Store in a cool, dry pantry away from direct sunlight. No refrigeration required. Note that pure virgin coconut oil naturally transitions between solid and liquid states around 24°C (76°F) with zero impact on quality.",
      usageSuggestions: [
        "Everyday medium-heat sautéing, pan-roasting vegetables, and fragrant curries.",
        "1:1 butter or oil replacement in artisanal pastry, granola, and plant-based baking.",
        "Finishing drizzle over warm grains, roasted sweet potatoes, or tropical smoothie bowls.",
        "Gentle topical moisture ritual for skin, hair ends, and cuticles."
      ],
      shippingInfo: "Ships in plastic-free molded pulp protective sleeves within 1–2 business days (Sample Demo Shipping Policy)."
    },
    {
      id: "vco-culinary-pour",
      name: "Chef's Pouring Virgin Coconut Oil",
      category: "Virgin Coconut Oil",
      productType: "Culinary Oil",
      price: 26.00,
      compareAtPrice: null,
      defaultSize: "500 ml",
      sizes: [
        { label: "500 ml", price: 26.00, sku: "CA-VCOP-500" },
        { label: "750 ml", price: 35.00, sku: "CA-VCOP-750" }
      ],
      badge: "Chef's Choice",
      availability: "In Stock",
      isFeatured: true,
      isNew: true,
      image: "assets/images/product-vco-bottle.jpg",
      gallery: [
        "assets/images/product-vco-bottle.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/product-vco-jar.jpg",
        "assets/images/sourcing-plantation.jpg"
      ],
      shortDesc: "Bottled in a slender countertop carafe with a precision pouring neck for effortless culinary prep and table finishing.",
      description: "Designed specifically for warm kitchens and culinary enthusiasts, our Chef's Pouring Virgin Coconut Oil pairs our signature first-press centrifuge oil with an ergonomic tall glass bottle and natural beechwood stopper. Clean on the palate with a delicate fresh coconut note.",
      ingredients: "100% Pure Unrefined Virgin Coconut Oil (Cocos nucifera).",
      specs: {
        extractionMethod: "Fresh-Milk Cold Centrifuge Extraction",
        coconutSource: "Smallholder Coastal Groves",
        packagingMaterial: "Tall Flint Glass Culinary Bottle with Natural Wood Stopper",
        moistureContent: "< 0.08% (Sample Batch Specification)",
        appearance: "Crystal clear above 24°C (76°F)",
        sampleBatchId: "DEMO-LOT-VCOP-2026B"
      },
      packagingInfo: "Recyclable tall glass carafe fitted with a precision drip-free neck insert.",
      storageInstructions: "Keep near your prep station out of direct sunlight. If oil solidifies in cooler winter room temperatures, stand bottle in a bowl of warm water for 5 minutes.",
      usageSuggestions: [
        "Precision pan-searing for seafood, tofu, and flatbreads.",
        "Whisking into warm citrus-coconut vinaigrettes and marinades.",
        "Popping heirloom stovetop popcorn with sea salt."
      ],
      shippingInfo: "Insulated recyclable corrugated shipper; dispatched within 24–48 hours."
    },
    {
      id: "cold-pressed-amber",
      name: "Estate Cold-Pressed Coconut Oil",
      category: "Cold-Pressed Coconut Oil",
      productType: "Culinary Oil",
      price: 22.00,
      compareAtPrice: 25.00,
      defaultSize: "500 ml",
      sizes: [
        { label: "250 ml", price: 14.00, sku: "CA-CPO-250" },
        { label: "500 ml", price: 22.00, sku: "CA-CPO-500" },
        { label: "1000 ml", price: 38.00, sku: "CA-CPO-1000" }
      ],
      badge: "Best Seller",
      availability: "In Stock",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-cold-pressed.jpg",
      gallery: [
        "assets/images/product-cold-pressed.jpg",
        "assets/images/process-extraction.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/sourcing-plantation.jpg"
      ],
      shortDesc: "Slow expeller-pressed from gently dehydrated mature coconut kernel below 42°C, housed in UV-protective amber apothecary glass.",
      description: "Our Estate Cold-Pressed Coconut Oil is crafted using traditional low-speed mechanical expellers kept strictly below 42°C (107°F). Settled naturally and triple-filtered through unbleached cotton cloth, it offers a slightly warmer, rounded coconut profile prized in traditional South Asian and tropical cooking.",
      ingredients: "100% Cold-Pressed Unrefined Coconut Oil (Cocos nucifera).",
      specs: {
        extractionMethod: "Low-RPM Expeller Cold Pressing (< 42°C)",
        coconutSource: "Sun-Matured Tall Variety Coconuts",
        packagingMaterial: "Amber Apothecary Glass Bottle",
        moistureContent: "< 0.10% (Sample Batch Specification)",
        appearance: "Pale ivory-gold liquid when warm; firm white solid when cool",
        sampleBatchId: "DEMO-LOT-CPO-2026C"
      },
      packagingInfo: "Amber pharmaceutical-grade glass protects light-sensitive botanical compounds.",
      storageInstructions: "Store sealed at ambient room temperature away from stove heat.",
      usageSuggestions: [
        "Traditional tempering of whole spices, curry leaves, and aromatics.",
        "Roasting root vegetables and crispy plantains.",
        "Warm oil hair & scalp conditioning rituals."
      ],
      shippingInfo: "Standard & Express domestic delivery available; wholesale pallet rates upon request."
    },
    {
      id: "cold-pressed-culinary-tin",
      name: "Pantry Reserve Cold-Pressed Coconut Oil",
      category: "Cold-Pressed Coconut Oil",
      productType: "Culinary Oil",
      price: 34.00,
      compareAtPrice: null,
      defaultSize: "1000 ml",
      sizes: [
        { label: "500 ml", price: 20.00, sku: "CA-CPOR-500" },
        { label: "1000 ml", price: 34.00, sku: "CA-CPOR-1000" }
      ],
      badge: "Value Size",
      availability: "In Stock",
      isFeatured: false,
      isNew: false,
      image: "assets/images/lifestyle-pouring.jpg",
      gallery: [
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/product-cold-pressed.jpg",
        "assets/images/process-extraction.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Generous 1-liter kitchen format of our unrefined cold-pressed coconut oil for daily family cooking and baking.",
      description: "Created for high-frequency home cooks and boutique bakeries, the Pantry Reserve format delivers our unrefined, cloth-filtered cold-pressed oil in a generous wide-mouth vessel that makes scooping or pouring effortless in any season.",
      ingredients: "100% Cold-Pressed Coconut Oil.",
      specs: {
        extractionMethod: "First-Press Mechanical Expeller",
        coconutSource: "Single-Origin Estate Harvest",
        packagingMaterial: "Wide-Mouth Recyclable Glass & Brushed Metal Lid",
        moistureContent: "< 0.10% (Sample Batch Specification)",
        appearance: "Pure white solid / clear liquid",
        sampleBatchId: "DEMO-LOT-CPOR-2026D"
      },
      packagingInfo: "Wide-mouth refill-friendly glass container.",
      storageInstructions: "Always use a clean, dry spoon when scooping to prevent moisture introduction.",
      usageSuggestions: [
        "High-volume baking, granola clusters, and raw dessert crusts.",
        "Everyday wok cooking and shallow frying."
      ],
      shippingInfo: "Carefully cushioned in double-walled kraft cartons."
    },
    {
      id: "desiccated-fine",
      name: "Snow-White Fine Desiccated Coconut",
      category: "Desiccated Coconut",
      productType: "Baking & Pantry",
      price: 12.00,
      compareAtPrice: 14.50,
      defaultSize: "400 g",
      sizes: [
        { label: "250 g", price: 8.50, sku: "CA-DC-250" },
        { label: "400 g", price: 12.00, sku: "CA-DC-400" },
        { label: "1000 g", price: 24.00, sku: "CA-DC-1000" }
      ],
      badge: "Unsweetened",
      availability: "In Stock",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-desiccated.jpg",
      gallery: [
        "assets/images/product-desiccated.jpg",
        "assets/images/cat-desiccated.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Finely grated mature white coconut kernel, gently warm-air dried to preserve natural richness without sulfites or added sugar.",
      description: "Unlike mass-market shredded coconut treated with metabisulfites or propylene glycol, COCOAURA Snow-White Fine Desiccated Coconut is pared, washed in spring water, finely milled, and slow-dried in indirect warm air within hours of cracking. It retains its naturally sweet coconut creaminess and fluffy texture.",
      ingredients: "100% Dehydrated Mature Coconut Kernel (Unsweetened, Sulfite-Free).",
      specs: {
        extractionMethod: "Fresh Kernel Paring, Fine Grating & Low-Temp Air Drying",
        coconutSource: "Hand-Selected Mature Estate Coconuts",
        packagingMaterial: "Resealable Matte Kraft Barrier Pouch",
        moistureContent: "< 3.0% (Sample Batch Specification)",
        appearance: "Snowy-white fine free-flowing granules",
        sampleBatchId: "DEMO-LOT-DCF-2026E"
      },
      packagingInfo: "Oxygen-barrier resealable pouch; 10kg and 25kg multi-wall kraft sacks available for bakeries and food manufacturers.",
      storageInstructions: "Reseal tightly after opening and store in a cool, dry cupboard. Can also be refrigerated for extended freshness.",
      usageSuggestions: [
        "Macaroons, coconut sponge cakes, tart shells, and shortbread.",
        "Rolling truffles, bliss balls, and artisan confections.",
        "Simmering into rich coastal sambols, chutneys, and korma pastes."
      ],
      shippingInfo: "Lightweight pantry pouch; ships flat-rate or free on orders over $60."
    },
    {
      id: "desiccated-medium-thread",
      name: "Artisan Medium-Shred Desiccated Coconut",
      category: "Desiccated Coconut",
      productType: "Baking & Pantry",
      price: 13.00,
      compareAtPrice: null,
      defaultSize: "400 g",
      sizes: [
        { label: "250 g", price: 9.00, sku: "CA-DCM-250" },
        { label: "400 g", price: 13.00, sku: "CA-DCM-400" },
        { label: "1000 g", price: 26.00, sku: "CA-DCM-1000" }
      ],
      badge: "Patisserie Cut",
      availability: "In Stock",
      isFeatured: false,
      isNew: true,
      image: "assets/images/cat-desiccated.jpg",
      gallery: [
        "assets/images/cat-desiccated.jpg",
        "assets/images/product-desiccated.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/sourcing-plantation.jpg"
      ],
      shortDesc: "Longer, tender ribbons of shredded coconut meat designed for textural contrast in pastry toppings, muesli, and toasted garnishes.",
      description: "Cut with custom stainless-steel shredding blades to produce delicate medium threads, this patisserie-grade desiccated coconut toasts to an even golden hue and lends prized chew and visual elegance to cakes, overnight oats, and savory salads.",
      ingredients: "100% Pure Shredded Coconut Kernel.",
      specs: {
        extractionMethod: "Custom Ribbon Shredding & Gentle Dehydration",
        coconutSource: "Mature Coastal Coconuts",
        packagingMaterial: "Resealable High-Barrier Stand-Up Pouch",
        moistureContent: "< 3.2% (Sample Batch Specification)",
        appearance: "Uniform snowy-white medium threads",
        sampleBatchId: "DEMO-LOT-DCM-2026F"
      },
      packagingInfo: "Moisture-locked zip pouch.",
      storageInstructions: "Keep sealed in a dry pantry below 25°C.",
      usageSuggestions: [
        "Toasted topping for layer cakes, pavlovas, and fruit crumbles.",
        "House-made tropical granola and bircher muesli mixes."
      ],
      shippingInfo: "Ships nationwide in protective mailers."
    },
    {
      id: "chips-golden-toasted",
      name: "Hearth-Toasted Golden Coconut Chips",
      category: "Coconut Chips",
      productType: "Ready-to-Eat Snack",
      price: 11.50,
      compareAtPrice: 13.00,
      defaultSize: "250 g",
      sizes: [
        { label: "150 g", price: 7.50, sku: "CA-CC-150" },
        { label: "250 g", price: 11.50, sku: "CA-CC-250" },
        { label: "500 g", price: 20.00, sku: "CA-CC-500" }
      ],
      badge: "Small Batch",
      availability: "In Stock",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-chips.jpg",
      gallery: [
        "assets/images/product-chips.jpg",
        "assets/images/cat-chips.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Wide, crisp shavings of fresh coconut kernel slow-baked to a caramel-golden crunch with a whisper of coconut blossom nectar.",
      description: "We shave thick ribbons directly from whole, fresh coconut halves and tumble-roast them in small rotary ovens until crisp and fragrant. Lightly glazed with a touch of unrefined coconut blossom nectar and sea salt, they are never fried and contain zero refined cane sugar or oils.",
      ingredients: "Fresh Coconut Kernel (92%), Unrefined Coconut Blossom Nectar (7%), Artisanal Sea Salt (1%).",
      specs: {
        extractionMethod: "Whole-Kernel Shaving & Rotary Oven Slow Toasting",
        coconutSource: "Freshly Husked Estate Coconuts",
        packagingMaterial: "Nitrogen-Flushed Resealable Craft Pouch",
        moistureContent: "< 2.5% for Optimal Crispness (Sample Spec)",
        appearance: "Wide golden-ivory toasted ribbons",
        sampleBatchId: "DEMO-LOT-CC-2026G"
      },
      packagingInfo: "Resealable freshness pouch flushed to preserve crunch.",
      storageInstructions: "Press air out before sealing zip lock to maintain crisp texture.",
      usageSuggestions: [
        "Wholesome straight-from-the-pouch afternoon snack.",
        "Crunchy topper for acai bowls, yogurt parfaits, and artisan ice cream.",
        "Textural garnish for Thai pomelo salads and roasted squash dishes."
      ],
      shippingInfo: "Packed in rigid boxes to prevent chip breakage during transit."
    },
    {
      id: "chips-raw-unsweetened",
      name: "Raw Sun-Dried Coconut Smiling Flakes",
      category: "Coconut Chips",
      productType: "Ready-to-Eat Snack",
      price: 11.00,
      compareAtPrice: null,
      defaultSize: "250 g",
      sizes: [
        { label: "250 g", price: 11.00, sku: "CA-CCR-250" },
        { label: "500 g", price: 19.50, sku: "CA-CCR-500" }
      ],
      badge: "Pure Single-Ingredient",
      availability: "In Stock",
      isFeatured: false,
      isNew: false,
      image: "assets/images/cat-chips.jpg",
      gallery: [
        "assets/images/cat-chips.jpg",
        "assets/images/product-chips.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/sourcing-plantation.jpg"
      ],
      shortDesc: "Unroasted, unsweetened wide coconut ribbons gently dehydrated below 45°C so you can toast, spice, or blend them your own way.",
      description: "For purists and culinary creators, our Raw Sun-Dried Coconut Flakes offer 100% pure shaved coconut meat with nothing added. Toast them in a dry skillet with smoked paprika for coconut bacon, or fold directly into trail mixes and raw chocolate bark.",
      ingredients: "100% Raw Dehydrated Coconut Kernel Ribbons.",
      specs: {
        extractionMethod: "Low-Temperature Dehydration (< 45°C)",
        coconutSource: "Mature Coastal Coconuts",
        packagingMaterial: "Resealable Matte Kraft Pouch",
        moistureContent: "< 3.0% (Sample Batch Specification)",
        appearance: "Creamy white wide flakes",
        sampleBatchId: "DEMO-LOT-CCR-2026H"
      },
      packagingInfo: "Recyclable barrier pouch.",
      storageInstructions: "Store in a cool, dry place.",
      usageSuggestions: [
        "Skillet-toasting with tamari and maple for plant-based savory toppings.",
        "Custom trail mixes, granola bars, and chocolate clusters."
      ],
      shippingInfo: "Standard shipping 2–4 business days."
    },
    {
      id: "water-tender-glass",
      name: "Single-Origin Tender Coconut Water",
      category: "Coconut Water",
      productType: "Beverage",
      price: 18.00,
      compareAtPrice: 21.00,
      defaultSize: "6 × 330 ml",
      sizes: [
        { label: "330 ml Bottle", price: 3.50, sku: "CA-CW-330" },
        { label: "6 × 330 ml", price: 18.00, sku: "CA-CW-6PK" },
        { label: "12 × 330 ml", price: 33.00, sku: "CA-CW-12PK" }
      ],
      badge: "Never From Concentrate",
      availability: "In Stock",
      isFeatured: true,
      isNew: true,
      image: "assets/images/product-water.jpg",
      gallery: [
        "assets/images/product-water.jpg",
        "assets/images/cat-water.jpg",
        "assets/images/sourcing-plantation.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Harvested from 7-month young green coconuts and bottled in frosted glass—never from concentrate, with zero added sugar.",
      description: "Harvested at the exact 7-month maturity window when natural sweetness and clarity peak, COCOAURA Tender Coconut Water is micro-filtered and bottled in recyclable frosted glass. Free from ascorbic acid preservatives or added sugars, it tastes remarkably like sipping straight from a freshly machete-opened coconut on the coast.",
      ingredients: "100% Pure Tender Coconut Water (Cocos nucifera).",
      specs: {
        extractionMethod: "Direct Single-Nut Extraction & Micro-Filtration",
        coconutSource: "7-Month Young Green & King Coconuts",
        packagingMaterial: "Frosted Recyclable Flint Glass Bottle with Tamper-Evident Cap",
        moistureContent: "Liquid Beverage (Brix 5.2° – 5.8° Sample Spec)",
        appearance: "Translucent opalescent liquid",
        sampleBatchId: "DEMO-LOT-CW-2026I"
      },
      packagingInfo: "Available as individual 330 ml glass bottles or 6-pack and 12-pack partitioned cases.",
      storageInstructions: "Store ambient before opening. Chill thoroughly before serving and consume within 24 hours of opening.",
      usageSuggestions: [
        "Served chilled over ice with a squeeze of fresh lime and mint.",
        "Clean liquid base for green smoothies and cold-pressed juices.",
        "Culinary poaching liquid for jasmine rice or tropical mocktails."
      ],
      shippingInfo: "Ships in molded bottle-safe cardboard dividers."
    },
    {
      id: "cream-velvet-jar",
      name: "Stone-Ground Artisanal Coconut Cream",
      category: "Virgin Coconut Oil",
      productType: "Culinary Cream & Spread",
      price: 16.50,
      compareAtPrice: null,
      defaultSize: "350 g",
      sizes: [
        { label: "250 g", price: 12.50, sku: "CA-CCRM-250" },
        { label: "350 g", price: 16.50, sku: "CA-CCRM-350" },
        { label: "500 g", price: 22.00, sku: "CA-CCRM-500" }
      ],
      badge: "Limited Harvest",
      availability: "Limited Harvest",
      isFeatured: false,
      isNew: true,
      image: "assets/images/product-cream.jpg",
      gallery: [
        "assets/images/product-cream.jpg",
        "assets/images/product-butter.jpg",
        "assets/images/product-flour.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Whole coconut kernel slowly stone-milled for 18 hours into a luscious, spoonable velvet cream for curries, frostings, and drizzles.",
      description: "Also known in artisanal kitchens as whole-kernel coconut butter or creamed coconut, our Stone-Ground Coconut Cream is made by slowly grinding gently dried coconut meat between granite wheels until it transforms into a silk-smooth purée. Whisk with warm water for instant, stabilizer-free coconut milk or spoon straight onto warm toast and berries.",
      ingredients: "100% Stone-Ground Whole Coconut Kernel.",
      specs: {
        extractionMethod: "18-Hour Low-Speed Granite Melanger Milling",
        coconutSource: "Mature Single-Origin White Kernel",
        packagingMaterial: "Wide-Mouth Glass Jar",
        moistureContent: "< 1.5% (Sample Batch Specification)",
        appearance: "Rich ivory-white velvet cream",
        sampleBatchId: "DEMO-LOT-CRM-2026J"
      },
      packagingInfo: "Recyclable glass jar with wide opening for easy stirring.",
      storageInstructions: "Store at room temperature. If natural oil rises to the top, warm the sealed jar slightly and stir thoroughly before use.",
      usageSuggestions: [
        "Blend 2 tablespoons with 1 cup warm water for instant gum-free coconut milk.",
        "Swirl into morning oatmeal, matcha lattes, or espresso.",
        "Base for silky dairy-free ganaches and cake glazes."
      ],
      shippingInfo: "Ships within 1–2 business days."
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "The clarity and delicate aroma of COCOAURA's Raw Virgin Coconut Oil immediately stood out in our pastry kitchen. You can tell the coconuts are processed fresh without industrial scorching.",
      author: "Chef Elena Rostova",
      role: "Executive Pastry Chef, Solis Botanical Kitchen (Sample Demo Review)",
      location: "San Francisco, CA",
      product: "Artisanal Raw Virgin Coconut Oil",
      rating: 5
    },
    {
      id: 2,
      quote: "Finding unsweetened, sulfite-free desiccated coconut that still tastes naturally creamy rather than dry and papery was a revelation. We now source both retail pouches and 25kg sacks.",
      author: "Marcus Vance",
      role: "Founder, Vance & Co. Granola Roasters (Sample Demo Review)",
      location: "Portland, OR",
      product: "Snow-White Fine Desiccated Coconut",
      rating: 5
    },
    {
      id: 3,
      quote: "From the heavyweight glass packaging to the Hearth-Toasted Coconut Chips, every detail feels intentional and honest. It's a staple on our kitchen counter every single day.",
      author: "Priya Nair-Lindqvist",
      role: "Culinary Stylist & Cookbook Author (Sample Demo Review)",
      location: "Austin, TX",
      product: "Hearth-Toasted Golden Coconut Chips",
      rating: 5
    }
  ],

  sourcingSteps: [
    {
      step: "01",
      title: "Coastal Grove Sourcing",
      subtitle: "Partnering with Multi-Generational Smallholder Farms",
      description: "We source from mineral-rich coastal coconut groves where palms are nourished by monsoon rains, sea breezes, and intercropped regenerative soils.",
      image: "assets/images/sourcing-plantation.jpg"
    },
    {
      step: "02",
      title: "Selection of Mature Coconuts",
      subtitle: "Hand-Graded 12-Month Harvests (7-Month for Water)",
      description: "Every coconut is hand-inspected after husking. Only fully matured 12-month nuts with thick, dense white kernel are selected for our oils, chips, and desiccated cuts.",
      image: "assets/images/process-selection.jpg"
    },
    {
      step: "03",
      title: "Cold Extraction & Gentle Processing",
      subtitle: "Within Hours of Cracking the Shell",
      description: "Fresh kernel is washed in filtered water and immediately cold-pressed or centrifuge-spun without chemical solvents, bleaching agents, or high-heat refining.",
      image: "assets/images/process-extraction.jpg"
    },
    {
      step: "04",
      title: "Artisanal Product Preparation",
      subtitle: "Precision Cutting, Slow Toasting & Stone Milling",
      description: "Whether shaving wide ribbons for our Hearth-Toasted Chips or air-drying snowy desiccated shreds, temperature and moisture are carefully monitored in small batches.",
      image: "assets/images/product-desiccated.jpg"
    },
    {
      step: "05",
      title: "Protective Glass & Barrier Packaging",
      subtitle: "Preserving Freshness & Aroma Naturally",
      description: "Oils and waters are bottled in inert glass while dry goods are sealed in high-barrier craft pouches to lock out light, oxygen, and humidity.",
      image: "assets/images/product-vco-jar.jpg"
    },
    {
      step: "06",
      title: "Direct Pantry & Wholesale Delivery",
      subtitle: "Traceable Batch Lots from Grove to Table",
      description: "Every bottle and pouch carries a sample batch lot identifier, shipping directly from climate-controlled storage to home kitchens and wholesale partners.",
      image: "assets/images/hero-home2.jpg"
    }
  ],

  faqs: [
    {
      category: "Product Enquiries",
      question: "Why does my Virgin Coconut Oil turn solid or liquid at different room temperatures?",
      answer: "Pure, unfractionated coconut oil has a natural melting point of approximately 24°C (76°F). In cooler rooms or winter months, it solidifies into a creamy snow-white butter; in warmer kitchens, it melts into a crystal-clear liquid. Transitioning between states is a natural hallmark of unrefined coconut oil and does not affect quality or shelf life."
    },
    {
      category: "Product Enquiries",
      question: "What is the difference between your Raw Virgin Coconut Oil and Cold-Pressed Coconut Oil?",
      answer: "Our Artisanal Raw Virgin Coconut Oil is extracted from fresh wet coconut milk using chilled high-speed centrifuges, yielding an ultra-light mouthfeel and delicate fresh coconut aroma. Our Estate Cold-Pressed Coconut Oil is expeller-pressed below 42°C from gently dried mature coconut kernel, offering a slightly warmer, nutty culinary note."
    },
    {
      category: "Bulk & Wholesale",
      question: "What are the minimum order quantities (MOQs) for Bulk & Wholesale enquiries?",
      answer: "For retail-ready case packs (glass jars, bottles, and pouches), our sample wholesale MOQ starts at 4 master cases per SKU. For food-service and manufacturing formats (5L/20L oil pails, 200L drums, and 10kg/25kg desiccated coconut kraft sacks), MOQs start at 100 kg or 1 pallet. Use our Bulk Enquiry form for a tailored quotation."
    },
    {
      category: "Packaging & Storage",
      question: "Do your desiccated coconut or coconut chips contain sulfites or preservatives?",
      answer: "Never. All COCOAURA dry coconut products are free from sulfur dioxide, metabisulfites, artificial whiteners, and synthetic preservatives. We rely on prompt processing of fresh coconuts and moisture-barrier packaging."
    },
    {
      category: "Shipping & Returns",
      question: "How are glass jars and bottles protected during shipping?",
      answer: "Every glass jar and bottle is cushioned inside custom-molded biodegradable pulp sleeves and double-walled corrugated cartons. If any item arrives damaged in transit, contact our support team within 7 days for an immediate replacement (Sample Demo Policy)."
    }
  ]
};

