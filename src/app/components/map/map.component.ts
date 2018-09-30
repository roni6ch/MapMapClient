import { Component, ElementRef, OnInit, Input, ViewChild ,ViewChildren, Output , EventEmitter } from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';
import { FiltersPipe } from '../../pipes/filters.pipe';



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
  markers = [];
  apartmentModal = {};
  apartmentInfo = {};
  lat: number;
  lng: number;
  zoom = 14;
   

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

    //todo: get apartments by boundsTemp
    this.boundsChange(this.latLng.lng, this.latLng.lat)
    
  }
  ngAfterViewInit() {
   // this.apartmentsResults.emit(this.markers.length);

  }

  changeFavorites(fav) {
    console.log(fav);
  }
  ngOnInit() {

    //get result.json
    //this.httpReq.getMarkers().subscribe(data => { this.markers = data; console.log(data) });
    this.lat = this.latLng.lat;
    this.lng = this.latLng.lng;

  }
  boundsChange(lng, lat) {
    let boundsTemp = {
      "lat": lng,
      "long": lat,
    }
    this.httpReq.getMarkers(boundsTemp).subscribe(data => { 
      ///todo - open this filters
     // this.markers = this.filterPipe.transform(data, this.filtersArr);
      //todo: change this to get filtered pipe markers length
    //  let filteredData = this.filterPipe.transform(data, this.filtersArr);

    this.markers = data;
      this.apartmentsResults.emit(this.markers.length);
      this.lastInfoWindow = null;
    });
  }

  lastInfoWindow: any;
  // close last info-window https://stackblitz.com/edit/agm-close-infowindow?file=app%2Fapp.component.html
  openApartment(apartment, infowindow) {
    if (this.lastInfoWindow) {
      this.lastInfoWindow.close();
    }


    //todo - ajax here to bring apartment info 
    this.httpReq.getApartmentData(apartment._id).subscribe(data => { 
      console.log(data);
      this.lastInfoWindow = infowindow;
      this.apartmentInfo = data;
      this.apartmentModal = data;
    })
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
