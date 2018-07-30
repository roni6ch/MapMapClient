import { Component, ElementRef, OnInit, Input, ViewChild ,ViewChildren, Output , EventEmitter } from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';
import { FiltersPipe } from '../filters.pipe';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latLng: any;
  @Input() filterFavoritesInput: boolean;
  @Input() filtersInput: {};
  @Output() apartmentsResults = new EventEmitter();
  
  @ViewChildren('markers') markersLength;

  filtersArr;
  favorites = false;
  apartments = [];
  apartmentModal = {};
  lat: number;
  lng: number;
  mapOptions: object = {
    zoom: 14,
    minZoom:12
  };
   

 origin = undefined;
 destination = undefined;
  constructor(private httpReq: HttpRequestsService, private filterPipe: FiltersPipe) {
  }
  ngOnChanges(changes: any) {

    //send to pipe in order to filter the results on map
    if (changes.hasOwnProperty('filtersInput') !== undefined && changes.hasOwnProperty('filtersInput') !== false){
      this.filtersArr = changes.filtersInput.currentValue;
    }
    else if (changes.hasOwnProperty('latLng') !== undefined && changes.hasOwnProperty('latLng') !== false) {
      this.lat = changes.latLng.currentValue.lat;
      this.lng = changes.latLng.currentValue.lng;
    }
    //todo: get apartments length and emit to apartmentsResults
  }
  ngAfterViewInit() {
   // this.apartmentsResults.emit(this.markers.length);

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
    let boundsTemp = {
      "lat": lng,
      "long": lat,
    }
    this.httpReq.getData(boundsTemp).subscribe(data => { 
      this.apartments = data; 
      //todo: change this to get filtered pipe apartments length
      let filteredData = this.filterPipe.transform(data, this.filtersArr);
      this.apartmentsResults.emit(filteredData.length);
      this.lastInfoWindow = null;
    });
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
  showMap = true;
  clickEven = false;
  mapRightClick(event){
    console.log(event.coords);
    if (!this.clickEven)
      this.origin = event.coords;
    else
      this.destination = event.coords;

    this.clickEven = !this.clickEven;
  }

}
