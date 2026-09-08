// Curated research destinations, verified against company IR pages on 2026-09-07.
// Peer groupings are editorial comparison lenses, not valuation equivalents.
export const RESEARCH_TABS = [['views','Theses'], ['earnings','Earnings'], ['peers','Peers'], ['smart','Smart Money']];
export const INVESTOR_AUTHORS = ['gary', 'tasha', 'ophir', 'rihard'];
export const RESEARCH = {
  NVDA: { ir:'https://investor.nvidia.com/home/default.aspx', peers:[['AMD','Accelerators and software adoption'],['MU','Memory supply and pricing']], lens:'AI compute ecosystem' },
  MU: { ir:'https://investors.micron.com/overview/default.aspx', peers:[['NVDA','Memory demand from accelerator systems'],['AMD','HBM demand across GPU platforms']], lens:'AI memory value chain' },
  TSLA: { ir:'https://ir.tesla.com/', peers:[['GM','Vehicle scale and automotive margins'],['F','Vehicle mix and EV profitability'],['RIVN','EV production and gross profit'],['GOOGL','Waymo and autonomous ride-hailing']], lens:'Automotive & autonomy',
    report: { period:'Q2 2026', date:'July 22, 2026', url:'https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm', webcast:'https://ir.tesla.com/webcast-2026-07-22', metrics:[['Revenue','$28.24B'],['GAAP diluted EPS','$0.32'],['Net income¹','$1.11B']], note:'¹ Attributable to common stockholders. Quarter ended June 30, 2026.' },
    disclosures:[['ARK Innovation ETF','Fund holdings & documents','https://www.ark-funds.com/funds/arkk']],
  },
  AAPL: { ir:'https://investor.apple.com/investor-relations/default.aspx', peers:[['GOOGL','Mobile platforms and AI distribution'],['MSFT','Software and recurring services']], lens:'Platforms & services' },
  MSFT: { ir:'https://www.microsoft.com/en-us/investor/default', peers:[['AMZN','Cloud infrastructure and AI demand'],['GOOGL','Cloud growth and AI infrastructure']], lens:'Cloud platforms' },
  AMZN: { ir:'https://ir.aboutamazon.com/overview/default.aspx', peers:[['MSFT','Cloud growth and AI monetization'],['GOOGL','Cloud margins and AI capacity']], lens:'Cloud platforms' },
  GOOGL: { ir:'https://abc.xyz/investor/', peers:[['META','Advertising and AI engagement'],['MSFT','Search, cloud and AI distribution'],['AMZN','Cloud capacity and advertising']], lens:'Ads & cloud' },
  META: { ir:'https://investor.atmeta.com/home/default.aspx', peers:[['GOOGL','Advertising and AI answers'],['AMZN','Advertising and consumer distribution']], lens:'Digital advertising' },
  AMD: { ir:'https://ir.amd.com/', peers:[['NVDA','Accelerator adoption and software moat'],['MU','Memory capacity and system costs']], lens:'AI compute ecosystem' },
};
export const EXTERNAL_PEERS = {
  GM:{name:'General Motors',url:'https://investor.gm.com/'},
  F:{name:'Ford',url:'https://shareholder.ford.com/Home/default.aspx'},
  RIVN:{name:'Rivian',url:'https://rivian.com/investors'},
};

export function tickerViewPosts(state, ticker, thesisId, choices, postsFor) {
  const relevant = choices.filter(thesis => thesis.tickers.includes(ticker) && (!thesisId || thesis.id === thesisId));
  const seen = new Set();
  return relevant.flatMap(thesis => postsFor(state, thesis.id)).sort((a,b) => b.order-a.order).filter(post => {
    const key = post.sourceId || post.id;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
