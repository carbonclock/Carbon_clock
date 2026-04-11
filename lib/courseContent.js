
export const courseContent = {
  "climate-change-science-solutions": [
    {
      title: "The Climate System & the Greenhouse Effect",
      content: [
        { type: "section_heading", text: "Section 1.1 — Earth's Climate System" },
        { type: "paragraph", text: "The climate system consists of five major components that constantly interact: the atmosphere (the layer of gases surrounding Earth), the hydrosphere (all water bodies including oceans, rivers, and lakes), the cryosphere (ice sheets, glaciers, sea ice, and permafrost), the lithosphere (Earth's land surface), and the biosphere (all living organisms). These components continuously exchange energy, water, and carbon. The climate we experience is the result of all these interactions happening simultaneously over long periods of time." },
        { type: "paragraph", text: "The Sun is the primary energy source driving the entire climate system. Solar energy enters as shortwave radiation (visible light), heats the surface, and is then re-emitted as longwave radiation (infrared heat) back toward space. The balance between incoming solar energy and outgoing heat determines Earth's average temperature." },
        
        { type: "section_heading", text: "Section 1.2 — The Greenhouse Effect" },
        { type: "paragraph", text: "The greenhouse effect is a completely natural process that makes life on Earth possible. Certain gases in the atmosphere act like a blanket, allowing sunlight to pass through but trapping some of the heat that Earth tries to radiate back to space. Without this natural greenhouse effect, Earth's average surface temperature would be approximately -18 degrees C instead of the current +15 degrees C." },
        { type: "paragraph", text: "The problem is the enhanced greenhouse effect. Human activities over the past 200 years - burning coal, oil, and natural gas, cutting down forests, and industrial agriculture - have dramatically increased greenhouse gas concentrations. This has thickened the 'blanket,' trapping more heat and causing the planet to warm faster than at any time in recorded history." },
        
        { type: "heading", text: "The Six Major Greenhouse Gases" },
        { 
          type: "table", 
          headers: ["Gas", "Main Sources", "GWP100 (AR6)", "Symbol"],
          rows: [
            ["Carbon Dioxide", "Fossil fuel combustion, deforestation, cement", "1 (baseline)", "CO2"],
            ["Methane", "Livestock, natural gas leaks, landfills, rice paddies", "~30 (fossil)", "CH4"],
            ["Nitrous Oxide", "Agricultural fertilisers, wastewater, livestock", "~273", "N2O"],
            ["HFCs", "Refrigerants, air conditioning systems", "Up to 14,800", "HFCs"],
            ["PFCs", "Aluminium smelting, semiconductor manufacturing", "Up to 11,100", "PFCs"],
            ["SF6", "Electrical switchgear, high-voltage insulation", "~25,200", "SF6"]
          ]
        },

        { type: "section_heading", text: "Section 1.3 — Evidence of Climate Change" },
        { type: "paragraph", text: "The IPCC Sixth Assessment Report (AR6, 2021-2022) concluded with unequivocal certainty that human influence has warmed the climate. Key observed changes include: global average surface temperature has risen by approximately 1.1 degrees C above pre-industrial levels (as of 2011-2020); CO2 concentrations have risen from approximately 280 ppm pre-industrial to over 420 ppm today - a level not seen for at least 3 million years; sea levels are rising at an accelerating rate; Arctic sea ice has declined dramatically; and the frequency and intensity of extreme weather events have increased." },

        { type: "section_heading", text: "Section 1.4 — Global Warming Potential (GWP)" },
        { type: "paragraph", text: "GWP is a measure of how much heat the emission of one tonne of a gas will absorb over a given time period relative to one tonne of CO2. GWP is typically measured over 100 years (GWP100) - the standard used in most corporate GHG reporting." },
        { 
          type: "callout", 
          title: "GWP100", 
          text: "The heat-trapping effect of a greenhouse gas over 100 years, relative to CO2 (GWP100 = 1). Used as the standard unit in GHG reporting as CO2 equivalent (CO2e)." 
        },
        { 
          type: "callout", 
          title: "CO2e", 
          text: "Carbon dioxide equivalent. A unit expressing all greenhouse gas emissions in terms of the equivalent amount of CO2 that would cause the same warming over 100 years." 
        },

        { type: "section_heading", text: "Section 1.5 — The IPCC" },
        { type: "paragraph", text: "The Intergovernmental Panel on Climate Change (IPCC) was established in 1988 by the UN. It does not conduct original research but reviews and synthesises thousands of peer-reviewed scientific papers in its Assessment Reports, published every 5-7 years. The most recent is AR6 (2021-2022). The IPCC has three working groups: WG1 (physical science), WG2 (impacts and adaptation), WG3 (mitigation). Policymakers worldwide use IPCC findings as the scientific basis for international climate negotiations under the UNFCCC." }
      ]
    },
    {
      title: "Impacts, Risks & Tipping Points",
      content: [
        { type: "section_heading", text: "Section 2.1 — Observed and Projected Impacts" },
        { type: "paragraph", text: "Climate change is no longer a future threat - its impacts are being observed right now across every region. Sea levels have risen approximately 20 cm between 1901 and 2018 and could rise over 1 metre by 2100 under high-emission scenarios, threatening hundreds of millions in coastal areas. Extreme weather events - heatwaves, droughts, wildfires, and heavy rainfall - have become more frequent and severe. Crop yields are declining in many regions due to heat stress and changing rainfall. Biodiversity is severely disrupted; the Great Barrier Reef has experienced five mass bleaching events since 1998. Human health is directly impacted through heat illness, expanding infectious disease vectors, and reduced air quality." },

        { type: "section_heading", text: "Section 2.2 — Climate Tipping Points" },
        { type: "paragraph", text: "Tipping points are thresholds in the climate system beyond which change becomes self-sustaining and potentially irreversible. Major tipping points include: West Antarctic Ice Sheet collapse (potential 3-5 metres of sea level rise); Greenland Ice Sheet melting (potential 7 metres of sea level rise over centuries); Amazon rainforest dieback (risk of converting from carbon sink to carbon source); permafrost thaw (releasing stored methane and CO2, accelerating warming); and AMOC weakening (disrupting weather patterns across Europe and North America)." },
        { 
          type: "callout", 
          title: "Tipping Point", 
          text: "A threshold beyond which a component of the Earth system undergoes a qualitative state change that is self-perpetuating and difficult or impossible to reverse, often triggering further changes in other parts of the system." 
        },

        { type: "section_heading", text: "Section 2.3 — Climate Risk Framework" },
        { type: "paragraph", text: "Physical risks include acute risks (sudden events like floods, storms, wildfires) and chronic risks (long-term shifts like sea-level rise, changing rainfall patterns, and rising temperatures). Transition risks arise from the shift to a low-carbon economy and include policy risks (carbon taxes, fossil fuel phase-outs), technology risks (disruption from clean technologies), market risks (changing consumer preferences), and reputational risks (stakeholder pressure on high-emitting companies)." },

        { type: "section_heading", text: "Section 2.4 — The Social Cost of Carbon" },
        { type: "paragraph", text: "The Social Cost of Carbon (SCC) is the estimated economic cost of emitting one additional tonne of CO2 - capturing damages to agricultural productivity, human health, flood risk, and ecosystem services over time. The US EPA revised its estimate to approximately $190 per tonne of CO2 in 2023. The SCC is used by governments to evaluate the economic justification for climate policies." }
      ]
    },
    {
      title: "Mitigation, Adaptation & Global Frameworks",
      content: [
        { type: "section_heading", text: "Section 3.1 — Mitigation vs Adaptation" },
        { 
          type: "callout", 
          title: "Mitigation", 
          text: "Actions that reduce or prevent GHG emissions, or enhance carbon sinks, to limit the magnitude of future climate change. Example: switching to renewable energy, improving energy efficiency." 
        },
        { 
          type: "callout", 
          title: "Adaptation", 
          text: "Adjustments in human and natural systems to reduce vulnerability to climate impacts already happening or inevitable. Example: building sea walls, developing drought-resistant crops." 
        },
        { type: "paragraph", text: "Both are essential and complementary. Mitigation prevents future harm; adaptation manages harm that is already locked in. The deeper and faster the mitigation, the less adaptation will be required." },

        { type: "section_heading", text: "Section 3.2 — The Paris Agreement & NDCs" },
        { type: "paragraph", text: "The Paris Agreement (2015) is a legally binding international treaty under the UNFCCC, adopted by 196 parties. Its central aim is to limit global warming to well below 2 degrees C, preferably 1.5 degrees C, above pre-industrial levels. Every country submits its own Nationally Determined Contribution (NDC) - a climate action plan updated every 5 years with increasing ambition (the 'ratchet mechanism'). The first Global Stocktake (COP28, 2023) found current NDCs insufficient to meet the 1.5-degree goal." },

        { type: "section_heading", text: "Section 3.3 — Carbon Markets & Carbon Pricing" },
        { type: "paragraph", text: "Emissions Trading Systems (ETS) / cap-and-trade: A limit (cap) is set on total emissions from covered sectors. Companies receive or buy permits to emit. The total permits decrease over time. The EU ETS is the world's largest carbon market. Carbon taxes directly price GHG emissions - companies pay a fixed fee per tonne of CO2 emitted. Voluntary carbon markets allow companies to purchase verified carbon credits (one credit = one tonne of CO2 avoided or removed) to offset residual emissions. Leading standards: Verra VCS, Gold Standard, American Carbon Registry." },

        { type: "section_heading", text: "Section 3.4 — Nature-Based Solutions" },
        { type: "paragraph", text: "Nature-based solutions leverage ecosystems to absorb CO2 while providing benefits for biodiversity and communities. Key approaches include: reforestation and afforestation (planting trees on previously forested or new land); mangrove and coastal wetland restoration (mangroves store up to 10x more carbon per hectare than tropical forests); soil carbon sequestration through regenerative agriculture; and peatland restoration (peatlands cover only 3% of land but store more carbon than all forests combined)." },

        { type: "section_heading", text: "Section 3.5 — Net Zero" },
        { 
          type: "callout", 
          title: "Net Zero", 
          text: "The state in which the amount of greenhouse gases emitted into the atmosphere is balanced by an equivalent amount removed. Requires both deep emission reductions (90%+) and carbon dioxide removal (CDR) for residual emissions." 
        },
        { type: "paragraph", text: "The IPCC AR6 states that global CO2 emissions must reach net zero by approximately 2050 to have a reasonable chance of limiting warming to 1.5 degrees C. Net zero is distinct from 'carbon neutral' - net zero implies deeper, system-wide transformation and science-based target setting." }
      ]
    }
  ],
  "carbon-accounting-reporting": [
    {
      title: "Foundations of Carbon Accounting",
      content: [
        { type: "section_heading", text: "Section 1.1 — What is Carbon Accounting?" },
        { type: "paragraph", text: "Carbon accounting (GHG accounting) is the systematic process of identifying, measuring, and reporting an organisation's greenhouse gas emissions. It is the foundation of any serious climate strategy - you cannot manage what you cannot measure. A carbon inventory is essentially an organisation's greenhouse gas balance sheet: a comprehensive account of all emission sources and activities within defined boundaries." },
        { type: "paragraph", text: "Key drivers: EU CSRD mandatory disclosure, US SEC climate rule, India SEBI BRSR framework, investor demands (CDP, TCFD), supply chain requirements, and science-based target setting." },

        { type: "section_heading", text: "Section 1.2 — The Five GHG Protocol Accounting Principles" },
        { type: "list", items: [
          "Relevance: Include what matters and reflects the company's actual GHG exposure and decision-making needs.",
          "Completeness: Account for all emission sources within the chosen boundary. Document and justify any exclusions.",
          "Consistency: Use the same methodologies and boundaries year-over-year. Document and restate when changes occur.",
          "Transparency: Provide a clear audit trail showing data sources, emission factors, methodologies, and assumptions.",
          "Accuracy: Choose the most accurate data available. Minimise systematic over- or under-estimation of emissions."
        ]},

        { type: "section_heading", text: "Section 1.3 — Setting Organisational Boundaries" },
        { 
          type: "callout", 
          title: "Equity Share", 
          text: "Consolidate GHG emissions in proportion to the share of equity (ownership) held in each operation. E.g. 40% ownership of a JV = report 40% of that JV's emissions." 
        },
        { 
          type: "callout", 
          title: "Operational Control", 
          text: "Consolidate 100% of emissions from operations over which the company has authority to introduce and implement operating policies. Most widely used approach." 
        },
        { 
          type: "callout", 
          title: "Financial Control", 
          text: "Consolidate 100% of emissions from operations over which the company has financial control (ability to direct financial and operating policies for economic benefit)." 
        },

        { type: "section_heading", text: "Section 1.4 — The Three Scopes" },
        { 
          type: "table", 
          headers: ["Scope", "Definition", "Examples"],
          rows: [
            ["Scope 1", "Direct emissions from owned/controlled sources", "Boilers, company vehicles, on-site manufacturing, fugitive refrigerant leaks"],
            ["Scope 2", "Indirect emissions from purchased energy (electricity, heat, steam, cooling)", "Electricity used to power offices, factories, data centres"],
            ["Scope 3", "All other indirect value chain emissions - typically 70-90% of total footprint", "Purchased goods, business travel, employee commuting, use of sold products, investments"]
          ]
        }
      ]
    },
    {
      title: "Scope 1, 2 & 3 Emissions Measurement",
      content: [
        { type: "section_heading", text: "Section 2.1 — The Basic GHG Calculation Formula" },
        { type: "paragraph", text: "GHG Emissions (tCO2e) = Activity Data x Emission Factor" },
        { type: "paragraph", text: "Activity Data: The magnitude of the human activity causing emissions (e.g. litres of fuel consumed, kWh of electricity used, tonnes of waste sent to landfill). Emission Factor: A coefficient converting activity data into GHG emissions (e.g. kg CO2e per litre of diesel)." },

        { type: "section_heading", text: "Section 2.2 — Scope 1 Measurement" },
        { type: "list", items: [
          "Stationary Combustion: Boilers, furnaces, generators. Activity data = fuel consumption (litres, m3, GJ). Multiply by appropriate fuel emission factor (DEFRA, IPCC, EPA).",
          "Mobile Combustion: Company vehicles. Activity data = fuel consumed (fuel-based, more accurate) or distance traveled + vehicle type (distance-based).",
          "Fugitive Emissions: Refrigerant leaks, SF6 from switchgear. Activity data = mass of refrigerant purchased to recharge equipment. Multiply by GWP of that specific refrigerant."
        ]},

        { type: "section_heading", text: "Section 2.3 — Scope 2: Two Methods" },
        { 
          type: "callout", 
          title: "Location-Based Method", 
          text: "Uses average emission intensity of the electricity grid (national/regional average). Reflects the actual generation mix in the region. Example: India's state-level grid emission factors from the CEA." 
        },
        { 
          type: "callout", 
          title: "Market-Based Method", 
          text: "Uses emission intensity of electricity specifically contracted through PPAs, RECs, or green tariffs. A company with 100% renewable PPAs and matching RECs can report zero Scope 2 emissions under this method." 
        },
        { type: "paragraph", text: "Both methods must be reported where data is available per GHG Protocol Scope 2 Guidance (2015). The market-based figure is used in target-setting." },

        { type: "section_heading", text: "Section 2.4 — All 15 Scope 3 Categories" },
        { 
          type: "table", 
          headers: ["#", "Category", "Description"],
          rows: [
            ["1", "Purchased goods & services", "Emissions from production of all goods/services a company buys. Often largest Scope 3 category for manufacturers."],
            ["2", "Capital goods", "Emissions from production of equipment, buildings, vehicles purchased."],
            ["3", "Fuel & energy activities", "Upstream extraction and processing of fuels and grid transmission losses (not in S1/S2)."],
            ["4", "Upstream transport", "Transporting purchased goods by road, rail, sea, or air."],
            ["5", "Waste in operations", "Disposal and treatment of waste generated at company facilities."],
            ["6", "Business travel", "Flights, hotels, rail for employee business trips."],
            ["7", "Employee commuting", "Employees traveling between home and workplace."],
            ["8", "Upstream leased assets", "Assets leased by the company not included in Scope 1/2."],
            ["9", "Downstream transport", "Transporting products sold by the company to customers."],
            ["10", "Processing of sold products", "Processing of intermediate products sold to third parties."],
            ["11", "Use of sold products", "Emissions from customers using the company's products (e.g. appliances, vehicles). Often the largest downstream category."],
            ["12", "End-of-life treatment", "Waste disposal/recycling of products at end of useful life."],
            ["13", "Downstream leased assets", "Assets owned by company but leased to others."],
            ["14", "Franchises", "Emissions from operation of franchises."],
            ["15", "Investments", "Financed emissions. Critical for banks, insurers, asset managers."]
          ]
        }
      ]
    },
    {
      title: "Reporting Standards & Verification",
      content: [
        { type: "section_heading", text: "Section 3.1 — Key Disclosure Frameworks" },
        { type: "paragraph", text: "CDP (Carbon Disclosure Project): A global non-profit disclosure platform used by over 740 institutional investors managing $130+ trillion. Companies report annually on climate change, water, and forests. Scored A (Leadership) to D (Disclosure) to F (non-disclosure)." },
        { type: "paragraph", text: "GRI Standards: World's most widely used sustainability reporting framework, used by 10,000+ organisations. Universal Standards (GRI 1, 2, 3) apply to all. GRI 305 covers GHG emissions including Scope 1, 2, and 3 reporting with methodology disclosure." },
        { type: "paragraph", text: "TCFD: Established by the Financial Stability Board. Four pillars: Governance (board oversight of climate), Strategy (climate risks and opportunities, scenario analysis), Risk Management (identification and integration), and Metrics & Targets (Scope 1, 2, 3 emissions, targets). Now mandatory or regulation-backed in UK, NZ, Japan, EU." },
        { type: "paragraph", text: "CSRD and Double Materiality: EU's Corporate Sustainability Reporting Directive (in force January 2023) replaces NFRD. Reporting under ESRS (European Sustainability Reporting Standards). Introduces double materiality: companies must report both impact materiality (company's impacts on society/environment - inside-out) and financial materiality (ESG impacts on the company - outside-in). Both dimensions are mandatory." },
        { type: "paragraph", text: "CBAM: EU Carbon Border Adjustment Mechanism: a carbon levy on imports of carbon-intensive products (steel, cement, aluminium, fertilisers, electricity, hydrogen) into the EU. Prevents carbon leakage. Transitional reporting phase: October 2023 - December 2025. Full financial obligations from January 2026. Significant implications for Indian steel and aluminium exporters to the EU." },

        { type: "section_heading", text: "Section 3.2 — Third-Party Verification" },
        { 
          type: "callout", 
          title: "Limited Assurance", 
          text: "Lower level of verification. Verifier conducts targeted checks and concludes nothing causes them to believe the inventory is materially misstated. Analogous to a review, not a full audit." 
        },
        { 
          type: "callout", 
          title: "Reasonable Assurance", 
          text: "Higher level - equivalent to a financial statement audit. Extensive testing of data, systems, and controls. Verifier positively concludes the inventory is presented fairly and free from material error." 
        },
        { type: "paragraph", text: "Verification standards: ISO 14064-3 and ISAE 3410. Third-party verifiers must be accredited by recognised national accreditation bodies." }
      ]
    }
  ],
  "ghg-accounting-protocol": [
    {
      title: "GHG Protocol: Corporate Standard",
      content: [
        { type: "section_heading", text: "Section 1.1 — What is the GHG Protocol?" },
        { type: "paragraph", text: "The GHG Protocol was developed through a partnership between the World Resources Institute (WRI) and the World Business Council for Sustainable Development (WBCSD). First published in 2001 and revised in 2004, it is the world's most widely used international accounting tool for quantifying and managing GHG emissions. It is not a regulation but a voluntary standard that underpins virtually every national and international climate reporting framework including CDP, TCFD, CSRD, and SBTi." },
        { type: "paragraph", text: "The GHG Protocol suite includes: the Corporate Accounting and Reporting Standard (company-level inventories), the Corporate Value Chain (Scope 3) Standard (2011), the Product Life Cycle Accounting Standard, the Project Protocol, the Policy and Action Standard, and the Scope 2 Guidance (2015)." },

        { type: "section_heading", text: "Section 1.2 — The Five Principles in Practice" },
        { type: "list", items: [
          "Relevance: A logistics company cannot omit fleet emissions because they are complex to measure - fleet is the most relevant part of a logistics company's footprint.",
          "Completeness: If a Scope 3 category is excluded, document and justify the exclusion. Systematic omission of large emission categories is a form of greenwashing.",
          "Consistency: If methodology changes or a new subsidiary is acquired, restate the base year inventory. Comparing inventories built on different boundaries is meaningless.",
          "Transparency: Every calculation should be documented with source data, emission factors, unit conversions, and assumptions so a third-party can reproduce it.",
          "Accuracy: Measure directly rather than estimating wherever possible. A fuel bill is far more accurate than an estimate based on floor area."
        ]},

        { type: "section_heading", text: "Section 1.3 — Consolidation Approaches in Practice" },
        { type: "paragraph", text: "Equity share: The company reports its proportional share of each operation's emissions. Simple and mirrors financial accounting treatment of investments." },
        { type: "paragraph", text: "Operational control (most widely used): The company reports 100% of emissions from operations where it has authority to set operating policies. A company may lease and operate a warehouse it does not own - it has operational control and reports 100% of its emissions." },
        { type: "paragraph", text: "Financial control: Consolidates 100% of emissions from operations where the company has financial control as defined by IFRS or US GAAP. Aligns most closely with financial consolidation standards." },
        { type: "paragraph", text: "Example: Company owns 60% of a cement plant JV. Under equity share: report 60% of plant emissions. Under operational control: if it runs the plant, report 100%. Under financial control: depends on IFRS consolidation treatment." }
      ]
    },
    {
      title: "Activity Data & Emission Factors",
      content: [
        { type: "section_heading", text: "Section 2.1 — Activity Data Collection" },
        { type: "paragraph", text: "Primary data sources include: utility bills (electricity, gas) for Scope 2; fuel purchase invoices and fleet management systems for Scope 1 combustion; refrigerant recharge records for fugitive emissions; production output data for process emissions. Secondary/estimated data includes: industry averages and benchmarks, supplier emission factors or EPDs, physical models and engineering estimates, and spend-based proxies (for Scope 3)." },

        { type: "section_heading", text: "Section 2.2 — Key Emission Factor Databases" },
        { 
          type: "table", 
          headers: ["Database", "Maintained By", "Best Used For"],
          rows: [
            ["DEFRA GHG Conversion Factors", "UK Government (DESNZ/DBET) - updated annually", "UK-based reporting; fuel, travel, waste, electricity and free"],
            ["IPCC Guidelines for National GHG Inventories", "UN IPCC", "National inventories; process emissions; default global factors"],
            ["US EPA Emission Factors", "US Environmental Protection Agency", "US operations; stationary/mobile combustion, refrigerants"],
            ["IEA Electricity Emission Factors", "International Energy Agency", "Grid electricity factors by country (annual updates) - essential for Scope 2"],
            ["Ecoinvent (v3.x)", "Ecoinvent Centre, Switzerland", "Scope 3 background data; process-level; most comprehensive LCI database"],
            ["EXIOBASE / MRIO", "Academic/EU research institutions", "Spend-based Scope 3 estimates using multi-regional input-output analysis"]
          ]
        },

        { type: "section_heading", text: "Section 2.3 — GWP100 Values (IPCC AR6, 2021)" },
        { type: "list", items: [
          "CO2: 1 (baseline by definition)",
          "CH4 (methane, fossil source): approximately 30",
          "CH4 (methane, biogenic source): approximately 27",
          "N2O (nitrous oxide): approximately 273",
          "SF6 (sulfur hexafluoride): approximately 25,200",
          "HFC-134a (common refrigerant): approximately 1,530",
          "PFC-14 (tetrafluoromethane): approximately 7,380"
        ]},
        { type: "paragraph", text: "Companies should use the GWP values from the IPCC report specified by their reporting framework. Always disclose the GWP vintage used (e.g. AR5, AR6). Older inventories using AR4 values (CH4=25) are not directly comparable to AR6 inventories." }
      ]
    },
    {
      title: "Target-Setting: SBTi, Net Zero & NDCs",
      content: [
        { type: "section_heading", text: "Section 3.1 — The Science Based Targets Initiative (SBTi)" },
        { type: "paragraph", text: "SBTi is a partnership between CDP, UN Global Compact, WRI, and WWF. It provides companies with a clearly defined, independently validated pathway to set GHG reduction targets consistent with limiting warming to 1.5 degrees C. An approved SBTi target means the company has followed validated methodology, submitted its target for independent review, and had it formally approved. Approved companies are listed publicly in the SBTi database." },
        
        { type: "heading", text: "Near-Term Targets (to approximately 2030)" },
        { type: "list", items: [
          "1.5 degrees C aligned: at least 42% absolute reduction in Scope 1 and 2 by 2030 from base year",
          "If Scope 3 is 40%+ of total emissions: must also set a Scope 3 target (at least 25% absolute reduction or engagement target)"
        ]},

        { type: "heading", text: "Long-Term Net-Zero Targets (to 2050)" },
        { type: "list", items: [
          "Reduce Scope 1, 2, and 3 by at least 90% from base year by no later than 2050",
          "Remaining residual emissions (up to 10%) neutralised by permanent carbon dioxide removals only",
          "Both near-term and long-term targets are required for full SBTi Net-Zero validation"
        ]},

        { type: "section_heading", text: "Section 3.2 — Target-Setting Methods" },
        { type: "paragraph", text: "Absolute Contraction Approach (ACA): Most widely used. Commit to reducing absolute emissions by a fixed percentage by a target year, aligned to a warming scenario. The simplest and most transparent method - direct reduction from X tonnes to X minus Y tonnes by a target date." },
        { type: "paragraph", text: "Sectoral Decarbonisation Approach (SDA): For capital-intensive, homogeneous sectors: steel, cement, pulp and paper, power generation, aluminium. Allocates a carbon budget based on the sector's share of the global carbon budget. Companies set intensity-based targets (e.g. tCO2e per tonne of steel) rather than absolute targets." },
        { type: "paragraph", text: "Economic Intensity Method: For companies where revenue intensity is the most appropriate denominator. Reduces GHG emissions per unit of value added in line with a climate scenario. Appropriate where revenue and production volume are closely linked." },

        { type: "section_heading", text: "Section 3.3 — The Role of Carbon Credits Under SBTi" },
        { type: "paragraph", text: "This is critical and frequently misunderstood. Carbon credits CANNOT be used to meet near-term or long-term emission reduction targets. Companies cannot buy offsets instead of reducing emissions and claim their SBTi target is met." },
        { type: "paragraph", text: "However, SBTi encourages beyond-value-chain mitigation (BVCM) - financing high-quality climate projects outside the value chain as a supplement to, not a substitute for, emission reductions. For the net-zero claim, residual emissions must be neutralised by permanent CDR only - not avoided-emission offset credits. High-quality standards: Verra VCS, Gold Standard, American Carbon Registry." }
      ]
    }
  ],
  "life-cycle-assessment": [
    {
      title: "LCA Fundamentals & ISO Framework",
      content: [
        { type: "section_heading", text: "Section 1.1 — What is Life Cycle Assessment?" },
        { type: "paragraph", text: "Life Cycle Assessment (LCA) is a systematic, standardised methodology for evaluating the environmental impacts associated with all stages of a product, process, or service - from raw material extraction (the cradle) through manufacturing, distribution, use, maintenance, and final disposal or recycling (the grave). LCA avoids the trap of 'burden shifting' - solving one environmental problem by creating a worse one elsewhere in the life cycle." },
        { type: "paragraph", text: "Governed by ISO 14040 (principles and framework) and ISO 14044 (requirements and guidelines). Used for eco-design, Environmental Product Declarations (EPDs), green procurement, policy making, and comparative advertising claims." },

        { type: "section_heading", text: "Section 1.2 — The Four Phases of LCA" },
        { type: "heading", text: "Phase 1: Goal and Scope Definition" },
        { type: "paragraph", text: "Defines the purpose, intended audience, functional unit, system boundary, and key assumptions. The most important phase - every subsequent decision flows from it." },
        { 
          type: "callout", 
          title: "Functional Unit", 
          text: "A quantified description of the function of the product system, used as the reference basis for all calculations. Example: 'washing 1 kg of laundry at 40 degrees C' for a detergent comparison study." 
        },

        { type: "heading", text: "Phase 2: Life Cycle Inventory (LCI) Analysis" },
        { type: "paragraph", text: "Data collection phase. Quantify all inputs (energy, water, raw materials) and outputs (products, emissions to air/water/land, waste) for every process within the system boundary. Uses primary data (measured directly) or secondary data from LCI databases." },

        { type: "heading", text: "Phase 3: Life Cycle Impact Assessment (LCIA)" },
        { type: "paragraph", text: "Translate LCI data into environmental impact scores across multiple categories: climate change (GWP), acidification, eutrophication, water use, land use, human toxicity, etc. Results expressed in characterisation factors." },

        { type: "heading", text: "Phase 4: Interpretation" },
        { type: "paragraph", text: "Evaluate findings from LCI and LCIA relative to the goal and scope. Includes hotspot analysis, sensitivity analysis, and deriving recommendations. Runs iteratively throughout the study." },

        { type: "section_heading", text: "Section 1.3 — System Boundaries" },
        { 
          type: "table", 
          headers: ["Boundary", "Scope Covered"],
          rows: [
            ["Cradle-to-Gate", "Raw material extraction through factory gate (excludes use and end-of-life)"],
            ["Cradle-to-Grave", "Full life cycle: raw material extraction through product use to end-of-life disposal"],
            ["Cradle-to-Cradle", "Circular model: includes recycling/recovery as a new input to the system"],
            ["Gate-to-Gate", "Single manufacturing process or facility only"],
            ["Well-to-Wheel", "Fuel extraction through combustion in vehicle (transport-specific)"]
          ]
        },

        { type: "section_heading", text: "Section 1.4 — Attributional vs Consequential LCA" },
        { 
          type: "callout", 
          title: "Attributional LCA", 
          text: "Describes the physically relevant flows of a product system as it currently exists using average background data. Answers: what are the impacts of producing this product today? Used for EPDs, carbon footprinting, product comparison." 
        },
        { 
          type: "callout", 
          title: "Consequential LCA", 
          text: "Models how flows change as a consequence of a decision using marginal data. Answers: what happens to total system emissions if demand for this product changes? Used for policy analysis and investment decisions." 
        }
      ]
    },
    {
      title: "Life Cycle Inventory & Impact Assessment",
      content: [
        { type: "section_heading", text: "Section 2.1 — LCI Databases" },
        { type: "paragraph", text: "• Ecoinvent(v3.x): World's most comprehensive LCI database. Thousands of processes across energy, materials, chemicals, transport, agriculture, waste. Used in virtually every professional LCA software. Available in attributional and consequential system models." },
        { type: "paragraph", text: "• GaBi Database (Sphera): Strong coverage of plastics, metals, construction materials, electronics. Commercial." },
        { type: "paragraph", text: "• US Life Cycle Inventory Database (USLCI): Maintained by NREL. Free, US-specific background data." },
        { type: "paragraph", text: "• EPLCA / ILCD (EU): European Commission maintained database aligned with ILCD methodology standards." },

        { type: "section_heading", text: "Section 2.2 — LCIA Methodologies" },
        { 
          type: "table", 
          headers: ["Method", "Developed By", "Key Features"],
          rows: [
            ["ReCiPe 2016", "RIVM, Radboud, CML (Netherlands)", "Most widely used globally. Both midpoint (18 categories) AND endpoint levels within one framework. Recommended for most studies."],
            ["CML-IA", "Leiden University (Netherlands)", "Midpoint only. Well-established for European comparative LCA. GWP, acidification, eutrophication, toxicity, resource depletion."],
            ["TRACI 2.1", "US EPA", "Developed for North American context. Recommended for US-based LCA studies. Midpoint only."],
            ["ILCD/EF", "European Commission", "16 impact categories. Basis for EU Product Environmental Footprint (PEF). Key for products sold in Europe."],
            ["IMPACT World+", "CIRAIG (Canada)", "Strong water and land use characterisation. Newer method gaining adoption."]
          ]
        },

        { type: "section_heading", text: "Section 2.3 — Midpoint vs Endpoint Indicators" },
        { 
          type: "callout", 
          title: "Midpoint Indicators", 
          text: "Impacts at an intermediate point in the cause-effect chain. Examples: Global Warming Potential (kg CO2e), Acidification (kg SO2e), Eutrophication (kg PO4e), Water Consumption (m3). Less uncertain, more specific." 
        },
        { 
          type: "callout", 
          title: "Endpoint Indicators", 
          text: "Final damage-oriented categories: Human Health (DALYs - disability-adjusted life years), Ecosystem Quality (species*year loss), Resource Scarcity (USD). More policy-relevant but more uncertain due to long cause-effect chains." 
        },

        { type: "section_heading", text: "Section 2.4 — Allocation and System Expansion" },
        { type: "paragraph", text: "When a process produces more than one useful output (co-products), the environmental burden must be divided. ISO 14044 recommends avoiding allocation where possible, preferring system expansion (substitution)." },
        { type: "paragraph", text: "System Expansion: Expand the system boundary to include the alternative product that a co-product displaces. The avoided impacts of the displaced production are credited (subtracted) from the process's environmental burden." },
        { type: "paragraph", text: "Allocation (when unavoidable): Divide the burden based on physical properties (mass, energy) or economic value. Physical allocation preferred over economic allocation per ISO 14044 hierarchy." }
      ]
    },
    {
      title: "Interpretation, Application & EPDs",
      content: [
        { type: "section_heading", text: "Section 3.1 — The Interpretation Phase" },
        { type: "heading", text: "Completeness Check" },
        { type: "paragraph", text: "Verify that all relevant data has been collected and no significant flows omitted from the system boundary." },
        
        { type: "heading", text: "Sensitivity Analysis" },
        { type: "paragraph", text: "Test how sensitive results are to changes in key assumptions, data sources, or system boundary choices. If changing one parameter by 20% significantly changes the conclusion, the study must clearly communicate this uncertainty." },
        
        { type: "heading", text: "Hotspot Analysis" },
        { type: "paragraph", text: "Identify which life cycle stage, process, or material flow contributes most to each impact category. This is the most direct output for eco-design purposes - it tells designers exactly where to focus improvement efforts." },

        { type: "section_heading", text: "Section 3.2 — Environmental Product Declarations (EPDs)" },
        { 
          type: "callout", 
          title: "EPD", 
          text: "A standardised, third-party verified document communicating the quantified environmental performance of a product based on an ISO 14044 LCA. Governed by ISO 14025. Sometimes called an 'environmental fact sheet' for products." 
        },
        { type: "paragraph", text: "EPDs are produced according to Product Category Rules (PCRs) - standardised documents specifying scope, methodology, and reporting requirements for a specific product category. PCRs ensure comparability between EPDs for similar products." },
        { type: "paragraph", text: "EPDs are widely used in: LEED v4 (awards Material Resources credits for products with EPDs and for whole-building LCA); BREEAM (awards credits for EPD-backed material selection); EU public procurement; and supply chain transparency initiatives." },

        { type: "section_heading", text: "Section 3.3 — LCA in Green Building Certification" },
        { type: "paragraph", text: "Whole-building LCA assesses environmental impact across the full building life cycle - from embodied carbon in construction materials to operational energy to demolition. EN 15978 (European standard) defines the framework: A1-A3 (product manufacturing), A4-A5 (construction), B1-B7 (in-use phase), C1-C4 (end-of-life), D (beyond boundary - reuse, recovery, recycling potential)." },
        { type: "list", items: [
          "LEED v4 Materials and Resources: Requires EPDs for building products; additional credits for whole-building LCA demonstrating reduced embodied carbon vs baseline.",
          "BREEAM Materials category: Credits for responsibly sourced materials with verified EPDs and for low-embodied-carbon specification."
        ]}
      ]
    }
  ],
  "sustainability-fundamentals-esg": [
    {
      title: "Sustainability Fundamentals",
      content: [
        { type: "section_heading", text: "Section 1.1 — What is Sustainability?" },
        { 
          type: "callout", 
          title: "Sustainable Development", 
          text: "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs. — Brundtland Commission, Our Common Future, 1987" 
        },
        { type: "paragraph", text: "Sustainability has three interconnected pillars: Environmental (protecting natural systems - climate, biodiversity, air, water, soil), Social (human well-being, equity, labor rights, community resilience), and Economic (long-term prosperity within ecological limits). True sustainability requires all three simultaneously - an activity that is profitable but destroys ecosystems, or protects nature but destroys livelihoods, is not sustainable." },

        { type: "section_heading", text: "Section 1.2 — The Triple Bottom Line" },
        { type: "paragraph", text: "Coined by John Elkington in 1994 and developed in his 1997 book 'Cannibals With Forks,' the Triple Bottom Line (TBL) asks businesses to measure performance across three dimensions: People (social equity, labor rights, community impact, human rights, diversity), Planet (environmental stewardship, resource efficiency, climate action, biodiversity), and Profit (economic value creation within social and environmental limits)." },
        { type: "paragraph", text: "In 2018 Elkington himself published a 'recall' of the TBL concept in Harvard Business Review, arguing it had been adopted as an accounting tool rather than the catalyst for systemic change it was intended to be." },

        { type: "section_heading", text: "Section 1.3 — Planetary Boundaries" },
        { type: "paragraph", text: "The planetary boundaries framework (Rockstrom et al., 2009; updated 2023) identifies nine Earth system processes defining a 'safe operating space' for humanity. As of 2023, SIX of nine boundaries have been transgressed: climate change, biosphere integrity (biodiversity), land-system change, freshwater change, biogeochemical flows (nitrogen and phosphorus cycles), and novel entities (chemical pollution and plastics). Ocean acidification is approaching its boundary. This means humanity is operating outside the safe operating space on six dimensions simultaneously." },

        { type: "section_heading", text: "Section 1.4 — The UN Sustainable Development Goals (SDGs)" },
        { type: "paragraph", text: "The 17 SDGs were adopted by all 193 UN member states in September 2015 as part of the 2030 Agenda for Sustainable Development." },
        { 
          type: "table", 
          headers: ["#", "SDG", "Focus Area"],
          rows: [
            ["1", "No Poverty", "End poverty in all its forms everywhere"],
            ["2", "Zero Hunger", "End hunger, achieve food security and improved nutrition"],
            ["3", "Good Health & Well-Being", "Ensure healthy lives and promote well-being at all ages"],
            ["4", "Quality Education", "Ensure inclusive, equitable quality education for all"],
            ["5", "Gender Equality", "Achieve gender equality and empower all women and girls"],
            ["6", "Clean Water & Sanitation", "Ensure access to water and sanitation for all"],
            ["7", "Affordable & Clean Energy", "Ensure access to affordable, reliable, sustainable energy"],
            ["8", "Decent Work & Economic Growth", "Promote sustainable economic growth and decent work for all"],
            ["9", "Industry, Innovation & Infrastructure", "Build resilient infrastructure and sustainable industrialisation"],
            ["10", "Reduced Inequalities", "Reduce inequalities within and among countries"],
            ["11", "Sustainable Cities", "Make cities inclusive, safe, resilient, and sustainable"],
            ["12", "Responsible Consumption", "Ensure sustainable consumption and production patterns"],
            ["13", "Climate Action", "Take urgent action to combat climate change and its impacts"],
            ["14", "Life Below Water", "Conserve and sustainably use oceans and marine resources"],
            ["15", "Life on Land", "Protect, restore, and sustainably use terrestrial ecosystems"],
            ["16", "Peace, Justice & Strong Institutions", "Promote just, peaceful, and inclusive societies"],
            ["17", "Partnerships for the Goals", "Strengthen the means of implementation and revitalize the global partnership"]
          ]
        },

        { type: "section_heading", text: "Section 1.5 — The Circular Economy" },
        { 
          type: "callout", 
          title: "Circular Economy", 
          text: "An economic model eliminating waste and pollution by design, keeping products and materials in use as long as possible, and regenerating natural systems. An alternative to the linear 'take-make-dispose' economy." 
        },
        { type: "paragraph", text: "The Ellen MacArthur Foundation (est. 2010) is the world's leading organisation promoting the circular economy. Key strategies include: design for longevity and repairability, product-as-a-service models, industrial symbiosis (one industry's waste as another's raw material), extended producer responsibility (EPR), and biological regeneration of natural materials." }
      ]
    },
    {
      title: "ESG Reporting & Frameworks",
      content: [
        { type: "section_heading", text: "Section 2.1 — What is ESG?" },
        { type: "paragraph", text: "ESG stands for Environmental, Social, and Governance - a framework through which investors, lenders, regulators, and stakeholders evaluate a company's sustainability performance and risk beyond traditional financial statements." },
        { type: "list", items: [
          "Environmental (E): GHG emissions, energy use, water consumption, waste, biodiversity impact, environmental compliance",
          "Social (S): Labor practices, worker safety, diversity and inclusion, supply chain human rights, data privacy, community relations",
          "Governance (G): Board composition and independence, executive remuneration, anti-corruption policies, shareholder rights, audit quality, disclosure transparency"
        ]},
        { type: "paragraph", text: "ESG matters because these factors are increasingly financially material - affecting long-term profitability, risk profiles, cost of capital, talent attraction, and resilience to disruptions." },

        { type: "section_heading", text: "Section 2.2 — GRI Standards" },
        { type: "paragraph", text: "GRI 1 (Foundation): Purpose of GRI Standards, key concepts (sustainability reporting, materiality, due diligence). GRI 2 (General Disclosures): Organisation profile, strategy, governance, stakeholder engagement. GRI 3 (Material Topics): How to determine and report on material topics. GRI 305 (Emissions): Scope 1, 2 (location-based and market-based), and Scope 3 emissions disclosure with methodology." },

        { type: "section_heading", text: "Section 2.3 — TCFD Framework" },
        { type: "paragraph", text: "The TCFD four pillars: Governance (board oversight of climate risks and opportunities); Strategy (actual and potential impacts of climate risks - physical and transition - on the business, including scenario analysis against at least a 2-degree scenario); Risk Management (how climate risks are identified, assessed, and integrated with enterprise risk management); Metrics and Targets (Scope 1, 2, 3 emissions, targets and performance). Now mandatory or regulation-backed in UK, NZ, Japan, Singapore, EU." },

        { type: "section_heading", text: "Section 2.4 — CSRD and Double Materiality" },
        { 
          type: "callout", 
          title: "Double Materiality", 
          text: "The requirement under CSRD to assess and report on two dimensions: (1) Financial materiality - how ESG issues affect the company's finances (outside-in); and (2) Impact materiality - how the company's activities affect society and the environment (inside-out). Both are mandatory." 
        },
        { type: "paragraph", text: "CSRD (in force January 2023) replaces the NFRD. Reporting under ESRS (European Sustainability Reporting Standards) covering climate, pollution, water, biodiversity, circular economy, workforce, communities, business conduct, and governance. Large EU companies from FY2024; listed SMEs from FY2026." },

        { type: "section_heading", text: "Section 2.5 — CBAM and ISSB" },
        { type: "list", items: [
          "CBAM: EU carbon levy on imports of steel, cement, aluminium, fertilisers, electricity, hydrogen. Importers must declare embedded GHG emissions and surrender CBAM certificates. Transitional phase: Oct 2023 - Dec 2025. Full financial obligations from 2026. Critical for Indian steel and aluminium exporters to EU.",
          "ISSB (IFRS S1 and S2): Published June 2023 by International Sustainability Standards Board under IFRS Foundation. IFRS S2 built on TCFD - requires Scope 1, 2, 3 emissions, climate risks, transition plans. Being adopted into national regulatory frameworks in Australia, Canada, UK, Japan, Singapore, Brazil."
        ]}
      ]
    },
    {
      title: "ESG Strategy & Implementation",
      content: [
        { type: "section_heading", text: "Section 3.1 — Embedding Sustainability into Corporate Strategy" },
        { type: "paragraph", text: "Sustainability has moved from a peripheral CSR function to a core strategic, risk management, and capital allocation consideration. Key drivers: CSRD, ISSB, SEC climate rules, supply chain due diligence laws, investor demands, customer procurement requirements, and physical climate risks becoming tangible financial risks." },
        { 
          type: "list", 
          items: [
            "Materiality mapping: Identifying ESG topics most significant through structured stakeholder engagement. Drives strategy, targets, and reporting priorities.",
            "Sustainability governance: Board-level oversight, sustainability committees, linking executive pay to ESG targets.",
            "Net-zero transition planning: Science-based targets, decarbonisation roadmaps, Paris-aligned capital expenditure.",
            "Value chain engagement: Supplier codes of conduct, responsible sourcing, supply chain due diligence (EU CSDDD, German LkSG)."
          ] 
        },

        { type: "section_heading", text: "Section 3.2 — ESG Ratings" },
        { 
          type: "table", 
          headers: ["Provider", "Key Notes"],
          rows: [
            ["MSCI ESG Ratings", "Rates companies AAA to CCC. Widely used by institutional investors and index providers for capital allocation."],
            ["Sustainalytics", "ESG risk ratings used by Morningstar. Focuses on material financial risk from ESG factors."],
            ["CDP", "Scored A to D- based on annual questionnaire responses. Data-driven. Used in procurement and investment."],
            ["ISS ESG", "Governance-focused. Proxy advisory services. ESG research for institutional investors."],
            ["S&P / DJSI", "Dow Jones Sustainability Indices. High prestige for inclusion. Used by ESG fund managers globally."],
            ["FTSE4Good", "FTSE Russell managed index for socially responsible investment screening."]
          ]
        },
        { type: "paragraph", text: "Important limitation: The same company can receive dramatically different ratings from different agencies - correlation between major ESG rating providers can be as low as 0.4, compared to 0.9+ for credit rating agencies. This occurs because different agencies cover different issues, weight them differently, and use different data collection methods." },

        { type: "section_heading", text: "Section 3.3 — Sustainable Finance" },
        { 
          type: "callout", 
          title: "Green Bond", 
          text: "A fixed-income instrument whose proceeds are exclusively used to finance or refinance green and sustainable projects: renewable energy, energy efficiency, clean transport, sustainable water, biodiversity conservation, climate adaptation." 
        },
        { type: "list", items: [
          "Green Bond Principles (ICMA): Leading voluntary guidelines for green bonds. EU Green Bond Standard provides a more stringent framework aligned with the EU Taxonomy.",
          "Sustainability-linked bonds/loans: Financial terms (interest rates) linked to achieving specific ESG performance targets - proceeds can be used for general corporate purposes.",
          "ESG investing strategies: Negative screening (exclude harmful sectors), positive/best-in-class, thematic (clean energy, water, gender equality), impact investing, ESG integration across all investments."
        ]},

        { type: "section_heading", text: "Section 3.4 — Supply Chain Due Diligence" },
        { type: "list", items: [
          "German LkSG (Supply Chain Due Diligence Act, 2023): Large German companies must identify and address human rights and environmental risks in their supply chains.",
          "EU CSDDD (Corporate Sustainability Due Diligence Directive): Requires EU companies to identify and address adverse human rights and environmental impacts across value chains.",
          "French Duty of Vigilance Law (2017): France's pioneering requirement for large companies to publish vigilance plans covering supply chain risks."
        ]},

        { type: "section_heading", text: "Section 3.5 — Constructing a Credible Sustainability Report" },
        { type: "paragraph", text: "Key components of a credible sustainability report: rigorous materiality assessment, alignment with recognised framework (GRI, TCFD, CSRD/ESRS, ISSB), quantitative data on all material topics (Scope 1/2/3 emissions, energy, water, waste, diversity metrics), measurable and time-bound targets with progress tracking, honest discussion of challenges, governance disclosures, and third-party assurance of key data." },
        { type: "paragraph", text: "Greenwashing: Making misleading, unsubstantiated, or false claims about environmental performance. Common forms include: focusing only on positive initiatives while omitting significant negatives; using vague language ('eco-friendly,' 'sustainable,' 'green') without evidence; claiming carbon neutrality via offsets without disclosing underlying emission levels; and claiming credit for regulatory compliance as if it were voluntary leadership." },
        { type: "paragraph", text: "The EU Green Claims Directive (being finalised) will require companies to substantiate environmental claims with life cycle evidence before making them publicly. Advertising standards authorities in the UK, Netherlands, and other countries have already ruled against numerous greenwashing campaigns." }
      ]
    }
  ]
};
