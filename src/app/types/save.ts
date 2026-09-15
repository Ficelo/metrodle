import { MetroGuessResult } from "./metro/metro-guess";

export interface MetroSave {
    found : boolean,
    date: string,
    guesses: MetroGuessResult[]
}