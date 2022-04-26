import { Errors, ProductType } from "../helpers/enums";
import Bet from "./Bet";
import Horse from "./Horse";
import { Exacta, Place, Win } from "./Product";
import Result from "./Result";

export class BettingHost {
  bets: Bet[];
  horses: Horse[];
  result: Result | null;
  win: Win;
  place: Place;
  exacta: Exacta;

  constructor() {
    this.bets = [];
    this.horses = [];
    this.result = null;
    this.win = new Win();
    this.place = new Place();
    this.exacta = new Exacta();
  }

  addBet = (bet: Bet): void => {
    try {
      this.bets.push(bet);
      if (bet.getProductType() === ProductType.WIN) {
        this.win.addToBet(bet);
      } else if (bet.getProductType() === ProductType.PLACE) {
        this.place.addToBet(bet);
      } else if (bet.getProductType() === ProductType.EXACTA) {
        this.exacta.addToBet(bet);
      } else {
        throw Errors.INVALID_PRODUCT_TYPE;
      }
    } catch (error) {
      console.error(error);
    }
  };

  addHorse = (selection: number): void => {
    try {
      const horse = new Horse(selection);
      this.horses.push(horse);
    } catch (error) {
      console.error(error);
    }
  };
  getHorse = (selection: number): Horse | null => {
    for (let i = 0; i < this.horses.length; i++) {
      if (this.horses[i].getHorseNo() === selection) {
        return this.horses[i];
      }
    }
    return null;
  };

  setResult = (result: Result): void => {
    this.result = result;
  };
  getResult = (): Result | null => {
    return this.result;
  };

  getWinProduct = (): Win => {
    return this.win;
  };

  getPlaceProduct = (): Place => {
    return this.place;
  };

  getExactaProduct = (): Exacta => {
    return this.exacta;
  };
}
