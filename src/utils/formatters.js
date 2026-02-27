/**
 * Format a price value with appropriate decimal places
 */
export function formatPrice(price) {
  if (price === null || price === undefined) return "—";
  if (price >= 1000) {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (price >= 1) {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  } else {
    return price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  }
}

/**
 * Format a percentage change value with sign and color class
 */
export function formatPercent(value) {
  if (value === null || value === undefined) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Truncate an Ethereum address for display
 */
export function truncateAddress(address, prefixLen = 6, suffixLen = 4) {
  if (!address) return "";
  return `${address.slice(0, prefixLen)}...${address.slice(-suffixLen)}`;
}

/**
 * Format a large number with B/M suffixes
 */
export function formatLargeNumber(value) {
  if (!value) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

/**
 * Format a tx hash for display (first 10...last 6)
 */
export function truncateTxHash(hash) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`;
}