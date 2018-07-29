import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latLng: any;
  @Input() filterFavoritesInput: boolean;
  @Input() filtersInput: {};

  filtersArr;
  favorites = false;
  apartments = [];
  apartmentModal = {};
  lat: number;
  lng: number;
  mapOptions: object = {
    zoom: 14,
  };
  constructor(private httpReq: HttpRequestsService) {
  }
  ngOnChanges(changes: any) {

    //send to pipe in order to filter the results on map
    if (changes.hasOwnProperty('filtersInput') !== undefined && changes.hasOwnProperty('filtersInput') !== false)
      this.filtersArr = changes.filtersInput.currentValue;

    else if (changes.hasOwnProperty('latLng') !== undefined && changes.hasOwnProperty('latLng') !== false) {
      this.lat = changes.latLng.currentValue.lat;
      this.lng = changes.latLng.currentValue.lng;
    }
  }

  changeFavorites(fav) {
    console.log(fav);
  }
  ngOnInit() {
    //get result.json
    //this.httpReq.getData().subscribe(data => { this.apartments = data; console.log(data) });
    this.lat = this.latLng.lat;
    this.lng = this.latLng.lng;
  }
  boundsChange(lng, lat) {
    console.log(lng, " ", lat);
    let boundsTemp = {
      "lat": lng,
      "long": lat,
    }
    this.httpReq.getData(boundsTemp).subscribe(data => { this.apartments = data; console.log(data); this.lastInfoWindow = null });
  }

  lastInfoWindow: any;
  // close last info-window https://stackblitz.com/edit/agm-close-infowindow?file=app%2Fapp.component.html
  openApartment(apartment, infowindow) {
    console.log(apartment);
    if (this.lastInfoWindow) {
      this.lastInfoWindow.close();
    }
    this.lastInfoWindow = infowindow;
    this.apartmentModal = apartment;
  }



}
