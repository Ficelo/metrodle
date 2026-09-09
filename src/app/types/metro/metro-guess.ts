import { DateResult, DirectionResult, LinesResult, NameLengthResult } from "../guess.enums";
import { StationMetro } from "./metro-station";

export interface MetroGuess {
  station: StationMetro;
  correctStation: StationMetro;
}

export interface MetroGuessResult {
  station: StationMetro;
  name: boolean;
  town: boolean;
  lines: LinesResult;
  length: NameLengthResult;
  date: DateResult;
  direction: DirectionResult;
}
