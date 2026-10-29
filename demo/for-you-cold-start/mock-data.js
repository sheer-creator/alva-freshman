// For You · 冷启动 · C 原卡连接 (Thesis-MVP 13097:100173) — static mock feed.
// Threads 1–2 copy the Figma frame. The rest pair real theses with real signals and Alva reads from the
// “Signal × Thesis 混排” reference artifact (snapshot 2026-10-26); thesis post times other than Algostonk’s
// are not in that data and are mock values.
window.COLD_START_MOCK = {
  "threads": [
    {
      "id": "roger",
      "author": "Roger",
      "avatar": "avatar-roger.jpg",
      "age": "9h ago",
      "tickers": [
        [
          "NBIS",
          "ticker-nbis.png",
          "down"
        ],
        [
          "ORCL",
          "ticker-orcl.png",
          "down"
        ],
        [
          "OWL",
          "ticker-owl.png",
          "down"
        ],
        [
          "CRWV",
          "ticker-crwv.png",
          "down"
        ],
        [
          "IREN",
          null,
          "down"
        ]
      ],
      "body": "Nvidia's new $2,000-plus annual GPU software fee raises neocloud costs, while uncollateralized data-center risk transfers threaten credit. Musk warns of stranded compute and poor deployment profits. Europe plans SRT rules as insurers may fail to cover bond losses; a Dutch pension agreed to cover up to $5.6 billion of ING's project-finance losses. JPMorgan and Morgan Stanley hope to transfer risk on Oracle",
      "truncated": true,
      "signals": [
        {
          "id": "roger-1",
          "name": "Silicon Data",
          "role": "Compute-Market Data & Analytics",
          "avatar": "src-silicon-data.jpg",
          "age": "4h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "Silicon Data's H100 rental index slipped to $1.90 per hour as neocloud providers compete on price for spare capacity. ... Nvidia's new software licensing adds about 6% to the all-in cost per GPU-hour, squeezing margins for smaller operators.",
          "read": "H100 rental rates slip to $1.90/hr as neoclouds compete, while Nvidia's new licensing adds about 6% to all-in cost per GPU-hour."
        },
        {
          "id": "roger-2",
          "name": "Fireside Alpha",
          "role": "Business, Technology and Investing Interview Digest",
          "avatar": "src-fireside-alpha.jpg",
          "age": "6h ago",
          "stance": "mixed",
          "host": "x.com",
          "quote": "Nebius's CFO said Nvidia's new software fee is 'immaterial at current scale' for the company's GPU fleet. ... The CFO confirmed the cost will be passed through to customers in pricing rather than absorbed in margins.",
          "read": "Nebius CFO calls the Nvidia software fee 'immaterial at current scale' but confirms it will be passed through to customers."
        }
      ]
    },
    {
      "id": "rould",
      "author": "Dr J Rould",
      "avatar": "avatar-dr-j-rould.jpg",
      "age": "8h ago",
      "tickers": [
        [
          "AAPL",
          "ticker-aapl.png",
          "up"
        ]
      ],
      "body": "Apple has the most predictable cash flows, including future cash flows, and that dependability appears to be what investors reward. Its P/E is about 40 versus 27 for Nvidia, 22 for Meta and 16 for Alphabet; Meta's free cash flow has turned negative. Leveraged build-out companies have been hit hardest while Apple has outperformed, but Apple investors could be wrong and the point at which its premium becomes too high remains open.",
      "cites": "[1] [2] [3]",
      "chart": "chart-aapl.jpg",
      "signals": [
        {
          "id": "rould-1",
          "name": "The Transcript",
          "role": "Weekly earnings-call quotes",
          "avatar": "src-the-transcript.png",
          "age": "5h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "Apple's CFO says September-quarter services revenue hit an all-time record of $28B, up 14% from a year ago, with records across advertising, App Store and cloud. ... Apple bought back $25B of stock in the quarter and reiterated its goal of reaching net cash neutral over time.",
          "read": "Apple Q4: services revenue hit a record $28B, up 14% YoY, and buybacks continued at $25B for the quarter."
        },
        {
          "id": "rould-2",
          "name": "Jukan",
          "role": "Semiconductor & AI Infrastructure Research at Citrini",
          "avatar": "src-jukan.jpg",
          "age": "1d ago",
          "stance": "refutes",
          "host": "x.com",
          "quote": "Channel checks across Apple's Asian suppliers show iPhone 17 sell-through in China tracking below last year's cycle, with platform discounts arriving earlier than usual. ... Two brokers have cut FY26 iPhone unit estimates by about 3% on weaker Chinese demand.",
          "read": "Channel checks point to softer iPhone 17 demand in China; two brokers cut FY26 unit estimates by about 3%."
        }
      ]
    },
    {
      "id": "t33121",
      "author": "harryz",
      "avatar": "avatar-harryz.png",
      "age": "1d ago",
      "tickers": [],
      "body": "The AI trade, especially semiconductors, may face near-term multiple compression despite strong backlogs, revenue, guidance, and uncut CapEx, until downstream AI revenue validates investment returns. Cybersecurity concerns could delay or restrict frontier-model releases, slowing adoption and monetization while upstream spending continues. Relief could come from successful fundraising by frontier labs; better macro liquidity, lower long-term yields and rate-hike expectations; or safe, scaled model deployment driving renewed downstream revenue growth and validating compute returns.",
      "signals": [
        {
          "id": "t33121-s1",
          "name": "First Squawk",
          "role": "Financial Audio News Service",
          "avatar": "src-first-squawk.jpg",
          "age": "1h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "Federal Reserve to Stick With Quarterly Rate Increases After Removing 2025 Insurance Cuts-FT",
          "read": "The FT reports an expected path of quarterly Fed rate increases, reducing the prospect that easing rate expectations will relieve pressure on AI and semiconductor valuations."
        },
        {
          "id": "t33121-s89",
          "name": "Nik Storonsky",
          "role": "Revolut co-founder and CEO",
          "avatar": "src-nik-storonsky.jpg",
          "age": "23h ago",
          "stance": "refutes",
          "host": "traffic.megaphone.fm",
          "quote": "We automated customer support. 90% of all customer support team is automated now. ... We increased the speed of engineers by 30%. Translation, cross selling as well done by LLMs now.",
          "read": "Revolut's CEO says AI automates 90% of its customer support and has increased engineer speed by 30%, concrete operating returns from scaled deployment outside the AI suppliers."
        }
      ]
    },
    {
      "id": "t17552",
      "author": "Herman Jin",
      "avatar": "avatar-herman-jin.jpg",
      "age": "2d ago",
      "tickers": [],
      "body": "Cloud providers are set for a reverse \"scary story\" that crushes the shorts, with Microsoft the top pick among the big three. The catalyst is each earning about $20B from AI by year-end as actual profit, not ARR, independent of Anthropic and OpenAI. This follows the early-June call that Anthropic's ARR would deliver a frighteningly strong story.",
      "cites": "[1] [2] [3]",
      "signals": [
        {
          "id": "t17552-s77",
          "name": "Fireside Alpha",
          "role": "Business, Technology and Investing Interview Digest",
          "avatar": "src-fireside-alpha.jpg",
          "age": "17h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "\"And this year, starting early this year, the whole curve shift up and became contango. If you see the red line, right?\" ... \"So, you can see a market consensus view is the price could go up in the future, next 36 months.”",
          "read": "Silicon Data's GPU contract curve now implies rising rental prices over the next 36 months, strengthening the pricing outlook for cloud providers' AI capacity."
        },
        {
          "id": "t17552-s92",
          "name": "Hedgie",
          "role": "Financial Markets Newsletter and Commentary",
          "avatar": "src-hedgie.jpg",
          "age": "1d ago",
          "stance": "refutes",
          "host": "x.com",
          "quote": "A VentureBeat survey of companies running AI found 79% say their GPUs are busy half the time or less. Most of those companies still plan to add or switch AI platforms within a year, and in September, 91% of the companies planning new spending had no return-on-investment figure reviewed by their finance team.",
          "read": "VentureBeat's survey finds low GPU utilization and little finance-reviewed ROI among companies planning AI spending, weakening the case that enterprise demand will sustain cloud AI profits independently of the major labs."
        }
      ]
    },
    {
      "id": "t33041",
      "author": "harryz",
      "avatar": "avatar-harryz.png",
      "age": "2d ago",
      "tickers": [],
      "body": "HBM isn't a commodity",
      "signals": [
        {
          "id": "t33041-s32",
          "name": "Jukan",
          "role": "Semiconductor & AI Infrastructure Research at Citrini",
          "avatar": "src-jukan.jpg",
          "age": "7h ago",
          "stance": "refutes",
          "host": "x.com",
          "quote": "NVIDIA has officially lowered the HBM4 pin speed. 11.7-> 9.3Gbps",
          "read": "NVIDIA has officially lowered HBM4 pin speed from 11.7 to 9.3 Gbps, reducing the performance specification for the next HBM generation and weakening the case that escalating HBM performance alone will sustain premium economics."
        },
        {
          "id": "t33041-s8",
          "name": "Reuters",
          "role": "Global News Agency",
          "avatar": "src-reuters.jpg",
          "age": "5h ago",
          "stance": "supports",
          "host": "tradingview.com",
          "quote": "When asked about the media report by the stock exchange operator, SK Hynix said that it is \"reviewing various shareholder return measures\" and plans to announce them alongside third-quarter earnings on Wednesday.",
          "read": "SK Hynix's plan to announce shareholder-return measures alongside earnings could improve the case for a higher valuation of its Korean shares as AI-memory profits accumulate."
        }
      ]
    },
    {
      "id": "t33244",
      "author": "Algostonk",
      "avatar": "avatar-algostonk.jpg",
      "age": "7h ago",
      "tickers": [],
      "body": "An Anthropic IPO could mark the top of this cycle. I strongly doubt the company will deliver anything surprising enough to exceed investor expectations. With macroeconomic and geopolitical tensions continuing, the IPO could be the final straw.",
      "signals": [
        {
          "id": "t33244-s28",
          "name": "Reuters",
          "role": "Global News Agency",
          "avatar": "src-reuters.jpg",
          "age": "6h ago",
          "stance": "supports",
          "host": "tradingview.com",
          "quote": "\"The main message from global central banks grappling with this year's macroeconomic surprises is that a relatively shallow rate hike cycle is underway,\" said Bruce Kasman, global head of economics at JPMorgan.\"",
          "read": "JPMorgan's expectation of a rate-hike cycle adds a concrete financing headwind that could make a richly valued Anthropic IPO more vulnerable."
        },
        {
          "id": "t33244-s39",
          "name": "Fireside Alpha",
          "role": "Business, Technology and Investing Interview Digest",
          "avatar": "src-fireside-alpha.jpg",
          "age": "19h ago",
          "stance": "refutes",
          "host": "x.com",
          "quote": "\"And Anthropic is starting their chip program, and they want to do it in half the time that OpenAI did. So they want to get a chip. I mean, these are aggressive goals, but if models are able to help them, you know, really accelerate this process.",
          "read": "Anthropic's reported chip program targets a faster path to proprietary compute, potentially improving costs and challenging the expectation that it cannot exceed investor expectations."
        }
      ]
    },
    {
      "id": "t33123",
      "author": "harryz",
      "avatar": "avatar-harryz.png",
      "age": "3d ago",
      "tickers": [],
      "body": "BTC looks shaky here given overall risk off sentiment across market & gold underperformance even when rates and dollar down",
      "signals": [
        {
          "id": "t33123-s7",
          "name": "Reuters",
          "role": "Global News Agency",
          "avatar": "src-reuters.jpg",
          "age": "4h ago",
          "stance": "supports",
          "host": "tradingview.com",
          "quote": "The metal has slid below the $4,000 psychological level. ... From a longer-term perspective, the downtrend from $5,587 may have resumed.",
          "read": "Reuters technical analysis sees gold's break below $4,000 as opening support near $3,967 and potentially extending its longer-term downtrend, deepening the precious-metal weakness in the thesis."
        },
        {
          "id": "t33123-s4",
          "name": "Bloomberg",
          "role": "Business and Financial Information and News Platform",
          "avatar": "src-bloomberg.jpg",
          "age": "1h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "Bitcoin retreated below $80,000 as broader risk-off sentiment ahead of a Federal Reserve meeting and concerns over the AI trade weighed on cryptocurrencies",
          "read": "BTC's break below $80K reverses the level CoinShares cited as resilience last week, strengthening the case that broader risk aversion is eroding price support."
        }
      ]
    },
    {
      "id": "t33049",
      "author": "harryz",
      "avatar": "avatar-harryz.png",
      "age": "4d ago",
      "tickers": [],
      "body": "Nebius can deploy reliable compute on the plan they've laid out — the team is strong.",
      "signals": [
        {
          "id": "t33049-s88",
          "name": "Dylan Patel",
          "role": "Founder & Chief Analyst of SemiAnalysis, AI Infrastructure Research",
          "avatar": "src-dylan-patel.jpg",
          "age": "21h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "There's 117.5GW of BTM power orders and being delivered and installed in the next few years.",
          "read": "Patel reports 117.5 GW of behind-the-meter power orders at various stages of delivery and installation, suggesting a substantial path to energizing data centers outside grid queues."
        },
        {
          "id": "t33049-s59",
          "name": "Chamath Palihapitiya",
          "role": "Founder & CEO of Social Capital, Co-Founder & CEO of 8090",
          "avatar": "src-chamath-palihapitiya.jpg",
          "age": "14h ago",
          "stance": "refutes",
          "host": "x.com",
          "quote": "Power pipeline is clogged everywhere. Utilities are completely overwhelmed and will ratchet their pipelining process to flush out the squatters. This will mean higher capital commitments earlier in the process for those that are real.",
          "read": "Chamath expects utilities to demand more capital earlier to secure power-connection slots, adding financing and timing pressure to Nebius's planned sites."
        }
      ]
    },
    {
      "id": "t33042",
      "author": "harryz",
      "avatar": "avatar-harryz.png",
      "age": "5d ago",
      "tickers": [],
      "body": "Meta is still very cheap.",
      "signals": [
        {
          "id": "t33042-s81",
          "name": "Fireside Alpha",
          "role": "Business, Technology and Investing Interview Digest",
          "avatar": "src-fireside-alpha.jpg",
          "age": "17h ago",
          "stance": "supports",
          "host": "x.com",
          "quote": "Silicon Data CEO Carmen Li says the GPU forward curve has flipped to contango, so the market expects compute prices to keep rising over the next 36 months",
          "read": "Silicon Data's observed GPU contract curve now implies higher compute prices over the next 36 months, adding market-based evidence that Meta's installed capacity is valuable."
        },
        {
          "id": "t33042-s76",
          "name": "Elon Musk",
          "role": "CEO of Tesla, Founder & CEO of SpaceX",
          "avatar": "src-elon-musk.jpg",
          "age": "17h ago",
          "stance": "mixed",
          "host": "x.com",
          "quote": "Grok @Bot can now call someone or a business for you, make a request on your behalf, take notes on the response and send you a note summarizing the conversation!",
          "read": "Grok Bot can now place calls and make requests on a user's behalf, validating demand for an action-taking assistant while narrowing Meta's differentiation in that lane."
        }
      ]
    }
  ]
};
