import { createInterface } from "readline";
import Bet from "../models/Bet";
import { BettingHost } from "../models/BettingHost";
import Horse from "../models/Horse";
import Result from "../models/Result";
import { Errors, InputType, ProductType } from "./enums";

export default class InputReader {
  static readStdIn = async (bettingHost: BettingHost): Promise<void> => {
    const horseMap = new Map<number, Horse>();
    try {
      const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      for await (const line of readline) {
        const lineArr = line.split(":");
        if (lineArr.length !== 4) {
          throw Errors.INVALID_INPUT;
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
            let horse = null;
            if (!horseMap.get(selectionInt)) {
              horse = new Horse(selectionInt);
              horseMap.set(selectionInt, horse);
            } else {
              horse = horseMap.get(selectionInt);
            }

            const bet = new Bet(productType, horse!, stake);
            bettingHost.addBet(bet);
          } else if (productType === ProductType.EXACTA) {
            const selectionArr = selection.split(",");
            if (selectionArr.length !== 2) {
              throw Errors.INVALID_INPUT;
            }

            const selectionA = parseInt(selectionArr[0]);
            const selectionB = parseInt(selectionArr[1]);
            let horseA = null;
            let horseB = null;
            if (!horseMap.get(selectionA)) {
              horseA = new Horse(selectionA);
              horseMap.set(selectionA, horseA);
            } else {
              horseA = horseMap.get(selectionA);
            }

            if (!horseMap.get(selectionB)) {
              horseB = new Horse(selectionB);
              horseMap.set(selectionB, horseB);
            } else {
              horseB = horseMap.get(selectionB);
            }

            const bet = new Bet(productType, horseA!, stake, horseB!);
            bettingHost.addBet(bet);
          } else {
            throw Errors.INVALID_PRODUCT_TYPE;
          }
        } else if (inputType === InputType.RESULT) {
          // check if result already exists
          if (bettingHost.getResult()) {
            throw Errors.DUPLICATE_RESULT_FOUND;
          }

          const first = horseMap.get(parseInt(lineArr[1]));
          const second = horseMap.get(parseInt(lineArr[2]));
          const third = horseMap.get(parseInt(lineArr[3]));
          if (!first || !second || !third) {
            throw Errors.RESULT_PROCESSING_ERROR;
          }

          const result = new Result(first!, second!, third!);
          bettingHost.setResult(result);
        } else {
          throw Errors.INVALID_INPUT;
        }

        if (horseMap.size === 0) {
          throw Errors.FAILED_HORSE_INSERTION;
        } else {
          Array.from(horseMap.keys()).forEach((horse) => {
            bettingHost.addHorse(horse);
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
}
