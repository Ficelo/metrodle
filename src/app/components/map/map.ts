import { Component, OnInit } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { StationMetro } from '../../types/metro/metro-station';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';

@Component({
  imports: [],
  selector: 'metrodle-map',
  styleUrl: './map.scss',
  templateUrl: './map.html',
})
export class MapComponent implements OnInit{

  public map!: Map;
  private vectorLayer!: VectorLayer;

  ngOnInit(): void {

    this.vectorLayer = new VectorLayer({
          source: new VectorSource(),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 1],
              scale: 0.5,
              src: 'metro-station-icon.svg',
            })
          })
        });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([2.349014, 48.864716]),
        zoom: 11,
        maxZoom: 18
      }),
    });
  }

  addStationOnMap(station : StationMetro) {
    const marker = new Feature({
      geometry: new Point(fromLonLat([station.coords.lon, station.coords.lat]))
    });
    this.vectorLayer.getSource()?.addFeature(marker);
  }

}
