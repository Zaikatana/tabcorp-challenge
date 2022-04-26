import { Errors, ProductType } from "../helpers/enums";
import Bet from "./Bet";
import Result from "./Result";

abstract class Product {
  abstract productType: ProductType;
  abstract commission: number;
  abstract pool: number;
  abstract bets: Bet[];
  abstract calculateDividend(result: Result): number[];

  addToBet = (bet: Bet): void => {
    this.bets.push(bet);
    this.pool += bet.getStake();
  };

  getProductType = (): ProductType => {
    return this.productType;
  };

  getComission = (): number => {
    return this.commission;
  };

  getPool = (): number => {
    return this.pool;
  };

  getBets = (): Bet[] => {
    return this.bets;
  };
}

export class Win extends Product {
  productType = ProductType.WIN;
  commission: number;
  pool: number;
  bets: Bet[];

  constructor() {
    super();
    this.bets = [];
    this.pool = 0;
    this.commission = 0.15;
  }

  calculateDividend = (result: Result): number[] => {
    const dividendRes: number[] = [];
    try {
      // Take Commission
      const remaining = this.pool * (1 - this.commission);
      // Compile stakes of bets that bet on the winning horse
      let stakes = 0;
      const winningHorse = result.getFirst().getHorseNo();
      this.bets.forEach((bet) => {
        const horseNo = bet.getSelection().getHorseNo();
        if (horseNo === winningHorse) {
          stakes += bet.getStake();
        }
      });

      const dividend = Math.round((remaining / stakes) * 100) / 100;
      dividendRes.push(dividend);
    } catch (error) {
      console.error(error);
    }
    return dividendRes;
  };
}

export class Place extends Product {
  productType = ProductType.PLACE;
  commission: number;
  pool: number;
  bets: Bet[];

  constructor() {
    super();
    this.bets = [];
    this.pool = 0;
    this.commission = 0.12;
  }

  calculateDividend = (result: Result): number[] => {
    const dividendRes: number[] = [];
    try {
      // Take Commission, then divide by 3 as pools between each place is even
      const remaining = (this.pool * (1 - this.commission)) / 3;
      // Compile stakes of bets that bet on the top 3 horses
      let stakesFirst = 0;
      let stakesSecond = 0;
      let stakesThird = 0;
      const firstHorse = result.getFirst().getHorseNo();
      const secondHorse = result.getSecond().getHorseNo();
      const thirdHorse = result.getThird().getHorseNo();
      this.bets.forEach((bet) => {
        const horseNo = bet.getSelection().getHorseNo();
        if (horseNo === firstHorse) {
          stakesFirst += bet.getStake();
        } else if (horseNo === secondHorse) {
          stakesSecond += bet.getStake();
        } else if (horseNo === thirdHorse) {
          stakesThird += bet.getStake();
        }
      });

      const dividendFirst = Math.round((remaining / stakesFirst) * 100) / 100;
      const dividendSecond = Math.round((remaining / stakesSecond) * 100) / 100;
      const dividendThird = Math.round((remaining / stakesThird) * 100) / 100;
      dividendRes.push(dividendFirst, dividendSecond, dividendThird);
    } catch (error) {
      console.error(error);
    }
    return dividendRes;
  };
}

export class Exacta extends Product {
  productType = ProductType.EXACTA;
  commission: number;
  pool: number;
  bets: Bet[];

  constructor() {
    super();
    this.bets = [];
    this.pool = 0;
    this.commission = 0.18;
  }

  calculateDividend = (result: Result): number[] => {
    const dividendRes: number[] = [];
    try {
      // Take Commission
      const remaining = this.pool * (1 - this.commission);
      // Compile stakes of bets that bet on the winning and penultimate horses
      let stakes = 0;
      const firstHorse = result.getFirst().getHorseNo();
      const secondHorse = result.getSecond().getHorseNo();
      this.bets.forEach((bet) => {
        const horseFirstNo = bet.getSelection().getHorseNo();
        if (!bet.getSelectionExacta()) {
          throw Errors.INVALID_BET;
        }

        const horseSecondNo = bet.getSelectionExacta()!.getHorseNo();
        if (horseFirstNo === firstHorse && horseSecondNo === secondHorse) {
          stakes += bet.getStake();
        }
      });

      const dividend = Math.round((remaining / stakes) * 100) / 100;
      dividendRes.push(dividend);
    } catch (error) {
      console.error(error);
    }
    return dividendRes;
  };
}
