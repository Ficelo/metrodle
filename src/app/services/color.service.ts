import { Service, signal } from '@angular/core';

@Service()
export class ColorService {

    readonly currentMetroLine = signal("");

    private metroLines = ["1", "2", "3", "3b", "4", "5", "6", "7", "7b", "8", "9", "10", "11", "12", "13", "14"];

    constructor() {
        this.currentMetroLine.set(this.getRandomLineFromList(this.metroLines));
    }

    getRandomLineFromList(list: string[]) : string {
        if(list) {
            return list[Math.floor(Math.random()*list.length)];
        }
        return "";
    }

    refreshCurrentMetroLine() {
        this.currentMetroLine.set(this.getRandomLineFromList(this.metroLines));
    }

    getCurrentMetroLine() : string {
        return this.currentMetroLine();
    }
}
