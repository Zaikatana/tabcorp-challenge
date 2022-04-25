export default class Horse {
  horseNo: number;

  constructor(horseNo: number) {
    this.horseNo = horseNo;
  }

  getHorseNo = (): number => {
    return this.horseNo;
  };
}
