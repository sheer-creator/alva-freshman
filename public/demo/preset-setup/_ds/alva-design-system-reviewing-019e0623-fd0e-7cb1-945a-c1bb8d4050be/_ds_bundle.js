/* @ds-bundle: {"format":3,"namespace":"AlvaDesignSystemReviewing_019e06","components":[{"name":"Avatar","sourcePath":"ui_kits/web-app/components/Avatar/Avatar.jsx"},{"name":"CdnIcon","sourcePath":"ui_kits/web-app/components/CdnIcon/CdnIcon.jsx"},{"name":"ChatInput","sourcePath":"ui_kits/web-app/components/ChatInput/ChatInput.jsx"},{"name":"Hero","sourcePath":"ui_kits/web-app/components/Hero/Hero.jsx"},{"name":"PlaybookCard","sourcePath":"ui_kits/web-app/components/PlaybookCard/PlaybookCard.jsx"},{"name":"Sidebar","sourcePath":"ui_kits/web-app/components/Sidebar/Sidebar.jsx"}],"sourceHashes":{"ui_kits/web-app/components/Avatar/Avatar.jsx":"78f65571f5b6","ui_kits/web-app/components/CdnIcon/CdnIcon.jsx":"23411b52b9a0","ui_kits/web-app/components/ChatInput/ChatInput.jsx":"d744971443a0","ui_kits/web-app/components/Hero/Hero.jsx":"dc1f60abfc3a","ui_kits/web-app/components/PlaybookCard/PlaybookCard.jsx":"9fa89ae3a602","ui_kits/web-app/components/Sidebar/Sidebar.jsx":"68dfff167133","ui_kits/web-app/demo.jsx":"c271a0abb473"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlvaDesignSystemReviewing_019e06 = window.AlvaDesignSystemReviewing_019e06 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/web-app/components/Avatar/Avatar.jsx
try { (() => {
// Avatar — single-letter colored circle. Mirrors Alva Infant shared/Avatar.tsx.
const AVATAR_COLORS = {
  'Alva Intern': '#49A3A6',
  'Harry Zzz': '#FF9800',
  'Leo Leo': '#5F75C9',
  'Sheer YLL YGG': '#40A544',
  'Macro Scope X': '#3D8BD1',
  'Smart Jing': '#DC7AA5',
  'YGGYLL': '#7474D8'
};
function Avatar({
  name = '?',
  size = 22
}) {
  const initial = (name[0] || '?').toUpperCase();
  const color = AVATAR_COLORS[name] || '#838383';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.round(size * 0.45),
      fontWeight: 500,
      flexShrink: 0,
      fontFamily: "'Delight', sans-serif"
    }
  }, initial);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/Avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/components/CdnIcon/CdnIcon.jsx
try { (() => {
// CdnIcon — icon loaded from the Alva static CDN.
// When `color` is set, the SVG is used as a mask so a single black glyph
// can be tinted at runtime (white on the dark sidebar, teal when active, etc).
function CdnIcon({
  name,
  size = 16,
  color,
  className = '',
  style = {}
}) {
  const url = `https://alva-ai-static.b-cdn.net/icons/${name}.svg`;
  if (color) {
    return /*#__PURE__*/React.createElement("span", {
      className: className,
      style: {
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: `url(${url}) no-repeat center / contain`,
        mask: `url(${url}) no-repeat center / contain`,
        flexShrink: 0,
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("img", {
    src: url,
    width: size,
    height: size,
    className: className,
    style: {
      display: 'inline-block',
      flexShrink: 0,
      ...style
    },
    alt: ""
  });
}
Object.assign(__ds_scope, { CdnIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/CdnIcon/CdnIcon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/components/ChatInput/ChatInput.jsx
try { (() => {
// ChatInput — Alva composer with model picker + send button.
// Send turns teal once there is text. Mirrors shared/ChatInput.tsx.

const btnIcon = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  transition: 'opacity 0.12s',
  flexShrink: 0
};
function ChatInput({
  placeholder = 'Build an investing playbook from your ideas',
  shadow = false,
  onSend
}) {
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);
  const hasText = text.trim().length > 0;
  const send = () => {
    if (!hasText) return;
    onSend?.(text.trim());
    setText('');
    if (ref.current) ref.current.textContent = '';
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16,
      background: '#fff',
      border: '0.5px solid rgba(0,0,0,0.2)',
      borderRadius: 12,
      boxShadow: shadow ? '0 6px 20px rgba(0,0,0,0.04)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 44,
      maxHeight: 240,
      overflowY: 'auto'
    }
  }, !hasText && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      fontFamily: "'Delight', sans-serif",
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      color: 'rgba(0,0,0,0.3)'
    }
  }, placeholder), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: e => setText(e.currentTarget.textContent || ''),
    onKeyDown: e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    style: {
      fontFamily: "'Delight', sans-serif",
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      color: 'rgba(0,0,0,0.9)',
      outline: 'none',
      minHeight: 22,
      width: '100%',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: btnIcon
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "at-l",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    style: btnIcon
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "photo-l",
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Delight', sans-serif",
      fontSize: 12,
      lineHeight: '20px',
      letterSpacing: 0.12,
      color: 'rgba(0,0,0,0.5)'
    }
  }, "Sonnet 4.6"), /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "arrow-down-f2",
    size: 12,
    color: "rgba(0,0,0,0.2)"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 6,
      background: hasText ? '#49A3A6' : 'rgba(0,0,0,0.05)',
      border: 'none',
      cursor: hasText ? 'pointer' : 'default',
      transition: 'background-color 0.2s',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "arrow-up-l1",
    size: 14,
    color: hasText ? '#fff' : 'rgba(0,0,0,0.3)'
  }))));
}
Object.assign(__ds_scope, { ChatInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/ChatInput/ChatInput.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/components/Hero/Hero.jsx
try { (() => {
// Hero — display headline + composer over a dot-matrix background.

function Hero({
  onSend,
  headline = 'Turn Ideas into Live Investing Playbooks in Minutes'
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      width: '100%',
      height: 532,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      padding: '0 28px',
      position: 'relative',
      overflow: 'hidden',
      background: '#fafafa',
      backgroundImage: 'radial-gradient(circle, #d1e0e0 0.8px, transparent 0.8px)',
      backgroundSize: '14px 14px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 45,
      lineHeight: 1.2,
      fontWeight: 400,
      color: 'rgba(0,0,0,0.9)',
      textAlign: 'center',
      maxWidth: 616,
      letterSpacing: 0.45,
      margin: 0,
      position: 'relative',
      zIndex: 1,
      fontFamily: "'Delight', sans-serif"
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 780,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ChatInput, {
    shadow: true,
    onSend: onSend
  })));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/Hero/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/components/PlaybookCard/PlaybookCard.jsx
try { (() => {
// PlaybookCard — community playbook card: cover, title, desc, author, stats.
// Mirrors Alva Infant shared/PlaybookCard.tsx.

function PlaybookCard({
  title,
  desc,
  author,
  stars,
  remixes,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      border: '0.5px solid rgba(0,0,0,0.3)',
      borderRadius: 12,
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: hover ? '0 10px 20px rgba(0,0,0,0.08)' : '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '4px 4px 0 4px',
      width: 'calc(100% - 8px)',
      aspectRatio: '472 / 265.5',
      borderRadius: 8,
      background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px), linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
      backgroundSize: '3px 3px, 100% 100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '16px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: '26px',
      letterSpacing: 0.16,
      fontWeight: 400,
      color: 'rgba(0,0,0,0.9)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      lineHeight: '20px',
      letterSpacing: 0.12,
      color: 'rgba(0,0,0,0.5)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      margin: 0
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 22
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: author,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      color: 'rgba(0,0,0,0.9)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, author)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
      color: 'rgba(0,0,0,0.9)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "show-l",
    size: 16
  }), stars), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "remix-l",
    size: 16
  }), remixes)))));
}
Object.assign(__ds_scope, { PlaybookCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/PlaybookCard/PlaybookCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/components/Sidebar/Sidebar.jsx
try { (() => {
// Sidebar — Alva primary navigation. Dark navy with dot-matrix overlay.
// Mirrors Alva Infant shell/Sidebar.tsx (default mode, no Threads rail).

const SIDEBAR_DOT = {
  background: '#2A2A38',
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)',
  backgroundSize: '3px 3px'
};
const NAV = [{
  label: 'Home',
  page: 'home'
}, {
  label: 'Explore',
  page: 'explore'
}, {
  label: 'Portfolio',
  page: 'portfolio'
}, {
  label: 'Agent',
  page: 'agent'
}, {
  label: 'Alva Skill',
  page: 'skill'
}];
const STARRED = ['Template-Screener', 'Template-Thesis', 'Template-Whatif', 'Template-Notification'];
const MY_PLAYBOOKS = ['Feed Test', 'Trade Notification Test'];
function NavRow({
  children,
  active,
  onClick,
  muted
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      height: 36,
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
      cursor: onClick ? 'pointer' : 'default',
      borderRadius: 4,
      fontFamily: "'Delight', sans-serif",
      fontSize: muted ? 12 : 13,
      letterSpacing: muted ? 0.12 : 0.13,
      color: muted ? 'rgba(255,255,255,0.5)' : '#fff',
      background: active ? 'rgba(255,255,255,0.05)' : hover && onClick ? 'rgba(255,255,255,0.05)' : 'transparent',
      transition: 'background-color 0.12s',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, children);
}
function Sidebar({
  activePage = 'home',
  onNavigate = () => {},
  onNewThread = () => {}
}) {
  const [userHover, setUserHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 228,
      height: '100vh',
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
      ...SIDEBAR_DOT
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 48,
      padding: '16px 8px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://alva-ai-static.b-cdn.net/icons/logo-alva-horizontal-green-white.svg",
    alt: "Alva",
    style: {
      height: 14,
      width: 'auto',
      maxWidth: 160,
      objectFit: 'contain',
      objectPosition: 'left'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      borderRadius: 6,
      opacity: 0.9,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://alva-ai-static.b-cdn.net/icons/sidebar-onoff.svg",
    alt: "",
    width: 16,
    height: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onNewThread,
    style: {
      height: 32,
      background: '#49A3A6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    },
    onMouseEnter: e => e.currentTarget.style.opacity = '0.9',
    onMouseLeave: e => e.currentTarget.style.opacity = '1'
  }, /*#__PURE__*/React.createElement(__ds_scope.CdnIcon, {
    name: "sidebar-new-normal",
    size: 16,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Delight', sans-serif",
      fontSize: 12,
      lineHeight: '20px',
      letterSpacing: 0.12,
      color: '#fff'
    }
  }, "New Thread"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0'
    }
  }, NAV.map(item => /*#__PURE__*/React.createElement(NavRow, {
    key: item.label,
    active: item.page === activePage,
    onClick: () => onNavigate(item.page)
  }, item.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0'
    }
  }, /*#__PURE__*/React.createElement(NavRow, {
    muted: true
  }, "Starred"), STARRED.map(label => /*#__PURE__*/React.createElement(NavRow, {
    key: label,
    onClick: () => onNavigate('explore')
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0'
    }
  }, /*#__PURE__*/React.createElement(NavRow, {
    muted: true
  }, "My Playbooks"), MY_PLAYBOOKS.map(label => /*#__PURE__*/React.createElement(NavRow, {
    key: label,
    onClick: () => onNavigate('explore')
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setUserHover(true),
    onMouseLeave: () => setUserHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: 8,
      borderRadius: 4,
      flexShrink: 0,
      cursor: 'pointer',
      background: userHover ? 'rgba(255,255,255,0.05)' : 'transparent',
      transition: 'background-color 0.12s'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: "YGGYLL",
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Delight', sans-serif",
      fontSize: 13,
      letterSpacing: 0.13,
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "YGGYLL")));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/components/Sidebar/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/demo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// demo.jsx — interactive Home prototype. Consumes the compiled design-system
// bundle (window.<Namespace>) rather than defining components itself.

const NS = function () {
  var k = Object.keys(window).filter(function (n) {
    return /^AlvaDesignSystem/.test(n);
  })[0];
  return k && window[k] || {};
}();
const {
  Sidebar,
  Hero,
  PlaybookCard,
  ChatInput,
  Avatar,
  CdnIcon
} = NS;
const PLAYBOOKS = [{
  id: 'btc-ultimate',
  title: 'BTC Ultimate AI Trader',
  author: 'Alva Intern',
  desc: 'Dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core BTC price movements.',
  stars: 142,
  remixes: 23
}, {
  id: 'mag7',
  title: 'MAG7 Equal-Weight Monthly Rebalance',
  author: 'Harry Zzz',
  desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly to capture sector rotation alpha.',
  stars: 89,
  remixes: 14
}, {
  id: 'nvda-tsm',
  title: 'NVDA +3% Triggered TSM TP/SL',
  author: 'Smart Jing',
  desc: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
  stars: 48,
  remixes: 7
}, {
  id: 'attribution',
  title: 'Attribution Analysis',
  author: 'Sheer YLL YGG',
  desc: 'Monitor selected tokens to detect abnormal changes in Open Interest and trading volume, generating real-time alerts for unusual market activity.',
  stars: 72,
  remixes: 11
}, {
  id: 'btc-macd',
  title: 'BTC MACD 1h Simple Crossover',
  author: 'Macro Scope X',
  desc: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
  stars: 34,
  remixes: 5
}, {
  id: 'qqq-nvda',
  title: 'QQQ +2% Day Triggers NVDA Take-Profit',
  author: 'Leo Leo',
  desc: 'When QQQ closes up 2% on the day, scales out of NVDA exposure to lock in gains; re-enters on a -1% pullback close.',
  stars: 28,
  remixes: 4
}];
const TAGS = ['EV Supply Chain Intelligence', 'Unusual Volume Scanner', 'Earnings Whisper Board', 'Thesis Debate Room', 'Macro Regime Adaptive Trading'];
function ConnectModal({
  open,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 420,
      background: '#fff',
      borderRadius: 12,
      padding: 28,
      boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
      fontFamily: "'Delight', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      lineHeight: '30px',
      letterSpacing: 0.20,
      color: 'rgba(0,0,0,0.9)',
      marginBottom: 8
    }
  }, "Connect Telegram"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      color: 'rgba(0,0,0,0.5)',
      marginBottom: 24
    }
  }, "Link your Telegram account to chat with Alva Agent and receive playbook notifications."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      height: 40,
      padding: '9px 20px',
      borderRadius: 8,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      fontWeight: 500,
      background: '#fff',
      color: 'rgba(0,0,0,0.9)',
      border: '0.5px solid rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontFamily: "'Delight', sans-serif"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      height: 40,
      padding: '9px 20px',
      borderRadius: 8,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      fontWeight: 500,
      background: '#49A3A6',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: "'Delight', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-telegram.svg",
    width: "16",
    height: "16",
    alt: ""
  }), " Connect Telegram"))));
}
function Thread({
  initialMessage,
  onBack
}) {
  const [messages, setMessages] = React.useState([{
    from: 'user',
    text: initialMessage
  }, {
    from: 'agent',
    text: 'Researching. I\'ll draft a playbook with screener, thesis, and notification rules — back in a moment.'
  }]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '0.5px solid rgba(0,0,0,0.07)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: onBack,
    style: {
      cursor: 'pointer',
      fontSize: 14,
      color: 'rgba(0,0,0,0.5)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, "← Home"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, "New Thread")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 760,
      width: '100%',
      margin: '0 auto'
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, m.from === 'user' ? /*#__PURE__*/React.createElement(Avatar, {
    name: "YGGYLL",
    size: 28
  }) : /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-portrait.svg",
    width: "28",
    height: "28",
    style: {
      borderRadius: '50%',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(0,0,0,0.5)',
      letterSpacing: 0.12,
      marginBottom: 4,
      fontFamily: "'Delight', sans-serif"
    }
  }, m.from === 'user' ? 'YGGYLL' : 'Alva Agent'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, m.text))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 28px 24px',
      maxWidth: 760,
      width: '100%',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(ChatInput, {
    shadow: true,
    onSend: t => setMessages([...messages, {
      from: 'user',
      text: t
    }, {
      from: 'agent',
      text: 'Got it.'
    }])
  })));
}
function App() {
  const [page, setPage] = React.useState('home');
  const [thread, setThread] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeTag, setActiveTag] = React.useState('EV Supply Chain Intelligence');
  const startThread = text => {
    setThread(text);
    setPage('thread');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    activePage: page,
    onNavigate: p => {
      setPage(p);
      setThread(null);
    },
    onNewThread: () => startThread('New thread')
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      height: '100vh'
    }
  }, page === 'thread' && thread ? /*#__PURE__*/React.createElement(Thread, {
    initialMessage: thread,
    onBack: () => {
      setPage('home');
      setThread(null);
    }
  }) : page === 'home' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onSend: startThread
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 50px',
      borderTop: '0.5px solid rgba(0,0,0,0.15)',
      borderBottom: '0.5px solid rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1600,
      margin: '0 auto',
      padding: '28px 24px',
      borderLeft: '0.5px solid rgba(0,0,0,0.15)',
      borderRight: '0.5px solid rgba(0,0,0,0.15)',
      display: 'flex',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      lineHeight: '34px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.24,
      margin: 0,
      fontFamily: "'Delight', sans-serif"
    }
  }, "What You Can Build"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, TAGS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setActiveTag(t),
    style: {
      padding: '8px 16px',
      borderRadius: 6,
      border: '0.5px solid rgba(0,0,0,0.3)',
      background: t === activeTag ? '#e5eeee' : '#fff',
      fontFamily: "'Delight', sans-serif",
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      fontWeight: 400,
      color: 'rgba(0,0,0,0.9)',
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    }
  }, t)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 0',
      fontSize: 14,
      lineHeight: '22px',
      color: 'rgba(0,0,0,0.5)',
      cursor: 'pointer',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, "Explore More")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalOpen(true),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 16px',
      borderRadius: 8,
      background: '#49A3A6',
      border: 'none',
      cursor: 'pointer',
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement(CdnIcon, {
    name: "remix-l",
    size: 18,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Delight', sans-serif",
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: 0.14,
      fontWeight: 500,
      color: '#fff'
    }
  }, "Connect Telegram"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 12,
      overflow: 'hidden',
      border: '0.5px solid rgba(0,0,0,0.3)',
      background: '#fff',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      position: 'relative',
      aspectRatio: '1 / 1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 8,
      bottom: 160,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px), linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
      backgroundSize: '3px 3px, 100% 100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '56px 16px 16px',
      background: 'linear-gradient(180deg, transparent 0%, white 60%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      paddingTop: 16,
      borderTop: '1px solid rgba(0,0,0,0.07)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Alva Intern",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, "alva")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 14,
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, /*#__PURE__*/React.createElement(CdnIcon, {
    name: "show-l",
    size: 16
  }), "12.8K"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 14,
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, /*#__PURE__*/React.createElement(CdnIcon, {
    name: "remix-l",
    size: 16
  }), "3"))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 50px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1600,
      margin: '0 auto',
      padding: '28px 24px',
      borderLeft: '0.5px solid rgba(0,0,0,0.15)',
      borderRight: '0.5px solid rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      lineHeight: '34px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.9)',
      flex: 1,
      letterSpacing: 0.24,
      margin: 0,
      fontFamily: "'Delight', sans-serif"
    }
  }, "Featured Playbooks"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'rgba(0,0,0,0.5)',
      cursor: 'pointer',
      letterSpacing: 0.14,
      fontFamily: "'Delight', sans-serif"
    }
  }, "View All")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, PLAYBOOKS.map(p => /*#__PURE__*/React.createElement(PlaybookCard, _extends({
    key: p.id
  }, p, {
    onClick: () => startThread(`Tell me more about "${p.title}"`)
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      fontFamily: "'Delight', sans-serif",
      color: 'rgba(0,0,0,0.5)',
      fontSize: 14,
      letterSpacing: 0.14
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 24,
      lineHeight: '34px',
      color: 'rgba(0,0,0,0.9)',
      letterSpacing: 0.24,
      fontWeight: 400,
      margin: '0 0 8px'
    }
  }, page.charAt(0).toUpperCase() + page.slice(1)), "This surface isn't part of the demo — see the codebase for the real implementation.")), /*#__PURE__*/React.createElement(ConnectModal, {
    open: modalOpen,
    onClose: () => setModalOpen(false)
  }));
}
const rootEl = document.getElementById('root');
if (Sidebar && Hero && PlaybookCard) {
  ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(App, null));
} else {
  rootEl.textContent = 'Design-system bundle not loaded yet.';
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/demo.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.CdnIcon = __ds_scope.CdnIcon;

__ds_ns.ChatInput = __ds_scope.ChatInput;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.PlaybookCard = __ds_scope.PlaybookCard;

__ds_ns.Sidebar = __ds_scope.Sidebar;

})();
