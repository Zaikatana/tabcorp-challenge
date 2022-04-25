import { createInterface } from "readline";
import Bet from "../models/Bet";
import { BettingHost } from "../models/BettingHost";
import Result from "../models/Result";
import { InputType, ProductType } from "./enums";

export default class InputReader {
  static readStdIn = async (bettingHost: BettingHost): Promise<void> => {
    try {
      const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      for await (const line of readline) {
        const lineArr = line.split(":");
        if (lineArr.length !== 4) {
          throw "Invalid Input Detected";
        }
        const inputType = lineArr[0];
        if (inputType === InputType.BET) {
          const productType = lineArr[1];
          const selection = lineArr[2];
          const stake = parseInt(lineArr[3]);
          if (
            productType === ProductType.WIN ||
            productType === ProductType.PLACE
          ) {
            const selectionInt = parseInt(selection);
            if (!bettingHost.getHorse(selectionInt)) {
              bettingHost.addHorse(selectionInt);
            }
            const horse = bettingHost.getHorse(selectionInt);
            const bet = new Bet(productType, horse!, stake);
            bettingHost.addBet(bet);
          } else if (productType === ProductType.EXACTA) {
            const selectionArr = selection.split(",");
            if (selectionArr.length !== 2) {
              throw "Invalid Input Detected";
            }
            const selectionA = parseInt(selectionArr[0]);
            const selectionB = parseInt(selectionArr[1]);
            if (!bettingHost.getHorse(selectionA)) {
              bettingHost.addHorse(selectionA);
            }
            if (!bettingHost.getHorse(selectionB)) {
              bettingHost.addHorse(selectionB);
            }
            const horseA = bettingHost.getHorse(selectionA);
            const horseB = bettingHost.getHorse(selectionB);
            const bet = new Bet(productType, horseA!, stake, horseB!);
            bettingHost.addBet(bet);
          } else {
            throw "Invalid Product Type Detected";
          }
        } else if (inputType === InputType.RESULT) {
          const first = bettingHost.getHorse(parseInt(lineArr[1]));
          const second = bettingHost.getHorse(parseInt(lineArr[2]));
          const third = bettingHost.getHorse(parseInt(lineArr[3]));
          const result = new Result(first!, second!, third!);
          bettingHost.setResult(result);
        } else {
          throw "Invalid Input Type Detected";
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
}
