export interface StockBasic{ts_code:string;symbol:string;name:string;exchange:string;industry?:string;sector?:string}
export interface StockSummary{price:number;pct_chg:number;total_mv:number;pe_ttm:number;pb:number;dividend_yield:number;latest_report_period:string}
export interface TimeSeriesPoint{date:string;[key:string]:string|number|null|undefined}

