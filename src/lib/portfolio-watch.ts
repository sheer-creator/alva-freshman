const PORTFOLIO_WATCH_STORAGE_KEY = 'alva-portfolio-watch-enabled';

export function hasPortfolioWatchEnabled(): boolean {
  try {
    return window.localStorage.getItem(PORTFOLIO_WATCH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setPortfolioWatchEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(PORTFOLIO_WATCH_STORAGE_KEY, String(enabled));
  } catch {
    // The in-memory Agent state still completes the flow when storage is unavailable.
  }
}
