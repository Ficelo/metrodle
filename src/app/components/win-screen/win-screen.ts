import { Component, input, OnInit, output, signal } from '@angular/core';
import { StationMetro } from '../../types/metro/metro-station';
import { StationsService } from '../../services/stations.service';
import { ImagesService, StationImage } from '../../services/images.service';

@Component({
  imports: [],
  selector: 'metrodle-win-screen',
  styleUrl: './win-screen.scss',
  templateUrl: './win-screen.html',
})
export class WinScreen implements OnInit{

  correctStation : StationMetro;
  attempts = input<number>(0);
  onClosedUpate = output<boolean>();
  imageUrl = signal('');

  constructor(private stationService: StationsService, private imagesService: ImagesService) {
    this.correctStation = this.stationService.getCorrectMetroStation();
  }

  async ngOnInit() {
    const images = await this.imagesService.getStationImage(this.correctStation.name);
    this.imageUrl.set(this.getImageUrl(images));
  }

  getImageUrl(images: StationImage[]) : string{
    return images.find(image => image.thumbnail)?.thumbnail ?? '';
  }

  close() {
    this.onClosedUpate.emit(false);
  }

}
