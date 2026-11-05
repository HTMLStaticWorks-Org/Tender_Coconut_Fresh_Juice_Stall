/* ==========================================================================
   Tender Coconut & Fresh Juice Stall — Product Catalog, Categories,
   Testimonials & Brand Data
   All pricing, live prep details, and stall specifications represent realistic
   sample demonstration data for Tender Coconut & Fresh Juice Stall.
   ========================================================================== */

window.COCOAURA_DATA = {
  stallName: "Tender Coconut & Fresh Juice Stall",
  tagline: "Farm-Fresh Tender Coconut & 100% Pure Squeezed Juices",
  brandDescription: "Your neighborhood tropical hydration bar serving freshly cut green tender coconuts, pure cold-pressed fruit juices, creamy coconut malai shakes, and live stall catering for weddings and events.",

  categories: [
    {
      id: "Tender Coconuts",
      slug: "tender-coconuts",
      name: "Tender Coconuts",
      tagline: "Hand-Picked Green & Royal Coastal Coconuts",
      description: "Farm-fresh green tender coconuts cut open live before you. Packed with natural electrolytes, refreshing water, and soft spoonable malai.",
      image: "assets/images/cat-vco.jpg",
      productCount: 2
    },
    {
      id: "Cold-Pressed Juices",
      slug: "cold-pressed-juices",
      name: "Cold-Pressed Juices",
      tagline: "100% Raw Squeezed Fruit Elixirs",
      description: "Slow-pressed pure sugarcane, fresh Valencia orange, ruby pomegranate, and chilled watermelon with zero added sugar, water, or preservatives.",
      image: "assets/images/product-cold-pressed.jpg",
      productCount: 4
    },
    {
      id: "Malai Shakes & Smoothies",
      slug: "malai-shakes-smoothies",
      name: "Malai Shakes & Smoothies",
      tagline: "Velvety Blends with Fresh Coconut Meat",
      description: "Soft tender coconut flesh (malai) blended fresh with chilled coconut water into rich, dairy-free shakes and luscious dessert cups.",
      image: "assets/images/cat-desiccated.jpg",
      productCount: 2
    },
    {
      id: "Coolers & Detox",
      slug: "coolers-detox",
      name: "Coolers & Detox",
      tagline: "Hydrating Coolers & ABC Cleanse",
      description: "Zesty lime-mint coconut water mocktails and nutrient-dense apple-beetroot-carrot cold-pressed detox cleansers.",
      image: "assets/images/cat-chips.jpg",
      productCount: 1
    },
    {
      id: "Bottled Coconut Water",
      slug: "bottled-coconut-water",
      name: "Bottled Coconut Water",
      tagline: "Grove-Bottled Pure Raw Nariyal Pani",
      description: "Unpasteurized, chilled raw tender coconut water bottled directly at the grove in eco-friendly glass bottles for on-the-go hydration.",
      image: "assets/images/cat-water.jpg",
      productCount: 1
    }
  ],

  products: [
    {
      id: "vco-raw-glass",
      name: "Farm-Fresh Green Tender Coconut",
      category: "Tender Coconuts",
      productType: "Live Decapped Coconut",
      price: 4.50,
      compareAtPrice: 5.50,
      defaultSize: "Regular Green (350ml)",
      sizes: [
        { label: "Regular Green (350ml)", price: 4.50, sku: "TC-GREEN-350" },
        { label: "Jumbo Royal (500ml)", price: 6.00, sku: "TC-ROYAL-500" },
        { label: "Tender Malai Cup Combo", price: 8.00, sku: "TC-COMBO-800" }
      ],
      badge: "Stall Favorite",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-vco-jar.jpg",
      gallery: [
        "assets/images/product-vco-jar.jpg",
        "assets/images/hero-main.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Harvested fresh and sliced open live at our stall counter. Overflowing with sweet natural electrolyte water and delicate spoonable malai.",
      description: "Our signature Farm-Fresh Green Tender Coconut is the crown jewel of our stall. Hand-harvested at optimal 7-month maturity from sun-bathed coastal groves, each coconut is washed, chilled, and machete-sliced to order. Sip the crisp, naturally chilled electrolyte water through a compostable paper straw, then ask our stall master to split the shell and scoop out the silky, snow-white tender coconut meat (malai). 100% pure nature with zero added sugars or preservatives.",
      ingredients: "100% Pure Raw Green Tender Coconut (Cocos nucifera). Zero additives, zero water added.",
      specs: {
        extractionMethod: "Live Stall Decapping & Freshly Sliced to Order",
        coconutSource: "Hand-Graded Daily from Coastal Palm Groves",
        packagingMaterial: "Natural Biodegradable Green Husk with Compostable Paper Straw",
        moistureContent: "Naturally Chilled Pure Coconut Water (Brix 5.4°)",
        appearance: "Opalescent crystal-clear liquid with velvety tender malai",
        sampleBatchId: "STALL-LOT-FRESH-DAILY"
      },
      packagingInfo: "Served in its natural green coconut shell with food-grade paper straw and bamboo spoon. Takeaway insulated bag available upon request.",
      storageInstructions: "Best enjoyed immediately upon decapping at our counter. If taking home unopened, refrigerate and consume within 2 days.",
      usageSuggestions: [
        "Instant post-workout hydration and natural electrolyte replenishment.",
        "Midday revitalizer under the warm afternoon sun.",
        "Healthy morning cleanse before breakfast."
      ],
      shippingInfo: "Available for live stall pickup and local on-demand chilled delivery within 45 minutes."
    },
    {
      id: "vco-culinary-pour",
      name: "Cold-Pressed Sugarcane Juice",
      category: "Cold-Pressed Juices",
      productType: "Cold-Crushed Juice",
      price: 4.00,
      compareAtPrice: null,
      defaultSize: "Regular Glass (350 ml)",
      sizes: [
        { label: "Regular Glass (350 ml)", price: 4.00, sku: "SC-JUICE-350" },
        { label: "Large Tumbler (500 ml)", price: 5.50, sku: "SC-JUICE-500" }
      ],
      badge: "Cold-Crushed Live",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: true,
      image: "assets/images/product-cold-pressed.jpg",
      gallery: [
        "assets/images/product-cold-pressed.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/hero-main.jpg",
        "assets/images/process-extraction.jpg"
      ],
      shortDesc: "Peeled organic sugarcane stalks crushed live through stainless steel cold rollers with fresh ginger, mint, and a squeeze of lime.",
      description: "Experience the timeless delight of freshly crushed sugarcane juice made with the highest hygiene standards. We feed crisp, hand-peeled sugarcane stalks through our chilled stainless-steel press alongside spicy organic ginger and garden-picked mint, finishing with a zesty squeeze of key lime over crushed ice. Incomparably refreshing and naturally rich in iron, magnesium, and natural enzymes.",
      ingredients: "Fresh Sugarcane Stalks (96%), Organic Ginger (2%), Fresh Mint (1%), Fresh Key Lime (1%).",
      specs: {
        extractionMethod: "Slow Stainless-Steel Roller Cold-Extraction (No Heat)",
        coconutSource: "Locally Sourced Organic Cane Farms",
        packagingMaterial: "BPA-Free Recyclable Cups or Chilled Glass Bottling",
        moistureContent: "100% Cold-Crushed Raw Juice (Zero Added Sugar or Water)",
        appearance: "Frothy pale jade-green juice with fragrant citrus aroma",
        sampleBatchId: "STALL-LOT-CANE-2026"
      },
      packagingInfo: "Poured to order in sealed spill-proof takeaway cups with ice-separation lid.",
      storageInstructions: "Consume immediately for peak flavor and enzymatic vitality; best within 2 hours if refrigerated.",
      usageSuggestions: [
        "Instant natural energy boost during afternoon slumps.",
        "Pair with zesty street snacks and savory light bites.",
        "Wholesome alternative to carbonated soft drinks."
      ],
      shippingInfo: "Prepared fresh to order; takeaway counter pickup or express stall dispatch."
    },
    {
      id: "cold-pressed-amber",
      name: "Pure Valencia Orange Cold-Pressed Juice",
      category: "Cold-Pressed Juices",
      productType: "100% Citrus Juice",
      price: 5.00,
      compareAtPrice: 6.00,
      defaultSize: "Chilled Glass (350 ml)",
      sizes: [
        { label: "Regular Glass (300 ml)", price: 4.50, sku: "OR-JUICE-300" },
        { label: "Chilled Glass (350 ml)", price: 5.00, sku: "OR-JUICE-350" },
        { label: "Takeaway Bottle (500 ml)", price: 7.50, sku: "OR-JUICE-500" }
      ],
      badge: "100% Pure Squeezed",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-nectar.jpg",
      gallery: [
        "assets/images/product-nectar.jpg",
        "assets/images/hero-home2.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/lifestyle-pouring.jpg"
      ],
      shortDesc: "Golden, sweet-tart Valencia oranges cold-pressed on order with zero added sugar, zero water, and bursting with fresh Vitamin C.",
      description: "Our Valencia Orange Juice is pressed fresh on our hydraulic citrus extraction press every morning. We select tree-ripened oranges at peak sweetness, slicing and pressing them gently so that zero bitter peel oil enters the glass. The result is pure, vibrant sunshine in a glass with a silky smooth texture and natural citrus sweetness that store-bought carton juices can never match.",
      ingredients: "100% Fresh Cold-Pressed Valencia Oranges. Zero added sugar, zero preservatives.",
      specs: {
        extractionMethod: "Gentle Low-Speed Citrus Pressing",
        coconutSource: "Sun-Drenched Citrus Groves",
        packagingMaterial: "Flint Glass Bottle or Compostable Takeaway Cup",
        moistureContent: "100% Pure Raw Citrus Juice",
        appearance: "Vibrant glowing golden-orange with silky natural fruit pulp",
        sampleBatchId: "STALL-LOT-CITRUS-2026"
      },
      packagingInfo: "Bottled in food-grade recyclable bottles with hermetic freshness cap.",
      storageInstructions: "Keep chilled at 2°C–4°C. Consume within 24 hours.",
      usageSuggestions: [
        "Essential morning breakfast companion packed with immune-supporting Vitamin C.",
        "Post-workout refreshing thirst quencher.",
        "Splash into chilled tender coconut water for a tropical citrus spritzer."
      ],
      shippingInfo: "Chilled on ice packs during express local courier delivery."
    },
    {
      id: "cold-pressed-culinary-tin",
      name: "Ruby Pomegranate Cold-Pressed Juice",
      category: "Cold-Pressed Juices",
      productType: "Antioxidant Superjuice",
      price: 6.50,
      compareAtPrice: null,
      defaultSize: "Chilled Tumbler (350 ml)",
      sizes: [
        { label: "Chilled Tumbler (350 ml)", price: 6.50, sku: "POM-JUICE-350" },
        { label: "Stall Bottle (500 ml)", price: 9.50, sku: "POM-JUICE-500" }
      ],
      badge: "Superfood Pure",
      availability: "Fresh Daily",
      isFeatured: false,
      isNew: false,
      image: "assets/images/product-vco-bottle.jpg",
      gallery: [
        "assets/images/product-vco-bottle.jpg",
        "assets/images/hero-home2.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Cold-pressed from ruby-red pomegranate arils without bitter pith, delivering rich antioxidant sweetness and deep crimson color.",
      description: "Each 350ml glass requires over three whole sun-ripened pomegranates. Our stall team carefully deseed the fruit to extract the ruby arils, then applies gentle cold pressure to release the deep crimson nectar while avoiding the bitter white pith. Renowned as a cardiovascular superfood, this juice is deeply satisfying, naturally tart-sweet, and rich in polyphenols.",
      ingredients: "100% Pure Cold-Pressed Pomegranate Arils (Punica granatum).",
      specs: {
        extractionMethod: "Pith-Free Cold Hydraulic Extraction",
        coconutSource: "Highland Organic Pomegranate Orchards",
        packagingMaterial: "Heavyweight Flint Glass Bottle",
        moistureContent: "100% Pure Raw Fruit Juice",
        appearance: "Deep ruby crimson nectar with rich jewel clarity",
        sampleBatchId: "STALL-LOT-POM-2026"
      },
      packagingInfo: "Packaged in chilled glass bottles to protect delicate polyphenol antioxidants.",
      storageInstructions: "Keep refrigerated below 4°C. Shake gently before drinking.",
      usageSuggestions: [
        "Morning antioxidant shot for cardiovascular health and glowing skin.",
        "Elegant non-alcoholic dinner drink served in a wine glass with crushed ice.",
        "Blended with tender coconut water for an exquisite mocktail."
      ],
      shippingInfo: "Dispatched in chilled cold-chain containers for maximum freshness."
    },
    {
      id: "desiccated-fine",
      name: "Classic Tender Coconut Malai Shake",
      category: "Malai Shakes & Smoothies",
      productType: "Thick Coconut Shake",
      price: 5.50,
      compareAtPrice: 6.50,
      defaultSize: "Mason Jar (350 ml)",
      sizes: [
        { label: "Medium Cup (300 ml)", price: 4.50, sku: "CS-SHAKE-300" },
        { label: "Mason Jar (350 ml)", price: 5.50, sku: "CS-SHAKE-350" },
        { label: "Large Malai Monster (500 ml)", price: 7.50, sku: "CS-SHAKE-500" }
      ],
      badge: "House Specialty",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-cream.jpg",
      gallery: [
        "assets/images/product-cream.jpg",
        "assets/images/cat-desiccated.jpg",
        "assets/images/product-butter.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Freshly scooped tender coconut meat blended with chilled coconut water and creamy base, crowned with soft malai slivers and roasted nuts.",
      description: "Our signature dessert beverage and top customer favorite! We crack fresh tender coconuts, scoop out the soft white malai, and blend it on high speed with sweet coconut water and a dash of natural cardamom and blossom nectar. Velvety smooth, ultra-creamy, and topped with crunchy roasted pistachios and tender coconut ribbons, this shake is a tropical dream come true.",
      ingredients: "Fresh Tender Coconut Malai (60%), Raw Tender Coconut Water (35%), Pure Blossom Nectar (4%), Green Cardamom & Roasted Pistachios (1%).",
      specs: {
        extractionMethod: "Live Blade Blending of Fresh Coconut Meat & Water",
        coconutSource: "Select Young Coconuts with Soft, Thick Malai",
        packagingMaterial: "Fluted Glass Mason Jar or Recyclable PET Shake Cup",
        moistureContent: "Thick Creamy Smoothie Shake",
        appearance: "Silky ivory-white creamy blend with pistachio garnish",
        sampleBatchId: "STALL-LOT-SHAKE-2026"
      },
      packagingInfo: "Served with an extra-wide bamboo or paper boba straw and spoon.",
      storageInstructions: "Best savored ice-cold within 1 hour of blending.",
      usageSuggestions: [
        "Decadent yet natural healthy afternoon dessert.",
        "Guilt-free post-workout meal replacement packed with healthy medium-chain fats.",
        "Refreshing tropical breakfast on the run."
      ],
      shippingInfo: "Prepared on demand for instant counter collection or express bike courier."
    },
    {
      id: "desiccated-medium-thread",
      name: "Chilled Watermelon Splash Fresh Juice",
      category: "Cold-Pressed Juices",
      productType: "Hydrating Summer Juice",
      price: 4.50,
      compareAtPrice: null,
      defaultSize: "Tall Glass (350 ml)",
      sizes: [
        { label: "Regular Glass (350 ml)", price: 4.50, sku: "WM-JUICE-350" },
        { label: "Large Tumbler (500 ml)", price: 6.00, sku: "WM-JUICE-500" },
        { label: "Party Pitcher (1000 ml)", price: 11.00, sku: "WM-JUICE-1000" }
      ],
      badge: "Summer Refresher",
      availability: "Fresh Daily",
      isFeatured: false,
      isNew: true,
      image: "assets/images/product-desiccated.jpg",
      gallery: [
        "assets/images/product-desiccated.jpg",
        "assets/images/hero-main.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Sun-ripened red watermelon cold-pressed with crushed ice, garden-fresh mint, and a delicate touch of Himalayan black salt.",
      description: "Nothing quenches deep summer thirst quite like crisp, ruby-red watermelon juice. Sliced from whole ripe watermelons and cold-pressed with fresh garden mint leaves and a delicate pinch of pink rock salt to heighten the natural fruit sweetness, every chilled sip is pure, cooling relief.",
      ingredients: "100% Fresh Seedless Watermelon, Garden Mint, Lemon Juice, Himalayan Pink Salt.",
      specs: {
        extractionMethod: "Cold Hydraulic Pulp Filtration",
        coconutSource: "Sun-Ripened Farm Melons",
        packagingMaterial: "Clear Eco Cup with Dome Lid",
        moistureContent: "100% Raw Hydration Juice (No Added Sugar)",
        appearance: "Bright ruby pink juice with crushed ice and mint leaf",
        sampleBatchId: "STALL-LOT-MELON-2026"
      },
      packagingInfo: "Poured over crushed crystal ice in insulated cups.",
      storageInstructions: "Keep ice-cold; drink within 4 hours.",
      usageSuggestions: [
        "Instant cooling relief on warm sunny afternoons.",
        "Ideal hydrator for kids, athletes, and outdoor gatherings.",
        "Mix 50/50 with tender coconut water for the ultimate tropical refresher."
      ],
      shippingInfo: "Dispatched with thermal wrap to preserve ice-cold temperature."
    },
    {
      id: "chips-golden-toasted",
      name: "Lime & Mint Tender Coconut Cooler",
      category: "Coolers & Detox",
      productType: "Hydration Mocktail",
      price: 5.00,
      compareAtPrice: 6.00,
      defaultSize: "Chilled Glass (350 ml)",
      sizes: [
        { label: "Tall Glass (350 ml)", price: 5.00, sku: "TC-COOL-350" },
        { label: "Grande Tumbler (500 ml)", price: 7.00, sku: "TC-COOL-500" },
        { label: "Party Jug (1000 ml)", price: 12.00, sku: "TC-COOL-1000" }
      ],
      badge: "Stall Signature",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: false,
      image: "assets/images/product-chips.jpg",
      gallery: [
        "assets/images/product-chips.jpg",
        "assets/images/cat-chips.jpg",
        "assets/images/lifestyle-pouring.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Pure tender coconut water shaken over crushed ice with fresh muddled mint, key lime slices, and subtle pink Himalayan salt.",
      description: "Our signature thirst-buster elevates raw tender coconut water to gourmet cocktail heights. We muddle aromatic garden mint and juicy lime wheels directly in a cocktail shaker, pour in chilled fresh tender coconut water, add crystal ice, and shake vigorously. Lightly effervescent on the tongue, deeply hydrating, and revitalizing to the soul.",
      ingredients: "Pure Tender Coconut Water (85%), Fresh Key Lime (8%), Garden Mint (5%), Himalayan Salt & Chia Seeds (2%).",
      specs: {
        extractionMethod: "Hand-Muddled & Chilled Shaker Preparation",
        coconutSource: "Fresh 7-Month Green Coconuts",
        packagingMaterial: "Tall Tempered Glass or Frosted Takeaway Tumbler",
        moistureContent: "Electrolyte-Infused Cold Mocktail",
        appearance: "Pale opalescent cooler with floating lime wheels and emerald mint leaves",
        sampleBatchId: "STALL-LOT-COOL-2026"
      },
      packagingInfo: "Sealed with dome lid and extra-wide biodegradable straw.",
      storageInstructions: "Best consumed ice-cold right after shaking.",
      usageSuggestions: [
        "Beat the midday heat with rapid electrolyte replenishment.",
        "Sophisticated non-alcoholic cocktail for social gatherings and parties.",
        "Pre-workout hydration booster."
      ],
      shippingInfo: "Shipped in sealed leak-proof cups with ice barrier."
    },
    {
      id: "chips-raw-unsweetened",
      name: "ABC Vitality Detox Fresh Juice",
      category: "Coolers & Detox",
      productType: "100% Cold-Pressed Cleanse",
      price: 5.50,
      compareAtPrice: null,
      defaultSize: "Cleanse Bottle (350 ml)",
      sizes: [
        { label: "Cleanse Glass (350 ml)", price: 5.50, sku: "ABC-JUICE-350" },
        { label: "Immunity Double (500 ml)", price: 8.00, sku: "ABC-JUICE-500" }
      ],
      badge: "100% Raw Detox",
      availability: "Fresh Daily",
      isFeatured: false,
      isNew: false,
      image: "assets/images/cat-chips.jpg",
      gallery: [
        "assets/images/cat-chips.jpg",
        "assets/images/product-chips.jpg",
        "assets/images/process-selection.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "Crisp red apples, earthy deep beetroot, sweet carrots, and a hint of ginger cold-pressed into an energizing vitality cleanse.",
      description: "The gold standard of daily cleansing! Our stall cold-presses crisp red apples, antioxidant-rich dark beets, sweet garden carrots, and a kick of warming fresh ginger root into a powerhouse tonic. Packed with nitrates for stamina, Vitamin A for vision, and polyphenols for natural liver support with zero sweeteners or preservatives.",
      ingredients: "Crisp Apples (40%), Garden Carrots (35%), Raw Beetroot (20%), Fresh Ginger & Lemon (5%).",
      specs: {
        extractionMethod: "High-Pressure Hydraulic Cold Press (Zero Friction Heat)",
        coconutSource: "Locally Harvested Root & Orchard Produce",
        packagingMaterial: "Flint Glass Cleanse Bottle with Tight Twist Seal",
        moistureContent: "100% Pure Raw Vegetable & Fruit Juice",
        appearance: "Deep vibrant purple-garnet with smooth velvety texture",
        sampleBatchId: "STALL-LOT-ABC-2026"
      },
      packagingInfo: "Bottled in sterile UV-resistant glass bottles.",
      storageInstructions: "Refrigerate at 2°C–4°C and drink within 24–36 hours.",
      usageSuggestions: [
        "Drink first thing in the morning on an empty stomach for deep cellular detox.",
        "Pre-run or pre-workout endurance tonic.",
        "Key component of our 3-day and 5-day fresh juice cleanse plans."
      ],
      shippingInfo: "Delivered chilled every morning for cleanse subscribers."
    },
    {
      id: "water-tender-glass",
      name: "Pure Bottled Raw Tender Coconut Water",
      category: "Bottled Coconut Water",
      productType: "Takeaway Glass Bottle",
      price: 3.50,
      compareAtPrice: 4.50,
      defaultSize: "Glass Bottle (330 ml)",
      sizes: [
        { label: "Single Bottle (330 ml)", price: 3.50, sku: "CW-BOTTLE-330" },
        { label: "Stall 6-Pack (6 × 330 ml)", price: 18.00, sku: "CW-PACK-6PK" },
        { label: "Weekly Hydration Case (12 × 330 ml)", price: 32.00, sku: "CW-PACK-12PK" }
      ],
      badge: "Pure Grove Water",
      availability: "Fresh Daily",
      isFeatured: true,
      isNew: true,
      image: "assets/images/product-water.jpg",
      gallery: [
        "assets/images/product-water.jpg",
        "assets/images/cat-water.jpg",
        "assets/images/sourcing-plantation.jpg",
        "assets/images/hero-home2.jpg"
      ],
      shortDesc: "100% raw tender coconut water bottled fresh to order in chilled recyclable glass with zero heat processing or preservatives.",
      description: "For busy folks on the move who want the pure experience of a freshly cracked coconut in convenient takeaway form. Harvested at the dawn hours and micro-filtered straight from young green coconuts into chilled glass bottles, this water preserves all heat-sensitive electrolytes, enzymes, and the pure, sweet aroma of coastal palms. Zero concentrate, zero sugar, zero compromise.",
      ingredients: "100% Pure Raw Tender Coconut Water (Cocos nucifera).",
      specs: {
        extractionMethod: "Aseptic Direct Cold-Bottling & Micro-Filtration",
        coconutSource: "7-Month Young Coastal Palms",
        packagingMaterial: "Frosted Recyclable Glass Bottle with Tamper-Evident Cap",
        moistureContent: "100% Natural Electrolyte Water (Brix 5.4°)",
        appearance: "Crystal-clear opalescent liquid with delicate natural aroma",
        sampleBatchId: "STALL-LOT-BOTTLE-2026"
      },
      packagingInfo: "Available as single grab-and-go bottles or convenient 6-pack and 12-pack cases.",
      storageInstructions: "Store cold at 2°C–5°C. Best consumed within 48 hours.",
      usageSuggestions: [
        "Stash in gym bag or office fridge for clean, unadulterated hydration.",
        "Wholesome post-yoga or marathon rehydration.",
        "Add fresh mint sprigs or berries for fruit-infused water."
      ],
      shippingInfo: "Shipped in cushioned recyclable pulp trays with ice packs."
    },
    {
      id: "cream-velvet-jar",
      name: "Tender Coconut Malai Dessert Pudding",
      category: "Malai Shakes & Smoothies",
      productType: "Fresh Coconut Dessert",
      price: 5.00,
      compareAtPrice: null,
      defaultSize: "Dessert Cup (200 g)",
      sizes: [
        { label: "Classic Cup (200 g)", price: 5.00, sku: "TC-PUD-200" },
        { label: "Double Malai Tub (350 g)", price: 8.00, sku: "TC-PUD-350" },
        { label: "Party Sharing Bowl (500 g)", price: 12.00, sku: "TC-PUD-500" }
      ],
      badge: "Fresh Daily Special",
      availability: "Limited Daily Batch",
      isFeatured: false,
      isNew: true,
      image: "assets/images/product-butter.jpg",
      gallery: [
        "assets/images/product-butter.jpg",
        "assets/images/product-cream.jpg",
        "assets/images/cat-desiccated.jpg",
        "assets/images/process-selection.jpg"
      ],
      shortDesc: "Silky soft fresh tender coconut meat whipped with fresh coconut cream and natural blossom nectar into a decadent chilled pudding.",
      description: "A cult stall favorite that sells out daily! Our culinary team takes spoon-tender fresh coconut malai, folds it gently with rich cold coconut cream and a hint of palm blossom nectar, and chills it into an ethereal, melt-in-the-mouth pudding. Completely vegan, gelatin-free, and naturally sweet, it's the ultimate tropical indulgence.",
      ingredients: "Fresh Tender Coconut Malai (75%), Cold Coconut Milk (20%), Natural Blossom Nectar (4%), Madagascan Vanilla Pod (1%).",
      specs: {
        extractionMethod: "Gentle Whipping & Cold Set (Gelatin-Free)",
        coconutSource: "Hand-Scooped Malai from Today's Coconuts",
        packagingMaterial: "Eco Kraft Cup with Wooden Spoon or Reusable Glass Jar",
        moistureContent: "Silky Spoonable Pudding Cream",
        appearance: "Snowy ivory-white pudding with fresh coconut curls",
        sampleBatchId: "STALL-LOT-MALAI-2026"
      },
      packagingInfo: "Sealed fresh with compostable lid and wooden spoon.",
      storageInstructions: "Keep refrigerated below 4°C. Enjoy chilled within 2 days.",
      usageSuggestions: [
        "Clean, guilt-free tropical dessert after lunch or dinner.",
        "Delicious topping over sliced fresh mangoes and papayas.",
        "Swirled into morning breakfast bowls or chia seeds."
      ],
      shippingInfo: "Packed in insulated cold-wrap for same-day delivery."
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Stopping by this tender coconut and fresh juice stall after my morning run has become my daily ritual. The coconuts are sliced open right in front of you, ice-cold and bursting with sweet water!",
      author: "Arun Malhotra",
      role: "Marathon Runner & Daily Stall Regular",
      location: "Bandra West, Mumbai",
      product: "Farm-Fresh Green Tender Coconut",
      rating: 5
    },
    {
      id: 2,
      quote: "We hired their live Tender Coconut & Fresh Juice counter for our wedding reception. Guests were blown away by the live coconut decapping and freshly squeezed sugarcane and pomegranate juices!",
      author: "Kavita & Rohan Deshmukh",
      role: "Wedding Hosts & Event Clients",
      location: "Bengaluru, Karnataka",
      product: "Live Stall Catering Counter",
      rating: 5
    },
    {
      id: 3,
      quote: "The Tender Coconut Malai Shake is out of this world. Super thick, perfectly sweet without any refined sugar, and generous chunks of fresh soft coconut flesh. Absolutely addictive!",
      author: "Dr. Maya Swaminathan",
      role: "Nutritionist & Health Advocate",
      location: "Chennai, Tamil Nadu",
      product: "Classic Tender Coconut Malai Shake",
      rating: 5
    }
  ],

  sourcingSteps: [
    {
      step: "01",
      title: "Coastal Grove Harvest",
      subtitle: "Harvested at Sunrise from Partner Palm Orchards",
      description: "Every morning before sunrise, expert climbers hand-harvest tender green coconuts at the exact 7-month window when water sweetness and electrolyte density reach their peak.",
      image: "assets/images/sourcing-plantation.jpg"
    },
    {
      step: "02",
      title: "Daily Stall Grading",
      subtitle: "Thump-Tested for Water Volume & Tender Meat",
      description: "Coconuts and orchard fruits arrive at our stall within hours. Each coconut is graded by weight, husk condition, and resonant sound to ensure heavy water and velvety malai.",
      image: "assets/images/process-selection.jpg"
    },
    {
      step: "03",
      title: "Live Stall Decapping & Squeezing",
      subtitle: "Cut & Cold-Pressed Live Before Your Eyes",
      description: "No pre-cut fruit, no concentrates, and zero syrups. Coconuts are sliced open with a clean machete stroke, and juices are pressed live through stainless steel cold extractors.",
      image: "assets/images/process-extraction.jpg"
    },
    {
      step: "04",
      title: "Zero Added Sugar & Preservatives",
      subtitle: "100% Single-Ingredient Fruit & Coconut Purity",
      description: "We never dilute our juices with tap water or add refined sugars. What you taste in your glass is pure, unfiltered sunshine and mother nature's wholesome sweetness.",
      image: "assets/images/product-desiccated.jpg"
    },
    {
      step: "05",
      title: "Eco-Friendly Husk & Glass Serving",
      subtitle: "Natural Coconut Bowls, Paper Straws & Glass Bottles",
      description: "Drink straight from the fresh green coconut shell with a compostable straw, or enjoy our grab-and-go juices in chilled, recyclable glass bottles.",
      image: "assets/images/product-vco-jar.jpg"
    },
    {
      step: "06",
      title: "Stall Pickup, Delivery & Event Counters",
      subtitle: "Walk-in Counter, Fast Delivery & Wedding Stall Catering",
      description: "Enjoy daily hydration at our walk-in stall, order cold takeaway packs to your doorstep, or book our full live stall setup for private parties and weddings.",
      image: "assets/images/hero-home2.jpg"
    }
  ],

  faqs: [
    {
      category: "Stall & Freshness",
      question: "How fresh are your tender coconuts and juices?",
      answer: "Every single green coconut is harvested daily from coastal groves and brought straight to our stall. Juices and tender coconuts are cut and cold-pressed live in front of you when you order—never pre-bottled days in advance, with zero added sugar, artificial colors, or chemical preservatives."
    },
    {
      category: "Stall & Freshness",
      question: "Can I choose my coconut with extra water or thicker malai?",
      answer: "Absolutely! Our stall masters are experts at selecting coconuts to your exact preference. Just let us know whether you want maximum sweet water ('Pani wala') or soft spoonable flesh ('Malai wala'). After you drink the water, we happily split the coconut and scoop the malai into a cup for you."
    },
    {
      category: "Bulk & Event Catering",
      question: "Do you cater live tender coconut and juice stalls for weddings and corporate events?",
      answer: "Yes! Our Live Tender Coconut & Fresh Juice Stall setup is one of our most popular services for weddings, birthday parties, sports meets, and corporate wellness events. We bring our rustic wooden counter, skilled coconut cutters, cold presses, and hundreds of fresh green coconuts branded with custom event stamps or flags. Inquire via our Bulk Enquiry form for custom packages."
    },
    {
      category: "Hygiene & Packaging",
      question: "What hygiene and sustainability standards does your stall follow?",
      answer: "We adhere to strict food safety protocols: stainless steel tools sanitized throughout the day, filtered ice only, compostable paper straws, wooden spoons, and food-grade glass takeaway bottles. The empty green coconut husks are collected daily for organic composting and coir recycling."
    },
    {
      category: "Takeaway & Delivery",
      question: "How long can I store bottled coconut water and fresh juices at home?",
      answer: "Because our juices and bottled coconut water are 100% raw and unpasteurized with zero preservatives, keep them refrigerated below 4°C. Raw tender coconut water is best consumed within 48 hours, and cold-pressed fruit juices within 24–36 hours for peak freshness and nutritional vitality."
    }
  ]
};

// Backwards compatibility alias for app and components
window.STALL_DATA = window.COCOAURA_DATA;
