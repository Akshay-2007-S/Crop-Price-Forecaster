/**
 * AGRISENSE - Master Agricultural Intelligence Dataset & Simulation Engine
 * "Sense the Market. Plan the Crop. Grow the Profit."
 * Prototype / Hackathon Demo Dataset (Calibrated on APMC Mandi, Agmarknet, and IMD records)
 */

const CFP_DATA = {
  appName: "AgriSense",
  appFullName: "AgriSense — AI Crop Market Intelligence",
  tagline: "Sense the Market. Plan the Crop. Grow the Profit.",
  subTagline: "AI-powered agricultural decision platform helping farmers with what to grow, when to sell, where to sell, crop care, and profit optimization.",
  lastDataUpdate: "Today, 06:30 AM IST (Simulated Live Sync)",
  isDemoMode: true,

  // Quick Summary Stats for Overview / Hero
  heroStats: {
    todayMarket: {
      crop: "Tomato",
      variety: "Hybrid Shivam",
      price: 35,
      unit: "₹/kg",
      change: "+8.4%",
      trend: "up",
      market: "Koyambedu / Kolar APMC"
    },
    forecast7d: {
      crop: "Tomato",
      price: 39,
      unit: "₹/kg",
      range: "₹37 – ₹42",
      change: "+11.4%",
      direction: "Expected Rise",
      confidence: 84
    },
    marketsTracked: {
      count: "500+",
      label: "Registered APMC Mandis",
      activeStates: 10
    },
    communitySize: {
      count: "14,200+",
      label: "Growers & Mandi Traders",
      activeDispatches: 340
    }
  },

  // Mandi Ticker Stream
  tickerItems: [
    { mandi: "Koyambedu (Chennai)", crop: "Tomato Local", price: "₹38.00/kg", change: "+6.2%", trend: "up", time: "10m ago" },
    { mandi: "Kolar APMC (Karnataka)", crop: "Tomato Hybrid", price: "₹35.50/kg", change: "+8.1%", trend: "up", time: "15m ago" },
    { mandi: "Lasalgaon (Nashik)", crop: "Onion Red Medium", price: "₹28.00/kg", change: "-1.2%", trend: "down", time: "22m ago" },
    { mandi: "Guntur Yard (Andhra)", crop: "Chilli Teja A-Grade", price: "₹110.00/kg", change: "+5.4%", trend: "up", time: "30m ago" },
    { mandi: "Azadpur (Delhi NCR)", crop: "Potato Jyoti", price: "₹23.50/kg", change: "-2.1%", trend: "down", time: "18m ago" },
    { mandi: "Erode Regulated (TN)", crop: "Turmeric Salem Finger", price: "₹152.00/kg", change: "+4.2%", trend: "up", time: "45m ago" },
    { mandi: "Bowenpally (Secunderabad)", crop: "Brinjal Green Round", price: "₹27.00/kg", change: "+1.5%", trend: "up", time: "1h ago" },
    { mandi: "Vashi (Navi Mumbai)", crop: "Tomato Sahu", price: "₹41.00/kg", change: "+7.8%", trend: "up", time: "25m ago" },
    { mandi: "Surat APMC (Gujarat)", crop: "Onion White", price: "₹26.50/kg", change: "+0.8%", trend: "stable", time: "1h ago" },
    { mandi: "Madanapalle (Andhra)", crop: "Tomato PKM-1", price: "₹34.00/kg", change: "+9.2%", trend: "up", time: "35m ago" }
  ],

  // Comprehensive Crop Definitions
  crops: [
    {
      id: "tomato",
      name: "Tomato",
      hindi: "टमाटर",
      tamil: "தக்காளி",
      telugu: "టమోటా",
      icon: "🍅",
      currentPrice: 35,
      unit: "kg",
      trend: "up",
      trendLabel: "LIKELY TO RISE",
      changePct: "+11.4%",
      forecast7d: 39,
      forecast14d: 41,
      forecast30d: 44,
      confidence: 84,
      range7d: "₹37 – ₹42",
      dailyArrivals: "1,420 Tonnes",
      seasonality: "Summer / Rabi flush",
      topState: "Andhra Pradesh & Karnataka",
      demandLevel: "High",
      weatherRisk: "Rainfall transport disruption",
      waterRequirement: "Medium (400-600 mm)",
      growthDuration: "90 - 110 Days",
      typicalYieldAcre: "12 - 16 Tonnes",
      cultivationCostAcre: 48000,
      whyExplanation: [
        "Recent market prices are increasing across major urban consumption hubs",
        "Wholesale demand up +14% due to retail replenishment in Bengaluru and Chennai",
        "Pre-monsoon rainfall in Kolar & Madanapalle belt may delay field harvesting",
        "Secondary mandis (Hosur, Chittoor) show matching upward procurement momentum"
      ],
      farmerAdvice: "Stagger your harvest delivery over the next 4–7 days. Holding back ripe harvest by 2-3 days could fetch ₹3 to ₹4 more per kg as wholesale demand tightens.",
      factors: [
        { name: "Market Demand", state: "High ↑", desc: "Urban retail off-take expanded 14%" },
        { name: "Arrival Supply", state: "Moderate ↓", desc: "Daily crates down 18% at Kolar" },
        { name: "Weather Impact", state: "Rainfall Alert", desc: "Moisture delaying transport routes" },
        { name: "Seasonality", state: "Strong Trend", desc: "Pre-festival catering pull" },
        { name: "Market Momentum", state: "Positive (+8%)", desc: "Buyers bidding above modal minimums" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Surging (+14%)", trend: "up", desc: "Metropolitan consumption up in Chennai & Bengaluru" },
        weather: { label: "Weather Signal", value: "Rainfall Alert", trend: "up", desc: "Heavy showers slowing picking & transport" },
        supply: { label: "Supply Flow", value: "Arrivals Down (-18%)", trend: "down", desc: "Reduced daily crates arriving at Kolar APMC" },
        seasonal: { label: "Seasonal / Festival", value: "Wedding Season", trend: "up", desc: "Higher institutional catering demand" }
      },
      varieties: [
        {
          id: "shivam_hybrid",
          name: "Shivam Hybrid (Syngenta)",
          type: "Commercial Hybrid",
          yieldAcre: "15 - 18 Tonnes",
          maturityDays: 100,
          shelfLife: "7 - 10 Days (Firm skin, high transportability)",
          waterNeed: "Medium",
          costAcre: 52000,
          expectedPrice: 38,
          marketPreference: "High in long-distance transit (Chennai, Mumbai)",
          pestResistance: "Tolerant to Leaf Curl Virus (ToLCV)",
          verdict: "Recommended for commercial traders targeting distant metros."
        },
        {
          id: "pkm1_country",
          name: "PKM-1 / Nattu Tomato",
          type: "Desi / Country Variety",
          yieldAcre: "11 - 13 Tonnes",
          maturityDays: 90,
          shelfLife: "3 - 5 Days (Thin skin, sour taste)",
          waterNeed: "Low-Medium",
          costAcre: 38000,
          expectedPrice: 32,
          marketPreference: "Preferred in local wet markets for traditional cooking",
          pestResistance: "Moderate; susceptible to fruit borer",
          verdict: "Lower cultivation cost, ideal for local radius sales (<50km)."
        }
      ]
    },
    {
      id: "onion",
      name: "Onion",
      hindi: "प्याज़",
      tamil: "வெங்காயம்",
      telugu: "ఉల్లిపాయ",
      icon: "🧅",
      currentPrice: 28,
      unit: "kg",
      trend: "stable",
      trendLabel: "STABLE / BALANCED",
      changePct: "-3.5%",
      forecast7d: 27,
      forecast14d: 28,
      forecast30d: 31,
      confidence: 76,
      range7d: "₹26 – ₹30",
      dailyArrivals: "2,890 Tonnes",
      seasonality: "Kharif storage influx",
      topState: "Maharashtra (Nashik)",
      demandLevel: "Moderate",
      weatherRisk: "Low (Dry plains logistics)",
      waterRequirement: "Medium (350-550 mm)",
      growthDuration: "120 - 140 Days",
      typicalYieldAcre: "10 - 12 Tonnes",
      cultivationCostAcre: 42000,
      whyExplanation: [
        "Lasalgaon and Pimpalgaon mandis report steady continuous buffer arrivals",
        "Government buffer stock releases are tempering steep price escalations",
        "Retail demand is consistent with normal domestic consumption",
        "Export volumes remain regulated, maintaining balanced domestic inventory"
      ],
      farmerAdvice: "Prices are expected to hold steady around ₹27–28/kg. Avoid panic selling, but ensure adequate aeration if storing in rural chawls to prevent sprouting.",
      factors: [
        { name: "Market Demand", state: "Moderate →", desc: "Steady household procurement rates" },
        { name: "Arrival Supply", state: "Adequate (+4%)", desc: "Buffer stock and fresh arrivals balanced" },
        { name: "Weather Impact", state: "Clear & Dry", desc: "Smooth inter-state transit corridors" },
        { name: "Seasonality", state: "Post-Harvest Wave", desc: "Regular seasonal inventory" },
        { name: "Market Momentum", state: "Neutral", desc: "Bidding hovering near APMC modal rates" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Balanced", trend: "stable", desc: "Steady household procurement rates" },
        weather: { label: "Weather Signal", value: "Clear & Dry", trend: "stable", desc: "Ideal logistics conditions in Maharashtra" },
        supply: { label: "Supply Flow", value: "Adequate (+4%)", trend: "up", desc: "Buffer stock and fresh arrivals balanced" },
        seasonal: { label: "Seasonal / Festival", value: "Routine Post-Harvest", trend: "stable", desc: "No acute festival spike expected this week" }
      },
      varieties: [
        {
          id: "bhima_super",
          name: "Bhima Super (Red Onion)",
          type: "High Yield Red",
          yieldAcre: "12 - 14 Tonnes",
          maturityDays: 115,
          shelfLife: "3 - 4 Months (Dry storage)",
          waterNeed: "Medium",
          costAcre: 44000,
          expectedPrice: 28,
          marketPreference: "Highest market demand across India",
          pestResistance: "Tolerant to Purple Blotch",
          verdict: "Top choice for Kharif and late Kharif cycles."
        },
        {
          id: "nasik_red",
          name: "Nashik Garwa Red",
          type: "Storage Variety",
          yieldAcre: "10 - 12 Tonnes",
          maturityDays: 130,
          shelfLife: "5 - 6 Months (Superior storage)",
          waterNeed: "Medium",
          costAcre: 41000,
          expectedPrice: 30,
          marketPreference: "Command price premium during lean months",
          pestResistance: "Moderate",
          verdict: "Best variety for farmers with on-farm chawl storage facility."
        }
      ]
    },
    {
      id: "chilli",
      name: "Chilli",
      hindi: "मिर्च",
      tamil: "மிளகாய்",
      telugu: "మిరపకాయ",
      icon: "🌶️",
      currentPrice: 82,
      unit: "kg",
      trend: "up",
      trendLabel: "STRONG UPTREND",
      changePct: "+8.5%",
      forecast7d: 89,
      forecast14d: 94,
      forecast30d: 98,
      confidence: 81,
      range7d: "₹85 – ₹95",
      dailyArrivals: "640 Tonnes",
      seasonality: "Late season spice harvest",
      topState: "Andhra Pradesh (Guntur)",
      demandLevel: "Very High",
      weatherRisk: "Moderate humidity during solar yard drying",
      waterRequirement: "Low-Medium (400-500 mm)",
      growthDuration: "140 - 160 Days",
      typicalYieldAcre: "2.5 - 3.5 Tonnes (Dry)",
      cultivationCostAcre: 62000,
      whyExplanation: [
        "Export enquiries from Southeast Asia have surged by 22%",
        "Cold storage occupancy at Guntur APMC is reaching optimal capacity",
        "Unseasonal pest attacks in selected pockets reduced fresh green yield",
        "Processing and oleoresin extraction units actively buying wholesale lots"
      ],
      farmerAdvice: "Favorable conditions for sellers. High grade Teja and Byadgi varieties are commanding premium rates. Graded lots will earn an additional 10–12% premium.",
      factors: [
        { name: "Market Demand", state: "Very High ↑", desc: "Strong procurement orders from exporters" },
        { name: "Arrival Supply", state: "Tight (-12%)", desc: "Arrivals lower than 5-year average" },
        { name: "Weather Impact", state: "Dry Yard Sun", desc: "Good solar curing conditions" },
        { name: "Seasonality", state: "Annual Masala Buying", desc: "Commercial mills stocking up" },
        { name: "Market Momentum", state: "Aggressive", desc: "Commission agents bidding above MSP" }
      ],
      signals: {
        market: { label: "Market Demand", value: "High Export Surge", trend: "up", desc: "Strong procurement orders from traders" },
        weather: { label: "Weather Signal", value: "Moderate Humidity", trend: "stable", desc: "Favorable for spice solar drying yards" },
        supply: { label: "Supply Flow", value: "Tight Supply (-12%)", trend: "down", desc: "Arrivals lower than historical 5-year average" },
        seasonal: { label: "Seasonal / Festival", value: "Commercial Bulk Buying", trend: "up", desc: "Masala mills stocking annual inventory" }
      },
      varieties: [
        {
          id: "teja_guntur",
          name: "Guntur Teja (S-17)",
          type: "Pungent Export Variety",
          yieldAcre: "3.0 - 3.5 Tonnes Dry",
          maturityDays: 150,
          shelfLife: "12 Months in cold storage",
          waterNeed: "Low-Medium",
          costAcre: 65000,
          expectedPrice: 110,
          marketPreference: "Benchmark spice export commodity worldwide",
          pestResistance: "Moderate thrips vulnerability",
          verdict: "Highest price realization per kg in Indian spice mandis."
        },
        {
          id: "byadgi_karnataka",
          name: "Byadgi Kaddi",
          type: "High Color / Low Pungency",
          yieldAcre: "2.2 - 2.8 Tonnes Dry",
          maturityDays: 140,
          shelfLife: "9 - 12 Months",
          waterNeed: "Low",
          costAcre: 55000,
          expectedPrice: 125,
          marketPreference: "Demanded by oleoresin oil extraction & masala brands",
          pestResistance: "Good resistance to powdery mildew",
          verdict: "Commands top color value (ASTA units) with lower moisture requirements."
        }
      ]
    },
    {
      id: "potato",
      name: "Potato",
      hindi: "आलू",
      tamil: "உருளைக்கிழங்கு",
      telugu: "బంగాళాదుంప",
      icon: "🥔",
      currentPrice: 22,
      unit: "kg",
      trend: "down",
      trendLabel: "SOFTENING / SLIGHT DROP",
      changePct: "-4.5%",
      forecast7d: 21,
      forecast14d: 20,
      forecast30d: 22,
      confidence: 82,
      range7d: "₹20 – ₹23",
      dailyArrivals: "3,450 Tonnes",
      seasonality: "Rabi cold storage release",
      topState: "Uttar Pradesh & West Bengal",
      demandLevel: "Moderate",
      weatherRisk: "Cold transit stability",
      waterRequirement: "Medium (450-600 mm)",
      growthDuration: "90 - 110 Days",
      typicalYieldAcre: "14 - 18 Tonnes",
      cultivationCostAcre: 45000,
      whyExplanation: [
        "Massive cold store releases across Agra, Farrukhabad, and Hooghly belts",
        "Local mandis are well stocked with multiple commercial varieties (Jyoti, Pukhraj)",
        "Transport freight rates have stabilized across northern corridors",
        "Retailers reporting steady but non-urgent purchase cycles"
      ],
      farmerAdvice: "Prices may dip to ₹20-21/kg over the next fortnight. If storage costs are mounting, plan phased liquidations rather than holding indefinitely.",
      factors: [
        { name: "Market Demand", state: "Steady Baseline", desc: "Daily retail off-take is standard" },
        { name: "Arrival Supply", state: "Heavy (+15%)", desc: "Peak cold-storage gate clearance" },
        { name: "Weather Impact", state: "Dry Plains", desc: "Smooth northern freight logistics" },
        { name: "Seasonality", state: "Regular Period", desc: "No abnormal holiday demand catalyst" },
        { name: "Market Momentum", state: "Soft", desc: "Wholesale buyers price-sensitive" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Regular Supply", trend: "stable", desc: "Daily retail off-take is standard" },
        weather: { label: "Weather Signal", value: "Dry Plains", trend: "stable", desc: "Smooth inter-state transport corridor" },
        supply: { label: "Supply Flow", value: "Heavy Inflow (+15%)", trend: "up", desc: "Peak cold-storage gate clearance" },
        seasonal: { label: "Seasonal / Festival", value: "Standard Consumption", trend: "stable", desc: "No abnormal demand catalyst" }
      },
      varieties: [
        {
          id: "kufri_jyoti",
          name: "Kufri Jyoti",
          type: "Table Potato",
          yieldAcre: "16 - 20 Tonnes",
          maturityDays: 100,
          shelfLife: "3 - 4 Months",
          waterNeed: "Medium",
          costAcre: 46000,
          expectedPrice: 22,
          marketPreference: "Dominates consumer markets across north & west India",
          pestResistance: "Tolerant to late blight",
          verdict: "Standard reliable table variety with maximum buyer liquidity."
        },
        {
          id: "kufri_chipsona",
          name: "Kufri Chipsona-1",
          type: "Processing Variety",
          yieldAcre: "14 - 17 Tonnes",
          maturityDays: 110,
          shelfLife: "High specific gravity, low sugar",
          waterNeed: "Medium",
          costAcre: 52000,
          expectedPrice: 26,
          marketPreference: "Direct buy contracts by snack & wafer brands (Lays, Haldiram)",
          pestResistance: "Good resistance to hollow heart",
          verdict: "Offers ₹3-4/kg price premium under pre-harvest buyer contracts."
        }
      ]
    },
    {
      id: "turmeric",
      name: "Turmeric (Haldi)",
      hindi: "हल्दी",
      tamil: "மஞ்சள்",
      telugu: "పసుపు",
      icon: "🟡",
      currentPrice: 145,
      unit: "kg",
      trend: "up",
      trendLabel: "BULLISH EXPANSION",
      changePct: "+6.2%",
      forecast7d: 154,
      forecast14d: 160,
      forecast30d: 168,
      confidence: 79,
      range7d: "₹148 – ₹162",
      dailyArrivals: "380 Tonnes",
      seasonality: "Post-curing auction period",
      topState: "Tamil Nadu (Erode) & Telangana (Nizamabad)",
      demandLevel: "Very High",
      weatherRisk: "Sunlight requirement for boiling & curing",
      waterRequirement: "High (1200-1500 mm)",
      growthDuration: "240 - 270 Days",
      typicalYieldAcre: "8 - 10 Tonnes Fresh (2 - 2.5 Tonnes Cured Dry)",
      cultivationCostAcre: 75000,
      whyExplanation: [
        "Curcumin content in Erode finger turmeric receiving high global pharma interest",
        "Sowing acreage across Marathwada and Telangana contracted slightly this season",
        "Buyers actively bidding above minimum modal rates at Nizamabad auctions",
        "Futures market signaling strong momentum for yellow bulb root"
      ],
      farmerAdvice: "Hold cured dry fingers for peak auction cycles in late month. Well-polished fingers are realizing prices upward of ₹155–165/kg.",
      factors: [
        { name: "Market Demand", state: "Pharma High ↑", desc: "Strong bidding at Erode regulated market" },
        { name: "Arrival Supply", state: "Reduced (-9%)", desc: "Lower total harvest lot this calendar year" },
        { name: "Weather Impact", state: "Optimal Dry", desc: "Favorable dry conditions for curing" },
        { name: "Seasonality", state: "Peak Auctions", desc: "Institutional tenders active" },
        { name: "Market Momentum", state: "Strong Bullish", desc: "NCDEX futures trading positive" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Pharma & Spice High", trend: "up", desc: "Strong bidding at Erode regulated market" },
        weather: { label: "Weather Signal", value: "Optimal Curing", trend: "stable", desc: "Favorable dry conditions for boil-dry cycle" },
        supply: { label: "Supply Flow", value: "Limited Acreage (-9%)", trend: "down", desc: "Smaller total harvest lot this calendar year" },
        seasonal: { label: "Seasonal / Festival", value: "Export Contracts", trend: "up", desc: "Middle East & European spot buying active" }
      },
      varieties: [
        {
          id: "erode_salem",
          name: "Salem / Erode Local",
          type: "High Curcumin Finger",
          yieldAcre: "2.2 - 2.6 Tonnes Dry",
          maturityDays: 260,
          shelfLife: "24 Months dry",
          waterNeed: "High",
          costAcre: 78000,
          expectedPrice: 152,
          marketPreference: "Global benchmark for curcumin (>4.5%)",
          pestResistance: "Tolerant to rhizome rot under good drainage",
          verdict: "Highest value cash crop for growers with assured irrigation."
        },
        {
          id: "prathibha_iisr",
          name: "IISR Prathibha",
          type: "Scientifically Bred High Yield",
          yieldAcre: "2.8 - 3.2 Tonnes Dry",
          maturityDays: 225,
          shelfLife: "24 Months dry",
          waterNeed: "Medium-High",
          costAcre: 72000,
          expectedPrice: 146,
          marketPreference: "Uniform yellow color & fast boiling time",
          pestResistance: "High resistance to leaf blotch",
          verdict: "Shorter duration by 30 days, saving irrigation and labour."
        }
      ]
    },
    {
      id: "rice",
      name: "Rice / Paddy",
      hindi: "धान / चावल",
      tamil: "நெல் / அரிசி",
      telugu: "వరి / బియ్యం",
      icon: "🌾",
      currentPrice: 32,
      unit: "kg",
      trend: "stable",
      trendLabel: "STABLE / FIRM",
      changePct: "+2.8%",
      forecast7d: 33,
      forecast14d: 34,
      forecast30d: 35,
      confidence: 86,
      range7d: "₹31 – ₹34",
      dailyArrivals: "4,200 Tonnes",
      seasonality: "Samba / Kharif harvest procurement",
      topState: "Tamil Nadu (Thanjavur) & Andhra Pradesh",
      demandLevel: "Very High",
      weatherRisk: "Monsoon drainage & milling moisture",
      waterRequirement: "Very High (1100-1400 mm)",
      growthDuration: "125 - 145 Days",
      typicalYieldAcre: "24 - 30 Quintals (Paddy)",
      cultivationCostAcre: 34000,
      whyExplanation: [
        "Government MSP procurement centers actively purchasing at floor prices",
        "Export parboiled rice demand steady from African and Middle Eastern markets",
        "Cauvery delta and Godavari basin harvests arriving with optimal moisture levels",
        "Private modern rice mills competing with direct mandi buyers"
      ],
      farmerAdvice: "Maintain grain moisture below 14% before bringing to Direct Purchase Centres (DPCs). Moisture discounts can cost up to ₹80 per quintal.",
      factors: [
        { name: "Market Demand", state: "Institutional Pull", desc: "Government MSP + Private mill tenders" },
        { name: "Arrival Supply", state: "Steady High", desc: "Harvest peak in southern delta basins" },
        { name: "Weather Impact", state: "Safe Harvest Sun", desc: "Optimal dry spell for combine harvesters" },
        { name: "Seasonality", state: "Procurement Cycle", desc: "Government DPC gates fully open" },
        { name: "Market Momentum", state: "Firm Floor", desc: "MSP guarantees minimum baseline" }
      ],
      signals: {
        market: { label: "Market Demand", value: "MSP Procurement", trend: "up", desc: "Active government direct purchase centers" },
        weather: { label: "Weather Signal", value: "Mild Winter Sun", trend: "stable", desc: "Favorable moisture evaporation for paddy" },
        supply: { label: "Supply Flow", value: "Continuous Inflow", trend: "stable", desc: "Systematic lot clearances by millers" },
        seasonal: { label: "Seasonal / Festival", value: "Post-Pongal Storage", trend: "stable", desc: "Annual household rice stocking" }
      },
      varieties: [
        {
          id: "ponni_deluxe",
          name: "Deluxe Ponni (BPT-5204)",
          type: "Fine Grain Table Rice",
          yieldAcre: "26 - 28 Quintals",
          maturityDays: 140,
          shelfLife: "Gains value with 1-year aging",
          waterNeed: "High",
          costAcre: 36000,
          expectedPrice: 42,
          marketPreference: "Top consumer premium in South India",
          pestResistance: "Susceptible to Brown Planthopper (BPH)",
          verdict: "Highest retail valuation; requires disciplined pest management."
        },
        {
          id: "co51_short",
          name: "CO-51 Short Duration",
          type: "Resilient High Yield",
          yieldAcre: "30 - 33 Quintals",
          maturityDays: 110,
          shelfLife: "Commercial table & parboiled",
          waterNeed: "Medium (Saves 30% water)",
          costAcre: 29000,
          expectedPrice: 31,
          marketPreference: "Reliable government MSP procurement",
          pestResistance: "Tolerant to blast and lodging",
          verdict: "Lowest risk profile for water-scarce tail-end delta fields."
        }
      ]
    },
    {
      id: "brinjal",
      name: "Brinjal",
      hindi: "बैंगन",
      tamil: "கத்தரிக்காய்",
      telugu: "వంకాయ",
      icon: "🍆",
      currentPrice: 26,
      unit: "kg",
      trend: "stable",
      trendLabel: "BALANCED",
      changePct: "+1.5%",
      forecast7d: 27,
      forecast14d: 26,
      forecast30d: 29,
      confidence: 72,
      range7d: "₹24 – ₹29",
      dailyArrivals: "850 Tonnes",
      seasonality: "Continuous picking",
      topState: "Odisha & West Bengal",
      demandLevel: "Moderate",
      weatherRisk: "Fruit borer humid conditions",
      waterRequirement: "Medium",
      growthDuration: "120 - 150 Days",
      typicalYieldAcre: "12 - 15 Tonnes",
      cultivationCostAcre: 38000,
      whyExplanation: [
        "Continuous flowering and plucking cycle provides steady daily market inflow",
        "Local urban demand remains very steady without sudden fluctuations",
        "Short shelf life ensures daily clearing of mandi stock",
        "Price parity between green long, round purple, and striped varieties"
      ],
      farmerAdvice: "Daily harvest should be graded by size and skin sheen. Morning lot entries at APMC fetch ₹2 to ₹3/kg higher than evening lots.",
      factors: [
        { name: "Market Demand", state: "Steady Daily", desc: "Continuous vegetable cart off-take" },
        { name: "Arrival Supply", state: "Even Daily Flow", desc: "Local radius farmers on schedule" },
        { name: "Weather Impact", state: "Moderate Temps", desc: "Good fruit setting observed" },
        { name: "Seasonality", state: "Standard Staple", desc: "Predictable dietary basket demand" },
        { name: "Market Momentum", state: "Equilibrium", desc: "Quick daily lot liquidations" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Steady Daily Pull", trend: "stable", desc: "Continuous vegetable cart demand" },
        weather: { label: "Weather Signal", value: "Moderate Temperatures", trend: "stable", desc: "Good fruit setting observed" },
        supply: { label: "Supply Flow", value: "Even Inflow", trend: "stable", desc: "Local radius farmers harvesting on schedule" },
        seasonal: { label: "Seasonal / Festival", value: "Regular Vegetable", trend: "stable", desc: "Stable dietary staple baseline" }
      },
      varieties: [
        {
          id: "green_long",
          name: "Green Long Ujala",
          type: "Long Slender Green",
          yieldAcre: "14 - 16 Tonnes",
          maturityDays: 120,
          shelfLife: "3 - 4 Days",
          waterNeed: "Medium",
          costAcre: 39000,
          expectedPrice: 28,
          marketPreference: "Preferred in Karnataka and southern Maharashtra",
          pestResistance: "Moderate",
          verdict: "High picking frequency every 4 days."
        },
        {
          id: "purple_round",
          name: "Manjari Gota / Round Purple",
          type: "Round Striped Desi",
          yieldAcre: "12 - 14 Tonnes",
          maturityDays: 130,
          shelfLife: "3 - 5 Days",
          waterNeed: "Medium",
          costAcre: 36000,
          expectedPrice: 26,
          marketPreference: "Popular for traditional stuffed dishes (Bharth/Ennegayi)",
          pestResistance: "Tolerant to bacterial wilt",
          verdict: "Popular in local mandis with high kitchen loyalty."
        }
      ]
    },
    {
      id: "carrot",
      name: "Carrot",
      hindi: "गाजर",
      tamil: "கேரட்",
      telugu: "క్యారెట్",
      icon: "🥕",
      currentPrice: 38,
      unit: "kg",
      trend: "up",
      trendLabel: "MODERATE GAINS",
      changePct: "+7.9%",
      forecast7d: 41,
      forecast14d: 43,
      forecast30d: 46,
      confidence: 78,
      range7d: "₹38 – ₹44",
      dailyArrivals: "620 Tonnes",
      seasonality: "Hill & northern crop cycle",
      topState: "Tamil Nadu (Ooty) & Punjab",
      demandLevel: "High",
      weatherRisk: "Hill mist & freight diesel trends",
      waterRequirement: "Medium (400-500 mm)",
      growthDuration: "90 - 105 Days",
      typicalYieldAcre: "10 - 14 Tonnes",
      cultivationCostAcre: 44000,
      whyExplanation: [
        "Nilgiris hill crop commands premium washing & grading rates",
        "Juice bar and salad commercial segment consumption accelerating in metros",
        "Higher diesel transport costs from hilly terrains supporting floor price",
        "Good sweetness index (Brix) in current arrivals attracting high retail buyers"
      ],
      farmerAdvice: "Quality washing and grading into uniform length sacks yields 15% higher wholesale valuation in Bangalore and Chennai wholesale hubs.",
      factors: [
        { name: "Market Demand", state: "Urban Salad Pull", desc: "Supermarkets & Quick Commerce orders up 12%" },
        { name: "Arrival Supply", state: "Constrained Hill Inflow", desc: "Shipments limited to Nilgiri & Kolar hill pockets" },
        { name: "Weather Impact", state: "Mountain Mist", desc: "Slight delay in morning harvesting cycles" },
        { name: "Seasonality", state: "Health Season", desc: "Consistent year-round consumer demand" },
        { name: "Market Momentum", state: "Firm Bullish", desc: "Retailers competing for clean washed root lots" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Urban Salad Pull (+12%)", trend: "up", desc: "Supermarkets and quick-commerce ordering" },
        weather: { label: "Weather Signal", value: "Hill Mist & Rain", trend: "up", desc: "Slight delay in mountain harvesting transport" },
        supply: { label: "Supply Flow", value: "Constrained Inflow", trend: "down", desc: "Select arrivals only from specific hill belts" },
        seasonal: { label: "Seasonal / Festival", value: "Health Foods Demand", trend: "up", desc: "Steady year-round non-cereal demand" }
      },
      varieties: [
        {
          id: "kuroda_ooty",
          name: "Ooty Super Kuroda",
          type: "European Orange Table",
          yieldAcre: "12 - 15 Tonnes",
          maturityDays: 100,
          shelfLife: "8 - 12 Days (Washed)",
          waterNeed: "Medium",
          costAcre: 48000,
          expectedPrice: 42,
          marketPreference: "Premium supermarket & metro restaurant demand",
          pestResistance: "Tolerant to cavity spot",
          verdict: "Top choice for hill farmers with mechanical root washers."
        },
        {
          id: "pusa_rudhira",
          name: "Pusa Rudhira (Red Carrot)",
          type: "Desi Deep Red",
          yieldAcre: "11 - 13 Tonnes",
          maturityDays: 95,
          shelfLife: "4 - 6 Days",
          waterNeed: "Low-Medium",
          costAcre: 39000,
          expectedPrice: 34,
          marketPreference: "High lycopene content, preferred in north Indian cuisine",
          pestResistance: "High field tolerance",
          verdict: "Thrives in plains during winter with low chemical inputs."
        }
      ]
    },
    {
      id: "cabbage",
      name: "Cabbage",
      hindi: "पत्ता गोभी",
      tamil: "முட்டைக்கோஸ்",
      telugu: "క్యాబేజీ",
      icon: "🥬",
      currentPrice: 20,
      unit: "kg",
      trend: "down",
      trendLabel: "SOFTENING",
      changePct: "-5.0%",
      forecast7d: 19,
      forecast14d: 18,
      forecast30d: 20,
      confidence: 74,
      range7d: "₹17 – ₹21",
      dailyArrivals: "1,120 Tonnes",
      seasonality: "Cool weather abundance",
      topState: "West Bengal & Gujarat",
      demandLevel: "Moderate",
      weatherRisk: "High moisture causing rot in open truck transit",
      waterRequirement: "Medium",
      growthDuration: "75 - 90 Days",
      typicalYieldAcre: "14 - 18 Tonnes",
      cultivationCostAcre: 35000,
      whyExplanation: [
        "Heavy harvests from Belagavi and Nilgiri hill slopes entering southern plains",
        "Surplus production in Gujarat mandis spilling into western corridors",
        "Bulk canteen purchase volumes steady but not expanding",
        "Cold transit costs have reduced slightly"
      ],
      farmerAdvice: "Sell upon harvest maturity. Storing loose heads in open trucks causes weight loss through moisture evaporation.",
      factors: [
        { name: "Market Demand", state: "Institutional Regular", desc: "Commercial catering baseline stable" },
        { name: "Arrival Supply", state: "Surplus Inflow (+11%)", desc: "Multiple district harvests coinciding" },
        { name: "Weather Impact", state: "Cool Mornings", desc: "Fast field maturation" },
        { name: "Seasonality", state: "Peak Plentiful", desc: "Seasonal abundance in all mandis" },
        { name: "Market Momentum", state: "Soft Discounting", desc: "Brokers bargaining for lower prices" }
      ],
      signals: {
        market: { label: "Market Demand", value: "Moderate", trend: "stable", desc: "Bulk hospitality consumption stable" },
        weather: { label: "Weather Signal", value: "Cool Mornings", trend: "stable", desc: "Fast crop maturation in fields" },
        supply: { label: "Supply Flow", value: "Surplus Inflow (+11%)", trend: "up", desc: "Multi-district harvest coinciding" },
        seasonal: { label: "Seasonal / Festival", value: "Normal Phase", trend: "stable", desc: "Standard vegetable cycle" }
      },
      varieties: [
        {
          id: "golden_acre",
          name: "Golden Acre",
          type: "Early Round Head",
          yieldAcre: "14 - 16 Tonnes",
          maturityDays: 75,
          shelfLife: "5 - 7 Days",
          waterNeed: "Medium",
          costAcre: 34000,
          expectedPrice: 20,
          marketPreference: "Crisp texture, popular in wholesale hospitality trade",
          pestResistance: "Moderate; check for Diamondback moth (DBM)",
          verdict: "Shortest turnaround vegetable crop for quick field liquidation."
        }
      ]
    }
  ],

  // 12 Major Indian Mandis Database
  mandis: [
    {
      id: "koyambedu",
      name: "Koyambedu Wholesale Market Complex",
      city: "Chennai",
      state: "Tamil Nadu",
      stateCode: "TN",
      status: "Active Trading",
      dailyVolume: "3,850 Tonnes",
      totalTraders: 1450,
      operatingHours: "02:30 AM – 02:00 PM IST",
      topCommodities: ["Tomato", "Onion", "Potato", "Chilli", "Carrot"],
      primarySources: ["Hosur", "Kolar", "Nashik", "Ooty"],
      modalPrices: { tomato: 38, onion: 30, chilli: 86, potato: 24, turmeric: 150, brinjal: 28, carrot: 42, cabbage: 21, rice: 42 },
      forecast7d: { tomato: 42, onion: 29, chilli: 92, potato: 23 },
      forecast30d: { tomato: 46, onion: 32, chilli: 98, potato: 25 },
      weather: { temp: "31°C", condition: "Partly Cloudy", humidity: "76%", rainChance: "25%" },
      nearbyMandis: [
        { name: "Kanchipuram APMC", distance: "68 km", spreadVsKoyambedu: "-₹2.50/kg" },
        { name: "Tiruvallur Regulated", distance: "45 km", spreadVsKoyambedu: "-₹1.80/kg" },
        { name: "Vellore Mandi", distance: "135 km", spreadVsKoyambedu: "-₹3.20/kg" }
      ],
      description: "One of Asia's largest perishable goods terminals. Inbound supply draws heavily from Karnataka and Andhra border belts. Excellent rail/road connectivity."
    },
    {
      id: "kolar",
      name: "Kolar APMC Mandi",
      city: "Kolar",
      state: "Karnataka",
      stateCode: "KA",
      status: "Active Trading",
      dailyVolume: "2,900 Tonnes",
      totalTraders: 920,
      operatingHours: "05:00 AM – 05:00 PM IST",
      topCommodities: ["Tomato", "Chilli", "Brinjal", "Capsicum"],
      primarySources: ["Kolar District", "Chintamani", "Srinivaspur", "Bangarapet"],
      modalPrices: { tomato: 33, onion: 27, chilli: 80, potato: 22, turmeric: 142, brinjal: 25, carrot: 37, cabbage: 19, rice: 38 },
      forecast7d: { tomato: 37, onion: 26, chilli: 87, potato: 21 },
      forecast30d: { tomato: 41, onion: 28, chilli: 94, potato: 23 },
      weather: { temp: "27°C", condition: "Scattered Rain Showers", humidity: "82%", rainChance: "65%" },
      nearbyMandis: [
        { name: "Hosur Uzhavar Sandhai", distance: "72 km", spreadVsKolar: "+₹2.00/kg" },
        { name: "Yeshwanthpur (Bengaluru)", distance: "65 km", spreadVsKolar: "+₹3.50/kg" },
        { name: "Madanapalle APMC", distance: "95 km", spreadVsKolar: "+₹1.00/kg" }
      ],
      description: "Asia's premier tomato assembly hub. Sets daily spot pricing benchmark for all southern and eastern consumer states. Direct truck loading for Kolkata and Dhaka."
    },
    {
      id: "lasalgaon",
      name: "Lasalgaon Agriculture Produce Market",
      city: "Nashik",
      state: "Maharashtra",
      stateCode: "MH",
      status: "Active Auctions",
      dailyVolume: "4,600 Tonnes",
      totalTraders: 1200,
      operatingHours: "07:00 AM – 06:00 PM IST",
      topCommodities: ["Onion", "Tomato", "Pomegranate", "Grapes"],
      primarySources: ["Niphad", "Yeola", "Chandwad", "Satana"],
      modalPrices: { tomato: 36, onion: 27, chilli: 84, potato: 23, turmeric: 144, brinjal: 26, carrot: 38, cabbage: 20, rice: 36 },
      forecast7d: { tomato: 40, onion: 26, chilli: 90, potato: 22 },
      forecast30d: { tomato: 44, onion: 29, chilli: 96, potato: 24 },
      weather: { temp: "29°C", condition: "Clear Sky", humidity: "48%", rainChance: "10%" },
      nearbyMandis: [
        { name: "Pimpalgaon Baswant", distance: "28 km", spreadVsLasalgaon: "±₹0.50/kg" },
        { name: "Vashi (Mumbai)", distance: "210 km", spreadVsLasalgaon: "+₹5.00/kg" },
        { name: "Pune Gultekdi", distance: "230 km", spreadVsLasalgaon: "+₹4.20/kg" }
      ],
      description: "The global epicenter of onion pricing. Handles over 15% of India's annual onion crop. Determines national buffer release timing."
    },
    {
      id: "guntur",
      name: "Guntur Mirchi Yard",
      city: "Guntur",
      state: "Andhra Pradesh",
      stateCode: "AP",
      status: "Active Auctions",
      dailyVolume: "1,800 Tonnes",
      totalTraders: 680,
      operatingHours: "06:00 AM – 03:00 PM IST",
      topCommodities: ["Chilli", "Cotton", "Turmeric", "Tobacco"],
      primarySources: ["Guntur District", "Prakasam", "Khammam", "Kurnool"],
      modalPrices: { tomato: 32, onion: 28, chilli: 88, potato: 23, turmeric: 146, brinjal: 24, carrot: 38, cabbage: 20, rice: 40 },
      forecast7d: { tomato: 35, onion: 27, chilli: 96, potato: 22 },
      forecast30d: { tomato: 38, onion: 30, chilli: 104, potato: 24 },
      weather: { temp: "33°C", condition: "Sunny & Humid", humidity: "68%", rainChance: "15%" },
      nearbyMandis: [
        { name: "Vijayawada Wholesale", distance: "35 km", spreadVsGuntur: "-₹1.50/kg" },
        { name: "Warangal Enamamula", distance: "220 km", spreadVsGuntur: "+₹2.00/kg" },
        { name: "Khammam APMC", distance: "115 km", spreadVsGuntur: "±₹0.80/kg" }
      ],
      description: "Asia's largest dry red chilli terminal. Cold stores accommodate up to 500,000 tonnes of graded spice bags. Influences worldwide capsicum futures."
    },
    {
      id: "azadpur",
      name: "Azadpur APMC Mandi",
      city: "New Delhi",
      state: "Delhi NCR",
      stateCode: "DL",
      status: "Active Trading",
      dailyVolume: "6,200 Tonnes",
      totalTraders: 3200,
      operatingHours: "24 Hours (Round-the-clock)",
      topCommodities: ["Potato", "Onion", "Tomato", "Apple", "Cauliflower"],
      primarySources: ["Punjab", "Haryana", "UP", "Himachal", "Rajasthan"],
      modalPrices: { tomato: 37, onion: 28, chilli: 82, potato: 21, turmeric: 146, brinjal: 25, carrot: 34, cabbage: 19, rice: 44 },
      forecast7d: { tomato: 41, onion: 28, chilli: 88, potato: 20 },
      forecast30d: { tomato: 45, onion: 31, chilli: 93, potato: 22 },
      weather: { temp: "26°C", condition: "Hazy Sun", humidity: "52%", rainChance: "5%" },
      nearbyMandis: [
        { name: "Okhla Mandi", distance: "28 km", spreadVsAzadpur: "±₹0.50/kg" },
        { name: "Ghazipur APMC", distance: "24 km", spreadVsAzadpur: "±₹0.30/kg" },
        { name: "Agra Naveen Mandi", distance: "215 km", spreadVsAzadpur: "-₹3.80/kg" }
      ],
      description: "The National Capital's mega wholesale hub and India's largest food transit terminal. Serves over 30 million residents across the Delhi NCR mega-region."
    },
    {
      id: "vashi",
      name: "APMC Market Vashi",
      city: "Navi Mumbai",
      state: "Maharashtra",
      stateCode: "MH",
      status: "Active Trading",
      dailyVolume: "4,100 Tonnes",
      totalTraders: 1850,
      operatingHours: "03:00 AM – 03:00 PM IST",
      topCommodities: ["Tomato", "Onion", "Potato", "Green Chilli", "Ginger"],
      primarySources: ["Nashik", "Pune", "Karnataka", "Gujarat"],
      modalPrices: { tomato: 40, onion: 29, chilli: 89, potato: 24, turmeric: 148, brinjal: 29, carrot: 42, cabbage: 22, rice: 46 },
      forecast7d: { tomato: 44, onion: 29, chilli: 95, potato: 23 },
      forecast30d: { tomato: 48, onion: 32, chilli: 101, potato: 25 },
      weather: { temp: "30°C", condition: "Humid Coastal", humidity: "79%", rainChance: "20%" },
      nearbyMandis: [
        { name: "Dadar Wholesale Yard", distance: "28 km", spreadVsVashi: "+₹2.00/kg" },
        { name: "Pune Market Yard", distance: "145 km", spreadVsVashi: "-₹2.50/kg" },
        { name: "Surat APMC", distance: "280 km", spreadVsVashi: "-₹4.00/kg" }
      ],
      description: "Premier consumption gateway for the Mumbai Metropolitan Area. Highest price realization for premium graded fruits and vegetables in Western India."
    },
    {
      id: "erode",
      name: "Erode Regulated Market",
      city: "Erode",
      state: "Tamil Nadu",
      stateCode: "TN",
      status: "Active Auctions",
      dailyVolume: "950 Tonnes",
      totalTraders: 420,
      operatingHours: "09:00 AM – 04:00 PM IST",
      topCommodities: ["Turmeric", "Tapioca", "Groundnut", "Sesame"],
      primarySources: ["Erode District", "Gobichettipalayam", "Bhavani", "Dharapuram"],
      modalPrices: { tomato: 34, onion: 29, chilli: 84, potato: 23, turmeric: 152, brinjal: 26, carrot: 40, cabbage: 21, rice: 41 },
      forecast7d: { tomato: 38, onion: 29, chilli: 91, potato: 22 },
      forecast30d: { tomato: 42, onion: 31, chilli: 97, potato: 24 },
      weather: { temp: "32°C", condition: "Sunny", humidity: "58%", rainChance: "10%" },
      nearbyMandis: [
        { name: "Salem Market Yard", distance: "65 km", spreadVsErode: "+₹1.50/kg" },
        { name: "Coimbatore MGR Market", distance: "100 km", spreadVsErode: "+₹2.50/kg" },
        { name: "Tirupur Wholesale", distance: "52 km", spreadVsErode: "+₹1.20/kg" }
      ],
      description: "Known as the 'Yellow City'. Conducts transparent electronic auctions for Salem and Erode local turmeric fingers. High global export pull."
    },
    {
      id: "bowenpally",
      name: "Bowenpally Agricultural Market",
      city: "Secunderabad",
      state: "Telangana",
      stateCode: "TG",
      status: "Active Trading",
      dailyVolume: "2,100 Tonnes",
      totalTraders: 750,
      operatingHours: "04:00 AM – 02:00 PM IST",
      topCommodities: ["Tomato", "Brinjal", "Chilli", "Ladies Finger", "Onion"],
      primarySources: ["Medak", "Ranga Reddy", "Nizamabad", "Andhra Pradesh"],
      modalPrices: { tomato: 35, onion: 29, chilli: 85, potato: 23, turmeric: 152, brinjal: 27, carrot: 39, cabbage: 21, rice: 39 },
      forecast7d: { tomato: 39, onion: 28, chilli: 91, potato: 22 },
      forecast30d: { tomato: 43, onion: 31, chilli: 97, potato: 24 },
      weather: { temp: "28°C", condition: "Mild Breezy", humidity: "62%", rainChance: "20%" },
      nearbyMandis: [
        { name: "Gudimalkapur Flower/Veg", distance: "18 km", spreadVsBowenpally: "+₹1.00/kg" },
        { name: "Warangal Enamamula", distance: "145 km", spreadVsBowenpally: "-₹2.00/kg" },
        { name: "Nizamabad APMC", distance: "175 km", spreadVsBowenpally: "-₹3.00/kg" }
      ],
      description: "Equipped with state-of-the-art biogas processing and rooftop solar power. Fast turnaround for green leafy and summer vegetables."
    }
  ],

  // 4-Tier Supply-Demand Pressure Matrix (District -> State -> Region -> National)
  supplyDemandPressure: {
    tomato: {
      district: { level: "High", status: "red", score: 85, desc: "Local Hosur & Dharmapuri picking stalled by rain; retail shops competing for crate lots." },
      state: { level: "Medium", status: "yellow", score: 62, desc: "Tamil Nadu arrivals stable at Koyambedu through alternate Madanapalle trucks." },
      region: { level: "High", status: "red", score: 79, desc: "South Peninsula (KA, TN, KL) seeing heavy consumer off-take; Kolar outflow stretched." },
      national: { level: "Medium", status: "yellow", score: 58, desc: "Northern mandis well-fed by Himachal and UP greenhouses, balancing pan-India index." }
    },
    onion: {
      district: { level: "Low", status: "green", score: 32, desc: "Nashik rural warehouses well stocked; farmers eager to liquidate storage lots." },
      state: { level: "Medium", status: "yellow", score: 48, desc: "Maharashtra buffer release keeping urban market rates disciplined." },
      region: { level: "Medium", status: "yellow", score: 52, desc: "Southern states absorbing regular rakes from Manmad junction." },
      national: { level: "Low", status: "green", score: 38, desc: "Adequate national inventory across NAFED and commercial godowns." }
    },
    chilli: {
      district: { level: "High", status: "red", score: 88, desc: "Guntur cold stores reporting 88% capacity lock; exporters paying cash premiums." },
      state: { level: "High", status: "red", score: 84, desc: "Andhra Pradesh domestic processors booking 3-month forward deliveries." },
      region: { level: "High", status: "red", score: 82, desc: "South spice belt experiencing heavy export container booking." },
      national: { level: "Medium", status: "yellow", score: 65, desc: "National masala manufacturing companies sustaining firm procurement floor." }
    },
    potato: {
      district: { level: "Low", status: "green", score: 28, desc: "Agra cold storages clearing gates at discounted wholesale rates." },
      state: { level: "Low", status: "green", score: 34, desc: "Uttar Pradesh mandi arrivals higher than 3-year historical average." },
      region: { level: "Medium", status: "yellow", score: 44, desc: "Smooth northern corridor freight transport keeping Delhi and NCR mandis saturated." },
      national: { level: "Low", status: "green", score: 36, desc: "No national shortage; comfortable food processing reserves." }
    },
    turmeric: {
      district: { level: "High", status: "red", score: 82, desc: "Erode auction yards seeing intense bidding from pharma and spice export buyers." },
      state: { level: "Medium", status: "yellow", score: 64, desc: "Tamil Nadu production acreage down 8% this crop cycle." },
      region: { level: "High", status: "red", score: 78, desc: "South regional spice markets commanding 6% weekly price jump." },
      national: { level: "High", status: "red", score: 76, desc: "National spice board reports strong overseas demand from Europe and Gulf." }
    },
    rice: {
      district: { level: "Medium", status: "yellow", score: 50, desc: "Thanjavur DPCs operating smoothly with active procurement tokens." },
      state: { level: "Medium", status: "yellow", score: 54, desc: "Tamil Nadu state civil supplies corporation meeting target procurement." },
      region: { level: "Medium", status: "yellow", score: 52, desc: "Delta river basins balancing private mill off-take and public stock." },
      national: { level: "Low", status: "green", score: 38, desc: "Record national buffer stocks in FCI central pools." }
    }
  },

  // Crop Care (Pesticides & Fertilizer Suggestions for Traditional & Modern Farmers)
  cropCare: {
    tomato: {
      stages: [
        {
          id: "vegetative",
          name: "Vegetative Stage (Day 15 – 35)",
          description: "Rapid leaf and shoot development. Focus on sturdy stem growth and root anchoring.",
          fertilizer: {
            schedule: "NPK 19:19:19 @ 5g/litre foliar spray OR Urea 25kg + DAP 50kg per acre soil drench.",
            organicAlt: "Well-decomposed Cow dung manure (FYM) 5 tonnes + Vermicompost 500kg per acre.",
            traditionalNote: "👴 Old-farmer tip: Apply groundnut cake slurry mixed with sour buttermilk around root base to stimulate earthworms and root vigor.",
            modernNote: "🔬 Modern Agronomic note: Maintain electrical conductivity (EC) between 1.2–1.5 mS/cm. Fertigate with humic acid 500ml/acre for mycorrhizal stimulation."
          },
          pestsDiseases: {
            symptoms: "Leaf miner serpentine white trails, damping-off in seedling collar, early thrips curling.",
            remedy: "Neem oil (Azadirachtin 10,000 ppm) @ 2ml/L as preventive. For severe leaf miner: Spinosad 45% SC @ 0.3ml/L.",
            applicationRule: "Spray early morning (06:30–08:30 AM) or after 04:30 PM. Never spray under noon sun.",
            precaution: "Do not mix copper fungicides directly with phosphorus fertilizers."
          }
        },
        {
          id: "flowering",
          name: "Flowering & Early Fruit Set (Day 36 – 60)",
          description: "Critical phase determining total yield. High boron and phosphorus requirement to prevent blossom drop.",
          fertilizer: {
            schedule: "NPK 13:00:45 (Potassium Nitrate) @ 4g/L + Boron 20% @ 1g/L spray.",
            organicAlt: "Panchagavya 3% foliar spray (300ml in 10L water) every 10 days.",
            traditionalNote: "👴 Old-farmer tip: Spray wood ash water extract (clarified) along with sour curd to retain yellow blossoms and deter flower thrips.",
            modernNote: "🔬 Modern Agronomic note: Calcium-Boron synergism is vital. Foliar chelated Calcium (11% EDTA) @ 1.5g/L prevents blossom end rot."
          },
          pestsDiseases: {
            symptoms: "Blossom drop, Flower thrips, Fruit borer (Helicoverpa armigera) tiny entry holes.",
            remedy: "Install 8 yellow sticky traps and 4 pheromone traps per acre. Spray Emamectin Benzoate 5% SG @ 0.4g/L for borers.",
            applicationRule: "Ensure thorough coverage of under-leaf surfaces and flower clusters.",
            precaution: "Maintain 3-day waiting period before any early fruit plucking."
          }
        },
        {
          id: "fruiting",
          name: "Fruit Development & Ripening (Day 61 – 90)",
          description: "Sizing, color uniformization, and Brix sugar development. High potash demand.",
          fertilizer: {
            schedule: "SOP (00:00:50 Sulphate of Potash) @ 5g/L weekly fertigation.",
            organicAlt: "Bio-potash (Frateuria aurantia) bacteria @ 2L/acre through drip irrigation.",
            traditionalNote: "👴 Old-farmer tip: Avoid heavy flooding after a dry gap; irregular water causes skin cracking on ripening fruit.",
            modernNote: "🔬 Modern Agronomic note: Potassium enhances lycopene synthesis and cuticle firmness, extending transit shelf-life by 4 days."
          },
          pestsDiseases: {
            symptoms: "Early blight concentric dark target spots on lower leaves, fruit rot under dampness.",
            remedy: "Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L for fungal blight.",
            applicationRule: "Spray after rains dry up on foliage to prevent secondary fungal spore wash.",
            precaution: "Adhere to 7-day pre-harvest interval (PHI) for chemical sprays."
          }
        }
      ]
    },
    rice: {
      stages: [
        {
          id: "tillering",
          name: "Active Tillering Stage (Day 20 – 45)",
          description: "Maximum tiller emergence. Determines total panicle count per square meter.",
          fertilizer: {
            schedule: "Urea 30kg + Zinc Sulphate 10kg per acre as top dressing.",
            organicAlt: "Azospirillum & Phosphobacteria bio-fertilizers @ 2kg/acre mixed with compost.",
            traditionalNote: "👴 Old-farmer tip: Drain the standing water completely for 24 hours to let field soil crack slightly; then flood again to trigger deep rooting.",
            modernNote: "🔬 Modern Agronomic note: Apply Zinc strictly at 25-30 days; avoid mixing Zinc Sulphate directly with DAP to prevent insoluble zinc phosphate."
          },
          pestsDiseases: {
            symptoms: "Yellow stem borer 'dead hearts', leaf folder white papery leaf stripes.",
            remedy: "Chlorantraniliprole 0.4% G @ 4kg/acre broadcast in thin standing water OR Cartap Hydrochloride 50% SP @ 2g/L.",
            applicationRule: "Keep 2-3 cm standing water in field during granular application.",
            precaution: "Wear rubber gloves and boots during granular broadcasting."
          }
        },
        {
          id: "panicle",
          name: "Panicle Initiation & Booting (Day 65 – 85)",
          description: "Emergence of grain heads. High potash and nitrogen synchronization required.",
          fertilizer: {
            schedule: "MOP (Muriate of Potash) 25kg + Urea 15kg per acre.",
            organicAlt: "Foliar spray of 2% DAP extract + Panchagavya.",
            traditionalNote: "👴 Old-farmer tip: Watch out for 'Gandhibug' (earhead bug) foul smell in the morning breeze when milk stage sets in.",
            modernNote: "🔬 Modern Agronomic note: Potash applied at panicle stage prevents chaffy grains and lodging during pre-harvest winds."
          },
          pestsDiseases: {
            symptoms: "Brown Planthopper (BPH) hopper burn at stem base, Neck blast brown lesions.",
            remedy: "Trifloxystrobin + Tebuconazole @ 0.7g/L for blast. For BPH: Pymetrozine 50% WDG @ 0.6g/L directing nozzle to base.",
            applicationRule: "Form alleyways (paired row planting) every 2 meters to allow sunlight and aeration against BPH.",
            precaution: "Do not spray synthetic pyrethroids which cause BPH resurgence."
          }
        }
      ]
    },
    onion: {
      stages: [
        {
          id: "bulb_formation",
          name: "Bulb Enlargement Stage (Day 60 – 90)",
          description: "Critical bulb swelling. Water stress or excess nitrogen will cause splitting.",
          fertilizer: {
            schedule: "00:52:34 (MKP) @ 5g/L + Sulphur 80% WDG @ 3g/L.",
            organicAlt: "Neem cake 200kg/acre incorporated during weeding.",
            traditionalNote: "👴 Old-farmer tip: Roll a light wooden pole or empty drum over tops 15 days before harvest to hasten neck fall and bulb curing.",
            modernNote: "🔬 Modern Agronomic note: Elemental Sulphur increases pungent allylic compounds and thickens outer protective tunic scales."
          },
          pestsDiseases: {
            symptoms: "Thrips silvery white specks on inner leaf folds, Purple blotch oval lesions.",
            remedy: "Fipronil 5% SC @ 1.5ml/L for thrips; Difenoconazole 25% EC @ 1ml/L for purple blotch.",
            applicationRule: "Always add a surfactant / sticking agent (0.5ml/L) because onion leaves are waxy.",
            precaution: "Stop irrigation 10-14 days before harvest to prevent post-harvest soft rot in chawls."
          }
        }
      ]
    }
  },

  // Direct Selling Marketplace — Local Crop Seller Listings
  directListings: [
    {
      id: "lst-101",
      farmerName: "C. Dharmalingam",
      farmerPhone: "+91 94432 18920",
      location: "Bagalur, Hosur, Tamil Nadu",
      crop: "Tomato",
      variety: "Shivam Hybrid",
      landArea: "3.5 Acres",
      availableQty: "8.5 Tonnes (340 Crates)",
      harvestDate: "Ready for picking this Thursday",
      askingPrice: 34,
      unit: "₹/kg",
      mandiBenchmark: 35,
      description: "Firm red grading, zero skin cracking. Ideal for Chennai or Bangalore wholesale transport trucks. Direct farm gate loading available.",
      verifiedFarmer: true,
      postedTime: "2 hours ago"
    },
    {
      id: "lst-102",
      farmerName: "Anand Shinde",
      farmerPhone: "+91 98220 44510",
      location: "Pimpalgaon, Nashik, Maharashtra",
      crop: "Onion",
      variety: "Nashik Garwa Red",
      landArea: "5 Acres",
      availableQty: "18 Tonnes (360 Bags)",
      harvestDate: "Cured in dry chawl; ready immediately",
      askingPrice: 28,
      unit: "₹/kg",
      mandiBenchmark: 27,
      description: "Thoroughly dried with strong outer skin. Moisture content 11%. No sprouting. Can arrange truck weighing at nearby APMC weighbridge.",
      verifiedFarmer: true,
      postedTime: "4 hours ago"
    },
    {
      id: "lst-103",
      farmerName: "K. Venkata Subbaiah",
      farmerPhone: "+91 98480 31278",
      location: "Tenali Road, Guntur, Andhra Pradesh",
      crop: "Chilli",
      variety: "Teja S-17 Grade A",
      landArea: "4 Acres",
      availableQty: "4.2 Tonnes (Dry Bags)",
      harvestDate: "Solar cured & packed in jute sacks",
      askingPrice: 112,
      unit: "₹/kg",
      mandiBenchmark: 110,
      description: "Bright deep red color, stemless, moisture below 10%. Export quality sample tested for aflatoxin compliance. Looking for direct spice exporter buyer.",
      verifiedFarmer: true,
      postedTime: "6 hours ago"
    },
    {
      id: "lst-104",
      farmerName: "S. Muthukrishnan",
      farmerPhone: "+91 97890 55412",
      location: "Ammapettai, Thanjavur, Tamil Nadu",
      crop: "Rice",
      variety: "Deluxe Ponni (BPT-5204)",
      landArea: "6 Acres",
      availableQty: "160 Bags (75kg each = 12 Tonnes)",
      harvestDate: "Combined harvested, moisture 13.5%",
      askingPrice: 38,
      unit: "₹/kg",
      mandiBenchmark: 37,
      description: "Premium single-variety pure crop without weed seed admixture. Direct loading available at field bund on main canal road.",
      verifiedFarmer: true,
      postedTime: "1 day ago"
    }
  ],

  // Crop-Specific Farmer Community Groups
  cropCommunities: [
    {
      id: "grp-tomato",
      name: "🌾 South Tomato Growers Forum",
      cropId: "tomato",
      memberCount: "4,820 Farmers",
      activeDiscussions: 142,
      regionalLang: "Tamil & Kannada",
      description: "Kolar, Hosur, Madanapalle & Dharmapuri grower community discussing crate auctions, blight management, and truck transport."
    },
    {
      id: "grp-rice",
      name: "🌾 Ponni Rice Farmers Community",
      cropId: "rice",
      memberCount: "6,150 Farmers",
      activeDiscussions: 218,
      regionalLang: "Tamil & Telugu",
      description: "Cauvery Delta & Krishna Basin growers sharing seed varieties, BPH treatments, water scheduling, and DPC procurement prices."
    },
    {
      id: "grp-onion",
      name: "🧅 Nashik & Belgaum Onion Circle",
      cropId: "onion",
      memberCount: "3,940 Farmers",
      activeDiscussions: 98,
      regionalLang: "Marathi & Hindi",
      description: "Lasalgaon, Pimpalgaon, and Hubballi onion growers tracking storage losses, chawl ventilation, and export trends."
    },
    {
      id: "grp-chilli",
      name: "🌶️ Guntur & Byadgi Spice Network",
      cropId: "chilli",
      memberCount: "2,760 Farmers",
      activeDiscussions: 84,
      regionalLang: "Telugu & Kannada",
      description: "Red chilli cultivators analyzing ASTA color units, cold store rents, and export container bookings."
    }
  ],

  // AI Assistant Deterministic Responses
  aiAssistantResponses: {
    default: "I am your Crop Intelligence Assistant. You can ask me about 7-day crop forecasts, why prices are rising, weather disruptions, fertilizer recommendations, or compare selling scenarios!",
    tomato: "🍅 **Tomato Market Intelligence:** Current price is hovering around **₹35–38/kg** across southern mandis. The 7-day forecast indicates an upward climb toward **₹39–42/kg (+11.4%)** due to pre-monsoon rains in the Kolar belt slowing harvest picking by 18%. Recommendation: Stagger harvest deliveries over the next 4–7 days for maximum margin.",
    onion: "🧅 **Onion Market Intelligence:** Current prices are steady at **₹27–28/kg** in Lasalgaon and Pimpalgaon. Adequate buffer releases are keeping national supply balanced. No sudden surge expected over the next 7 days. If storing in rural chawls, ensure dry aeration to prevent sprouting.",
    chilli: "🌶️ **Chilli Market Intelligence:** Strong bullish trend! Guntur Teja is trading near **₹88–110/kg** with 7-day projection reaching **₹96–116/kg**. High export enquiries and tight cold storage stock are driving buyer competition.",
    whyPrice: "🔍 **Why did prices change?** Prices are driven by a combination of: (1) District arrival supply volume, (2) Metropolitan retail replenishment demand, (3) Weather anomalies such as heavy rain delaying transport, and (4) Inter-state arbitrage corridors between producing and consuming states.",
    fertilizer: "🧪 **Crop Care Advisory:** For vegetable crops in the vegetative stage, use balanced NPK (19:19:19 @ 5g/L) with bio-stimulants. During flowering, switch to high-potassium and Boron (13:00:45 + Boron 20%) to prevent blossom drop and boost fruit weight.",
    selling: "💰 **Selling Decision:** Compare 'Sell Now' vs 'Sell in 7 Days' using the Farmer Profit Simulator. If the price forecast delta (+₹3-4/kg) exceeds the holding and transport risk (~₹0.80/kg), delaying harvest sales by 3-5 days yields positive net profitability."
  },

  // 14-Step Enhanced Hackathon Demo Flow
  hackathonDemoSteps: [
    {
      step: 1,
      targetTab: "dashboard",
      title: "Step 1: Dashboard Overview",
      description: "Welcome to AgriSense. Notice the Bloomberg-grade dark AgTech aesthetic, live APMC ticker, 4 KPI cards, and strategic capability pillars.",
      highlightSelector: ".hero-kpi-grid"
    },
    {
      step: 2,
      targetTab: "forecast",
      crop: "tomato",
      state: "tamil_nadu",
      horizon: 7,
      title: "Step 2: AI Price Forecast & Confidence Envelope",
      description: "Current price is ₹35/kg. 7-day forecast shows expected rise to ₹39/kg with 84% AI confidence and a shaded 95% uncertainty envelope.",
      highlightSelector: ".forecast-chart-container"
    },
    {
      step: 3,
      targetTab: "forecast",
      crop: "tomato",
      state: "tamil_nadu",
      horizon: 7,
      title: "Step 3: 'Why This Forecast?' Visual Factor Cards",
      description: "No black-box math! Visual cards explain Demand ↑, Supply ↓, Rainfall impact, and Seasonal patterns in plain language for farmers.",
      highlightSelector: "#forecastWhyContainer"
    },
    {
      step: 4,
      targetTab: "supply-demand",
      title: "Step 4: 4-Tier Supply–Demand Pressure Meter",
      description: "Hierarchical telemetry across District (High 🔴), State (Medium 🟡), Region (High 🔴), and National (Medium 🟡) levels.",
      highlightSelector: ".pressure-meter-wrapper"
    },
    {
      step: 5,
      targetTab: "profit-simulator",
      title: "Step 5: Farmer Profit Simulator & Selling Assistant",
      description: "Compares Sell Today (₹17,500) vs Sell in 7 Days (₹19,500) vs Sell in 14 Days. Shows exact revenue, input costs, and net profit scenarios!",
      highlightSelector: ".simulator-results-card"
    },
    {
      step: 6,
      targetTab: "crop-intelligence",
      title: "Step 6: Crop Switching & Variety Advisor",
      description: "Transparent comparison: Shivam Hybrid vs PKM-1 Country Tomato on yield, water need, cultivation cost, and profit margins.",
      highlightSelector: ".variety-advisor-card"
    },
    {
      step: 7,
      targetTab: "crop-care",
      title: "Step 7: Crop Care (Pesticide & Fertilizer Advice)",
      description: "Interactive growth-stage recommendations with traditional farmer wisdom 👴 alongside modern scientific formulations 🔬.",
      highlightSelector: ".crop-care-wrapper"
    },
    {
      step: 8,
      targetTab: "india-market",
      title: "Step 8: Interactive India Market Map",
      description: "Explore the geographic map of India. Click on states to inspect mandis and discover the ₹8/kg inter-state arbitrage corridor!",
      highlightSelector: ".india-map-container"
    },
    {
      step: 9,
      targetTab: "mandi-markets",
      title: "Step 9: Dedicated Mandi Markets Browser",
      description: "Deep-dive into 12 major Indian APMCs (Koyambedu, Kolar, Lasalgaon, Guntur) with modal prices, arrival volume, and weather.",
      highlightSelector: ".mandi-browser-grid"
    },
    {
      step: 10,
      targetTab: "weather-signals",
      title: "Step 10: Weather Signals & Telemetry Chain",
      description: "Visualizes the causal chain: Satellite Weather $\rightarrow$ Field Transport Risk $\rightarrow$ Mandi Arrival Drop $\rightarrow$ Upward Price Movement.",
      highlightSelector: ".weather-chain-card"
    },
    {
      step: 11,
      targetTab: "direct-selling",
      title: "Step 11: Local Crop Seller (Direct Marketplace)",
      description: "Zero-middleman marketplace! Farmers list their harvest lots with asking price; buyers can directly contact via phone/WhatsApp.",
      highlightSelector: ".direct-selling-grid"
    },
    {
      step: 12,
      targetTab: "community",
      title: "Step 12: Crop-Specific Farmer Community",
      description: "Join Ponni Rice or Tomato farmer groups across Village $\rightarrow$ District $\rightarrow$ State $\rightarrow$ National tiers with regional language support.",
      highlightSelector: ".crop-community-grid"
    },
    {
      step: 13,
      targetTab: "alerts",
      title: "Step 13: Smart Alerts & Volatility Warnings",
      description: "Live alerts for price spikes, rain alerts, and arbitrage. Try the [Trigger Live Demo Alert] button for an urgent audio-visual toast!",
      highlightSelector: ".smart-alerts-wrapper"
    },
    {
      step: 14,
      targetTab: "ai-assistant",
      title: "Step 14: AI Crop Intelligence Assistant",
      description: "Ask conversational questions in natural language and receive instant data-backed agronomic guidance.",
      highlightSelector: ".ai-chat-window"
    }
  ],

  // State Market Overviews (India Market Section)
  states: [
    {
      id: "tamil_nadu",
      name: "Tamil Nadu",
      code: "TN",
      topCrop: "Tomato",
      topCropIcon: "🍅",
      avgPrice: 34,
      unit: "₹/kg",
      trend: "up",
      change7d: "+9.2%",
      keyMandis: ["Koyambedu (Chennai)", "Ottanchathiram", "Hosur", "Erode"],
      cropPrices: { tomato: 34, onion: 29, chilli: 84, potato: 23, turmeric: 148, brinjal: 26, cabbage: 21, carrot: 42, rice: 42 },
      insights: "Heavy demand in Chennai metro and Coimbatore. Inflow from Hosur and Kolar picking up. Inter-state buying active."
    },
    {
      id: "karnataka",
      name: "Karnataka",
      code: "KA",
      topCrop: "Tomato",
      topCropIcon: "🍅",
      avgPrice: 31,
      unit: "₹/kg",
      trend: "stable",
      change7d: "+2.1%",
      keyMandis: ["Kolar APMC", "Yeshwanthpur (Bengaluru)", "Belagavi", "Hubballi"],
      cropPrices: { tomato: 31, onion: 27, chilli: 80, potato: 22, turmeric: 142, brinjal: 25, cabbage: 19, carrot: 37, rice: 38 },
      insights: "Kolar APMC is Asia's second-largest tomato market; experiencing high outbound dispatches to Tamil Nadu and Kerala."
    },
    {
      id: "maharashtra",
      name: "Maharashtra",
      code: "MH",
      topCrop: "Tomato",
      topCropIcon: "🍅",
      avgPrice: 39,
      unit: "₹/kg",
      trend: "up",
      change7d: "+12.4%",
      keyMandis: ["Vashi (Mumbai)", "Lasalgaon (Nashik)", "Pune Market Yard", "Nagpur APMC"],
      cropPrices: { tomato: 39, onion: 26, chilli: 86, potato: 24, turmeric: 144, brinjal: 28, cabbage: 22, carrot: 40, rice: 36 },
      insights: "Tomato prices are currently ₹8/kg higher than Karnataka, creating a major profitable arbitrage transit corridor."
    },
    {
      id: "andhra_pradesh",
      name: "Andhra Pradesh",
      code: "AP",
      topCrop: "Chilli",
      topCropIcon: "🌶️",
      avgPrice: 33,
      unit: "₹/kg",
      trend: "down",
      change7d: "-2.8%",
      keyMandis: ["Madanapalle APMC", "Guntur Mirchi Yard", "Kurnool", "Vijayawada"],
      cropPrices: { tomato: 33, onion: 28, chilli: 88, potato: 23, turmeric: 146, brinjal: 24, cabbage: 20, carrot: 38, rice: 40 },
      insights: "Madanapalle tomato market reporting heavy daily volume. Chilli yards in Guntur seeing strong international buyer interest."
    },
    {
      id: "telangana",
      name: "Telangana",
      code: "TG",
      topCrop: "Turmeric",
      topCropIcon: "🟡",
      avgPrice: 35,
      unit: "₹/kg",
      trend: "up",
      change7d: "+5.4%",
      keyMandis: ["Bowenpally (Secunderabad)", "Warangal Enamamula", "Nizamabad Turmeric Yard"],
      cropPrices: { tomato: 35, onion: 29, chilli: 85, potato: 23, turmeric: 152, brinjal: 27, cabbage: 21, carrot: 39, rice: 39 },
      insights: "Nizamabad turmeric auctions seeing aggressive bidding. Hyderabad urban consumption sustaining healthy floor prices."
    },
    {
      id: "kerala",
      name: "Kerala",
      code: "KL",
      topCrop: "Tomato",
      topCropIcon: "🍅",
      avgPrice: 42,
      unit: "₹/kg",
      trend: "up",
      change7d: "+8.0%",
      keyMandis: ["Ernakulam Market", "Palakkad Wholesale", "Chalakkudy", "Thiruvananthapuram"],
      cropPrices: { tomato: 42, onion: 33, chilli: 92, potato: 26, turmeric: 156, brinjal: 32, cabbage: 25, carrot: 46, rice: 45 },
      insights: "Consuming state with over 75% inbound logistics from Tamil Nadu and Karnataka. Highest vegetable retail realization in South India."
    },
    {
      id: "punjab",
      name: "Punjab",
      code: "PB",
      topCrop: "Potato",
      topCropIcon: "🥔",
      avgPrice: 20,
      unit: "₹/kg",
      trend: "down",
      change7d: "-4.2%",
      keyMandis: ["Jalandhar APMC", "Ludhiana Wholesale", "Amritsar", "Khanna"],
      cropPrices: { tomato: 37, onion: 27, chilli: 79, potato: 19, turmeric: 140, brinjal: 24, cabbage: 18, carrot: 32, rice: 34 },
      insights: "Seed potato and winter crop arrivals keeping potato prices very affordable. High inter-state shipments heading to Delhi NCR."
    },
    {
      id: "gujarat",
      name: "Gujarat",
      code: "GJ",
      topCrop: "Onion",
      topCropIcon: "🧅",
      avgPrice: 27,
      unit: "₹/kg",
      trend: "stable",
      change7d: "+1.1%",
      keyMandis: ["Mahuva Onion Market", "Surat APMC", "Ahmedabad Jamalpur", "Rajkot"],
      cropPrices: { tomato: 36, onion: 25, chilli: 81, potato: 21, turmeric: 143, brinjal: 25, cabbage: 19, carrot: 36, rice: 37 },
      insights: "Mahuva white onion processing is active. Transport routes to Maharashtra and Rajasthan operating with high freight efficiency."
    },
    {
      id: "uttar_pradesh",
      name: "Uttar Pradesh",
      code: "UP",
      topCrop: "Potato",
      topCropIcon: "🥔",
      avgPrice: 21,
      unit: "₹/kg",
      trend: "down",
      change7d: "-3.9%",
      keyMandis: ["Agra Mandi", "Farrukhabad", "Kanpur Naveen Mandi", "Varanasi"],
      cropPrices: { tomato: 36, onion: 28, chilli: 83, potato: 20, turmeric: 142, brinjal: 24, cabbage: 19, carrot: 34, rice: 36 },
      insights: "India's potato heartland. High storage stocks being released gradually to meet national festival requirements."
    },
    {
      id: "all_india",
      name: "All India Average",
      code: "IN",
      topCrop: "Tomato",
      topCropIcon: "🍅",
      avgPrice: 35,
      unit: "₹/kg",
      trend: "up",
      change7d: "+6.8%",
      keyMandis: ["National e-NAM Aggregation", "Agmarknet Composite"],
      cropPrices: { tomato: 35, onion: 28, chilli: 82, potato: 22, turmeric: 145, brinjal: 26, cabbage: 20, carrot: 38, rice: 38 },
      insights: "National composite index weighted across 500+ APMC mandis. Tomato & Chilli exhibit highest volatility index."
    }
  ],

  // Community Signals & Feeds
  communitySignals: [
    {
      crop: "Tomato",
      icon: "🍅",
      trend: "up",
      pct: 68,
      statusText: "68% of users observing increase",
      tag: "Rising",
      sentimentColor: "emerald"
    },
    {
      crop: "Onion",
      icon: "🧅",
      trend: "stable",
      pct: 54,
      statusText: "54% observing stable prices",
      tag: "Stable",
      sentimentColor: "cyan"
    },
    {
      crop: "Chilli",
      icon: "🌶️",
      trend: "up",
      pct: 72,
      statusText: "72% observing increase",
      tag: "Rising",
      sentimentColor: "emerald"
    },
    {
      crop: "Potato",
      icon: "🥔",
      trend: "down",
      pct: 52,
      statusText: "52% observing softening / surplus",
      tag: "Softening",
      sentimentColor: "amber"
    }
  ],

  communityPosts: [
    {
      id: "p1",
      author: "M. Ramanathan",
      role: "Farmer (12 Acres)",
      location: "Dharmapuri, Tamil Nadu",
      crop: "Tomato",
      cropIcon: "🍅",
      time: "25 minutes ago",
      text: "Tomato crate prices crossed ₹920 for 25kg box today at Rayakottai collection center. Very active buying from Chennai agents. Inflow from local villages is less due to recent rains.",
      sentiment: "Rising",
      upvotes: 42,
      verified: true
    },
    {
      id: "p2",
      author: "Kiran Patil",
      role: "APMC Commission Agent",
      location: "Lasalgaon, Maharashtra",
      crop: "Onion",
      cropIcon: "🧅",
      time: "1 hour ago",
      text: "Demand for quality red onions is increasing steadily around Mumbai & Pune corridors. Buffer auctions taking place smoothly. Farmers are advised to dry lots properly.",
      sentiment: "Stable",
      upvotes: 38,
      verified: true
    },
    {
      id: "p3",
      author: "Suresh Reddy",
      role: "Farmer & FPO Director",
      location: "Madanapalle, Andhra Pradesh",
      crop: "Tomato",
      cropIcon: "🍅",
      time: "3 hours ago",
      text: "Heavy afternoon downpours for two consecutive days in Chittoor district. Picking will be delayed till Thursday. Expect supply to drop by 20% in Bengaluru market next week.",
      sentiment: "Rising",
      upvotes: 67,
      verified: true
    },
    {
      id: "p4",
      author: "Balwinder Singh",
      role: "Cold Storage Operator",
      location: "Jalandhar, Punjab",
      crop: "Potato",
      cropIcon: "🥔",
      time: "5 hours ago",
      text: "Cold store dispatch velocity is high. Transporters are readily available. Local prices holding around ₹19–20/kg wholesale. No shortages anticipated.",
      sentiment: "Softening",
      upvotes: 19,
      verified: true
    },
    {
      id: "p5",
      author: "Venkat Rao",
      role: "Spice Trader",
      location: "Guntur, Andhra Pradesh",
      crop: "Chilli",
      cropIcon: "🌶️",
      time: "7 hours ago",
      text: "Export containers loading fast for Southeast Asia. Good color and pungency lots fetching over ₹90/kg. High grade chilli will see further price spike this month.",
      sentiment: "Rising",
      upvotes: 53,
      verified: true
    },
    {
      id: "p6",
      author: "Dr. K. Anbarasan",
      role: "Agri Extension Officer",
      location: "Hosur, Tamil Nadu",
      crop: "Tomato",
      cropIcon: "🍅",
      time: "9 hours ago",
      text: "Notified all local vegetable growers around Hosur-Kelamangalam belt regarding dampness pest risks. AI forecast aligns well with ground logistics: expect upward price pressure.",
      sentiment: "Rising",
      upvotes: 44,
      verified: true
    }
  ],

  // Local Shop Benchmark Profiles
  shopIntelligenceData: {
    locations: {
      "Hosur": {
        nearbyMarket: "Hosur Uzhavar Sandhai & Rayakottai APMC",
        mandiAvg: 35,
        forecast7d: 39,
        demand: "HIGH",
        trend: "up",
        nearbyShops: [
          { name: "Shop A (Annai Veggie Mart)", price: 34, location: "Bagalur Road" },
          { name: "Shop B (Kaveri Fresh Mart)", price: 36, location: "MG Road" },
          { name: "Shop C (Green Valley Store)", price: 35, location: "Railway Station Rd" }
        ],
        advice: "Wholesale mandi price expected to touch ₹39/kg in 7 days. Consider procuring 2-3 extra crates today to lock in lower acquisition cost before wholesale rates rise."
      },
      "Bengaluru": {
        nearbyMarket: "Kolar APMC & Yeshwanthpur Wholesale",
        mandiAvg: 36,
        forecast7d: 40,
        demand: "VERY HIGH",
        trend: "up",
        nearbyShops: [
          { name: "Shop A (Namma Fresh)", price: 36, location: "Koramangala" },
          { name: "Shop B (Sri Lakshmi Store)", price: 38, location: "Indiranagar" },
          { name: "Shop C (Daily Greens)", price: 37, location: "HSR Layout" }
        ],
        advice: "Strong weekend household consumption ahead. Wholesale supplies are tightening from Kolar. Maintain a selling markup of at least ₹8–10/kg."
      },
      "Pune": {
        nearbyMarket: "Pune Gultekdi Market Yard",
        mandiAvg: 38,
        forecast7d: 42,
        demand: "HIGH",
        trend: "up",
        nearbyShops: [
          { name: "Shop A (Mauli Vegetables)", price: 38, location: "Kothrud" },
          { name: "Shop B (Kalyani Fresh)", price: 41, location: "Kalyani Nagar" },
          { name: "Shop C (Omkar Veggies)", price: 39, location: "Aundh" }
        ],
        advice: "Inter-state arrivals from Karnataka are pricing higher due to transport costs. Adjust retail tag to ₹44–46/kg to preserve minimum 20% margin."
      },
      "Chennai": {
        nearbyMarket: "Koyambedu Wholesale Market",
        mandiAvg: 38,
        forecast7d: 42,
        demand: "HIGH",
        trend: "up",
        nearbyShops: [
          { name: "Shop A (Madras Greens)", price: 36, location: "T. Nagar" },
          { name: "Shop B (Velan Super Veg)", price: 39, location: "Anna Nagar" },
          { name: "Shop C (Subiksha Mart)", price: 37, location: "Mylapore" }
        ],
        advice: "Truck arrivals at Koyambedu have dipped 15% due to rain. Pre-book morning lots with your commission agent before 5:00 AM."
      }
    }
  },

  // Smart Alerts
  alerts: [
    {
      id: "alt-1",
      type: "price_rise",
      badge: "PRICE RISE ALERT",
      crop: "Tomato",
      cropIcon: "🍅",
      title: "Tomato prices may rise by +11.4% next week",
      region: "Hosur, Kolar & Dharmapuri belt",
      desc: "Wholesale prices at local APMC mandis are forecasted to move from ₹35/kg to ₹39/kg due to urban demand surge and reduced supply.",
      actionText: "Check Harvest Timing",
      timestamp: "12 mins ago",
      priority: "high"
    },
    {
      id: "alt-2",
      type: "weather",
      badge: "WEATHER ALERT",
      crop: "Tomato & Chilli",
      cropIcon: "🌧️",
      title: "Heavy rainfall may disrupt field harvesting and transport",
      region: "Chittoor & Kolar district belts",
      desc: "IMD predicts 60-80mm precipitation over the next 48 hours. Field picking operations will be impaired, causing immediate spot supply tightness.",
      actionText: "Prepare Moisture Covers",
      timestamp: "1 hour ago",
      priority: "medium"
    },
    {
      id: "alt-3",
      type: "arbitrage",
      badge: "MARKET DIFFERENCE",
      crop: "Tomato",
      cropIcon: "⚖️",
      title: "Maharashtra prices are ₹8/kg higher than Karnataka",
      region: "Inter-State Corridor: Kolar → Pune/Mumbai",
      desc: "Karnataka mandi avg is ₹31/kg while Maharashtra avg is ₹39/kg. After ₹3.50/kg freight costs, traders can realize net ₹4.50/kg margin.",
      actionText: "View Transport Corridors",
      timestamp: "3 hours ago",
      priority: "high"
    },
    {
      id: "alt-4",
      type: "demand",
      badge: "DEMAND ALERT",
      crop: "Onion & Chilli",
      cropIcon: "📈",
      title: "Onion & Chilli demand accelerating in Bengaluru & Hyderabad",
      region: "Southern Metro Hubs",
      desc: "Wholesale retail order books reflect a 16% volume jump ahead of upcoming religious festivals and weekend restaurant consumption.",
      actionText: "Review Stock Levels",
      timestamp: "5 hours ago",
      priority: "normal"
    }
  ],

  // Technical Pipeline Steps ("How It Works")
  pipelineSteps: [
    { step: 1, name: "Market Data", icon: "🏛️", desc: "Daily APMC mandi modal prices, arrival volumes, and historical traded trends." },
    { step: 2, name: "Weather Data", icon: "🌦️", desc: "Precipitation, temperature anomalies, humidity indices from IMD satellite feeds." },
    { step: 3, name: "Crop + Region Data", icon: "📍", desc: "Acreage sown, harvest cycles, district transport distance, and perishable shelf-life." },
    { step: 4, name: "Data Processing", icon: "⚙️", desc: "Missing value imputation, outlier winsorization, seasonal lag feature engineering." },
    { step: 5, name: "Forecast Model", icon: "🧠", desc: "Ensemble of Random Forest, XGBoost and Temporal Prophet time-series models." },
    { step: 6, name: "Price Forecast", icon: "📊", desc: "7, 14, and 30-day projection curves with shaded uncertainty confidence bands." },
    { step: 7, name: "Community Signals", icon: "👥", desc: "Crowdsourced ground-truth validation from farmers, commission agents, and local shops." },
    { step: 8, name: "Smart Alerts", icon: "🔔", desc: "Real-time push, SMS, and WhatsApp advisories triggered when price volatility thresholds cross." }
  ],

  // Data Sources Info
  dataSources: [
    {
      name: "Mandi / Market Prices",
      source: "APMC Mandis / e-NAM & Agmarknet Network",
      status: "Calibrated Simulation (API Ready)",
      frequency: "Daily morning & evening auctions",
      icon: "🏪"
    },
    {
      name: "Weather Signals",
      source: "IMD (India Meteorological Department) & Satellite Telemetry",
      status: "Calibrated Radar Simulation",
      frequency: "6-hourly regional updates",
      icon: "🛰️"
    },
    {
      name: "Crop Information",
      source: "Directorate of Economics & Statistics (DES) & ICAR",
      status: "Active Agricultural Knowledge Base",
      frequency: "Seasonal crop calendars",
      icon: "🌾"
    },
    {
      name: "Regional Trends",
      source: "Inter-state corridor freight indices & state border check-posts",
      status: "Synthesized Arbitrage Matrix",
      frequency: "Daily inter-state trade flow",
      icon: "🚚"
    },
    {
      name: "Community Reports",
      source: "Crowdsourced farmer, trader, and extension officer dispatches",
      status: "Real-time Interactive Layer",
      frequency: "Continuous crowd submission",
      icon: "💬"
    },
    {
      name: "Local Shop Prices",
      source: "Neighborhood vegetable and fruit retail margin records",
      status: "Micro-economic Intelligence Module",
      frequency: "Daily spot retail logs",
      icon: "🏷️"
    }
  ],

  // Forecast Model Comparison Card (Baseline vs Time-Series vs ML)
  modelComparison: [
    {
      modelType: "BASELINE",
      name: "7-Day Moving Average",
      tech: "Simple / Exponential Moving Average (SMA/EMA)",
      mae: "₹3.82 / kg",
      rmse: "₹4.91 / kg",
      latency: "< 2 ms",
      verdict: "Fails to capture sudden weather shocks or festival demand spikes",
      badge: "Baseline",
      color: "slate"
    },
    {
      modelType: "TIME-SERIES MODEL",
      name: "ARIMA / Prophet",
      tech: "Auto-Regressive Integrated Moving Average + Additive Seasonality",
      mae: "₹2.14 / kg",
      rmse: "₹2.85 / kg",
      latency: "85 ms",
      verdict: "Good trend & seasonality tracking; misses sudden supply logistics collapse",
      badge: "Solid",
      color: "cyan"
    },
    {
      modelType: "ML ENSEMBLE MODEL",
      name: "Random Forest + XGBoost (Proposed)",
      tech: "Multi-Modal Gradient Boosted Trees + Spatial Mandi Lag & Rainfall Features",
      mae: "₹1.48 / kg",
      rmse: "₹1.95 / kg",
      latency: "42 ms",
      verdict: "Superior accuracy; models cross-district arbitrage & weather shock impact",
      badge: "Best Performer (AI Engine)",
      color: "emerald"
    }
  ]
};

// Price Curve History & Forecast Time-Series Generator
function generateChartTimeSeries(cropId, stateOrMandiId, horizonDays = 7) {
  const crop = CFP_DATA.crops.find(c => c.id === cropId) || CFP_DATA.crops[0];
  
  // Find state or mandi
  let basePrice = crop.currentPrice;
  const state = CFP_DATA.states.find(s => s.id === stateOrMandiId);
  const mandi = CFP_DATA.mandis.find(m => m.id === stateOrMandiId);
  
  if (state && state.cropPrices && state.cropPrices[cropId]) {
    basePrice = state.cropPrices[cropId];
  } else if (mandi && mandi.modalPrices && mandi.modalPrices[cropId]) {
    basePrice = mandi.modalPrices[cropId];
  }
  
  // Historical 14 days
  const labels = [];
  const historical = [];
  const forecast = [];
  const upperBand = [];
  const lowerBand = [];
  
  const now = new Date();
  
  // Generate past 14 days
  for (let i = 14; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    labels.push(dayStr);
    
    const trendFactor = crop.trend === "up" ? (14 - i) * 0.45 : (crop.trend === "down" ? -(14 - i) * 0.35 : (14 - i) * 0.05);
    const noise = Math.sin(i * 1.3) * 0.6;
    const pastVal = +(basePrice - trendFactor + noise).toFixed(1);
    historical.push(pastVal);
    forecast.push(null);
    upperBand.push(null);
    lowerBand.push(null);
  }
  
  // Connect today (index 14) for continuity
  forecast[14] = basePrice;
  upperBand[14] = basePrice;
  lowerBand[14] = basePrice;
  
  // Determine target end price based on horizon & trend
  let targetDelta = 0;
  if (crop.trend === "up") {
    targetDelta = horizonDays === 7 ? (crop.forecast7d - crop.currentPrice) : (horizonDays === 14 ? (crop.forecast14d - crop.currentPrice) : (crop.forecast30d - crop.currentPrice));
  } else if (crop.trend === "down") {
    targetDelta = horizonDays === 7 ? -2.5 : (horizonDays === 14 ? -3.8 : -5.0);
  } else {
    targetDelta = horizonDays === 7 ? 0.8 : (horizonDays === 14 ? 1.4 : 2.2);
  }
  
  const endForecast = +(basePrice + targetDelta).toFixed(1);
  
  // Generate future days (1 to horizonDays)
  for (let i = 1; i <= horizonDays; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dayStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    labels.push(dayStr);
    
    historical.push(null);
    
    const progress = i / horizonDays;
    const easeProgress = Math.sin((progress * Math.PI) / 2);
    const expected = +(basePrice + (targetDelta * easeProgress) + (Math.sin(i * 0.9) * 0.3)).toFixed(1);
    forecast.push(expected);
    
    // Uncertainty cone widens with days
    const uncertaintySpread = +((i / horizonDays) * (crop.id === 'chilli' ? 5.5 : 3.8) + 0.8).toFixed(1);
    upperBand.push(+(expected + uncertaintySpread).toFixed(1));
    lowerBand.push(+(Math.max(1, expected - uncertaintySpread)).toFixed(1));
  }
  
  return {
    labels,
    historical,
    forecast,
    upperBand,
    lowerBand,
    currentPrice: basePrice,
    forecastEndPrice: endForecast,
    delta: +(endForecast - basePrice).toFixed(1),
    pctChange: +(((endForecast - basePrice) / basePrice) * 100).toFixed(1)
  };
}

// Global export
if (typeof window !== "undefined") {
  window.CFP_DATA = CFP_DATA;
  window.generateChartTimeSeries = generateChartTimeSeries;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CFP_DATA, generateChartTimeSeries };
}

