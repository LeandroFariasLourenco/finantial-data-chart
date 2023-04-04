export interface PetraAssetResponse {
  chart: Chart;
}

interface Chart {
  result: Result[];
  error: null;
}

interface Result {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}

interface Indicators {
  quote: Quote[];
}

interface Quote {
  open: Array<number | null>;
  high: Array<number | null>;
  close: Array<number | null>;
  volume: Array<number | null>;
  low: Array<number | null>;
}

interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  tradingPeriods: Array<Post[]>;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

interface CurrentTradingPeriod {
  pre: Post;
  regular: Post;
  post: Post;
}

interface Post {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}
