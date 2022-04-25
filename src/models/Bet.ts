import { ProductType } from "../helpers/enums";
import Horse from "./Horse";

export default class Bet {
  productType: ProductType;
  selection: Horse;
  selectionExacta?: Horse;
  stake: number;

  constructor(
    productType: ProductType,
    selection: Horse,
    stake: number,
    selectionExacta?: Horse
  ) {
    this.productType = productType;
    this.selection = selection;
    this.stake = stake;
    if (selectionExacta) {
      this.selectionExacta = selectionExacta;
    }
  }

  getProductType = (): ProductType => {
    return this.productType;
  };

  getSelection = (): Horse => {
    return this.selection;
  };

  getSelectionExacta = (): Horse | undefined => {
    return this.selectionExacta;
  };

  getStake = (): number => {
    return this.stake;
  };
}
