import { DividendsOutput } from "./helpers/DividendsOutput";
import { Errors } from "./helpers/enums";
import InputReader from "./helpers/InputReader";
import { BettingHost } from "./models/BettingHost";

const main = async () => {
  try {
    const bh = new BettingHost();
    await InputReader.readStdIn(bh);
    const result = bh.getResult();
    if (!result) {
      throw Errors.NO_RESULT;
    }
    DividendsOutput.printResults(bh);
  } catch (error) {
    console.error(error);
  }
};

main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
  });
