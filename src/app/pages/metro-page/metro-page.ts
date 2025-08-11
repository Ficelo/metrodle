import { Component } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {AutoComplete} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {MetroGuess} from '../../components/metro-guess/metro-guess';
import {Arret, Guess, StationService} from '../../services/station.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-metro-page',
  imports: [
    InputText,
    AutoComplete,
    FormsModule,
    Button,
    MetroGuess,
    NgForOf
  ],
  templateUrl: './metro-page.html',
  standalone: true,
  styleUrl: './metro-page.css'
})

export class MetroPage {


  filteredStations : String[] = [];
  selectedStationName? : string;

  guesses : Guess[] = []



  constructor(private stationService : StationService) {}

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

  compareStation() {
    // TODO : Ajouter une vérif pour tester si c'est bien un nom de station
    if(this.selectedStationName) {

      const chosenStation = this.getArret(this.selectedStationName);
      const correctStation = this.stationService.getCorrectArret();
      let newGuess : Guess = {station : chosenStation!, ligne: "", ville : false, name : ""};

      console.log(chosenStation)

      if(chosenStation) {

        // TODO : revoir comment ça c'est fait
        newGuess.ligne = this.checkLine(chosenStation.lines, correctStation.lines);
        newGuess.ville = (chosenStation.town == correctStation.town)
        newGuess.name = this.checkName(chosenStation.name, correctStation.name);
      }

      this.guesses.unshift(newGuess);
      this.selectedStationName = "";

      console.log(this.guesses)

    }
  }



}

