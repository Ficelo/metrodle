import { Component } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {AutoComplete} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {MetroGuess} from '../../components/metro-guess/metro-guess';
import {Arret, Guess, StationService} from '../../services/station.service';
import {NgForOf} from '@angular/common';
import {AutoFitTextDirective} from '../../directives/auto-fit-text.directive';
import {SaveService} from '../../services/save.service';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-metro-page',
  imports: [
    InputText,
    AutoComplete,
    FormsModule,
    Button,
    MetroGuess,
    NgForOf,
    AutoFitTextDirective,
    Dialog
  ],
  templateUrl: './metro-page.html',
  standalone: true,
  styleUrl: './metro-page.css'
})

export class MetroPage {

  filteredStations : String[] = [];
  selectedStationName? : string;
  found : boolean;
  showDialog : boolean;
  copyText : string = "";

  guesses : Guess[];

  stationText = "Station";
  lineText = "Ligne";
  villeText = "Ville";
  nomText = "Nom (taille)";
  locationText = "Dans Paris";
  openingDateText = "Date d\'ouverture";

  constructor(private stationService : StationService, private saveService : SaveService) {
    this.found = this.saveService.getSaveData().found;
    this.showDialog = this.found;
    this.guesses = this.saveService.getSaveData().guesses;
  }

  filterStations(event : {query : string}){
    const query = event.query.toLowerCase();
    this.filteredStations = this.stationService.getArretsData()
      .filter(station => station.name && station.name.toLowerCase().includes(query))
      .map(station => station.name);
  }

  getArret(name: string): Arret | undefined {
    return this.stationService.getArretsData().find(
      arret => arret.name && arret.name.toLowerCase() === name.toLowerCase()
    );
  }

  checkLine(selectedLines : string[], correctLines : string[]) : string {

    let sameLine = 0;

    for(let line of selectedLines) {
      if(correctLines.includes(line)){
        sameLine += 1;
      }
    }

    if(sameLine == correctLines.length && correctLines.length == selectedLines.length) return "good";
    if(sameLine > 0) return "maybe";
    return "bad";
  }

  checkName(selectedName : string, correctName : string) : string {
    if(selectedName.length == correctName.length) return "good";
    if(selectedName.length < correctName.length) return "more";
    return "less";
  }

  checkDate(selectedDate: string, correctDate: string): string {
    const [sd, sm, sy] = selectedDate.split("-");
    const [cd, cm, cy] = correctDate.split("-");

    const selected = new Date(`${sy}-${sm}-${sd}`).getTime();
    const correct = new Date(`${cy}-${cm}-${cd}`).getTime();

    if (selected < correct) return "earlier";
    if (selected === correct) return "good";
    return "later";
  }

  compareStation() {

    if(this.selectedStationName && this.filteredStations.includes(this.selectedStationName)) {

      const chosenStation = this.getArret(this.selectedStationName);
      const correctStation = this.stationService.getCorrectArret();
      let newGuess : Guess = {station : chosenStation!, ligne: "", ville : false, name : "", opening_date: "", correct_town : ""};

      if(chosenStation) {
        newGuess.ligne = this.checkLine(chosenStation.lines, correctStation.lines);
        newGuess.ville = (chosenStation.town == correctStation.town)
        newGuess.name = this.checkName(chosenStation.name, correctStation.name);
        newGuess.correct_town = correctStation.town;
        newGuess.opening_date = this.checkDate(chosenStation.opening_date, correctStation.opening_date);
      }

      let save = this.saveService.getSaveData();

      if(chosenStation?.name == correctStation.name) {
        save.found = true;
        this.found = true;
      }

      this.guesses.unshift(newGuess);
      save.guesses = this.guesses;
      this.selectedStationName = "";

      this.saveService.setSateData(save);

      if(this.found) {
        setTimeout(() => {this.showDialog = true;}, 1500)
      }

    }
  }

  createSquareString(guess: Guess): string {
    let ligne = "";

    if (guess.ligne == "good") ligne += "🟩";
    if (guess.ligne == "maybe") ligne += "🟧";
    if (guess.ligne == "bad") ligne += "🟥";

    if (guess.ville) ligne += "🟩";
    else ligne += "🟥";

    if (guess.name == "good") ligne += "🟩";
    else ligne += "🟥";

    if (
      (guess.station.town.includes("Paris") && guess.correct_town.includes("Paris")) ||
      (!guess.station.town.includes("Paris") && !guess.correct_town.includes("Paris"))
    ) ligne += "🟩";
    else ligne += "🟥";

    if (guess.opening_date == "good") ligne += "🟩";
    else ligne += "🟥";

    return ligne;
  }

  buildCopyText() {
    this.copyText = this.guesses.map(g => this.createSquareString(g)).join("\n");
    navigator.clipboard.writeText(this.copyText);
  }

}

