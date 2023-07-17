const mapping: Record<string, string> = {
  brokerages: 'brokerage',
  indicators: 'indicator',
  'live-trading-tools': 'live_trading_tool',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
