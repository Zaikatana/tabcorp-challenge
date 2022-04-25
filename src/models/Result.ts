import Horse from "./Horse";

export default class Result {
  first: Horse;
  second: Horse;
  third: Horse;

  constructor(first: Horse, second: Horse, third: Horse) {
    this.first = first;
    this.second = second;
    this.third = third;
  }

  getFirst = (): Horse => {
    return this.first;
  };

  getSecond = (): Horse => {
    return this.second;
  };

  getThird = (): Horse => {
    return this.third;
  };
}
