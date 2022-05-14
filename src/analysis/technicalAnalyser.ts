import ccxt, { OHLCV } from "ccxt";
import { EMA, RSI, Stochastic } from "technicalindicators";

let ohlc: OHLCV[] = [];

async function getOHLC() {
  if (ohlc.length > 0) {
    return ohlc;
  }

  const client = new ccxt.bitmex();
  const date = new Date();
  date.setDate(date.getDate() - 3);

  // [ timestamp, open, high, low, close, volume ]
  ohlc = await client.fetchOHLCV("BTC/USD:BTC", "1h", date.getTime(), 168); // 168 candles // 7 days * 24h
  // console.log(ohlc);
  // console.log(ohlc.length);

  return ohlc;
}

export async function GetEMA(): Promise<number> {
  await getOHLC();

  const emaPeriod = 21;
  const values = ohlc.map(i => i[4]); // close values
  const ema = EMA.calculate({ period: emaPeriod, values });
  const last = ema[ema.length - 1];

  // console.log(ema);
  console.log("Current EMA", last);

  return last;
}

export async function GetRSI(): Promise<number> {
  await getOHLC();

  const input = {
    values: ohlc.map(i => i[4]),
    period: 14
  };

  const rsi = RSI.calculate(input);
  const last = rsi[rsi.length - 1];

  // console.log(rsi);
  console.log("Current RSI", last);

  return last;
}

export async function GetSRSI(): Promise<number> {
  await getOHLC();

  const high = ohlc.map(i => i[2]);
  const low = ohlc.map(i => i[3]);
  const close = ohlc.map(i => i[4]);
  const srsiPeriod = 14;
  const signalPeriod = 3;
  const input = {
    period: srsiPeriod,
    high: high,
    low: low,
    close: close,
    signalPeriod: signalPeriod
  };

  const srsi = Stochastic.calculate(input);
  const last = srsi[srsi.length - 1];
  console.log("Current SRSI", last);

  const avgSrsi = srsi.map(i => (i.k + i.d) / 2);
  const avg = avgSrsi[avgSrsi.length - 1];
  console.log("Avg SRSI", avg);

  return avg;
}
