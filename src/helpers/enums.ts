export enum InputType {
  BET = "Bet",
  RESULT = "Result",
}

export enum ProductType {
  WIN = "W",
  PLACE = "P",
  EXACTA = "E",
}

export enum Errors {
  NO_RESULT = "No Results detected",
  RESULT_PROCESSING_ERROR = "Error while processing result",
  DUPLICATE_RESULT_FOUND = "Duplicate Result Entry Detected",
  INVALID_INPUT = "Invalid Input Detected",
  INVALID_PRODUCT_TYPE = "Invalid Product Type Detected",
  FAILED_HORSE_INSERTION = "Failed to add Horses",
  INVALID_BET = "Invalid Bet Detected",
}