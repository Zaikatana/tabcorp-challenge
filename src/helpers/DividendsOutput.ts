import { BettingHost } from "../models/BettingHost";

export class DividendsOutput {
  static printResults = (bettingHost: BettingHost): void => {
    try {
      const results = bettingHost.getResult();
      if (!results) {
          throw "No Results detected";
      }
      const first = results.getFirst().getHorseNo();
      const second = results.getSecond().getHorseNo();
      const third = results.getThird().getHorseNo();
      const resultsArr = [first, second, third];

      const winDividend = bettingHost
        .getWinProduct()
        .calculateDividend(results);
      const placeDividend = bettingHost
        .getPlaceProduct()
        .calculateDividend(results);
      const exactaDividend = bettingHost
        .getExactaProduct()
        .calculateDividend(results);

      // Print Win Dividends
      console.log(`Win:${resultsArr[0]}:$${winDividend[0]}`);
      // Print Place Dividends
      for (let i = 0; i < resultsArr.length; i++) {
        console.log(`Place:${resultsArr[i]}:$${placeDividend[i]}`);
      }
      // Print Exacta Dividends
      console.log(`Exacta:${resultsArr[0]},${resultsArr[1]}:$${exactaDividend[0]}`)
    } catch (error) {
        console.error(error);
    }
  };
}
