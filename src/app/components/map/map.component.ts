import { Component,  OnInit, Input, ViewChildren, Output , EventEmitter } from '@angular/core';
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
  @Input() loginStatus: any;
  
  @Output() apartmentsResults = new EventEmitter();
  
  @ViewChildren('markers') markersLength;
  @Output() search = new EventEmitter();
  
  filtersArr;
  favorites = false;
  invisibleInfoWindow = false;
  showMap = true;
  clickEven = false;
  markers = [];
  apartmentModal = {};
  apartmentInfo = {};
  lat: number;
  lng: number;
  lastInfoWindow: any;
  zoom = 14;
  map : any;
  checkLoginStatus = null;
  markerPrivateIcon = './../../../assets/images/icons/markerPrivateIcon.png';
  markerBrokerIcon =  './../../../assets/images/icons/markerBrokerIcon.png';
   

 origin = null;
 destination = null;
  constructor(private httpReq: HttpRequestsService, private filterPipe: FiltersPipe) {
    console.log("map");
  }
  ngOnChanges(changes: any) {
    //send to pipe in order to filter the results on map
    if (changes.hasOwnProperty('filtersInput') !== undefined && changes.hasOwnProperty('filtersInput') !== false){
      this.filtersArr = changes.filtersInput.currentValue;
    }
    if (changes.hasOwnProperty('loginStatus') !== undefined) {
      this.checkLoginStatus = changes.hasOwnProperty('loginStatus');
      this.boundsChange(this.latLng.lng, this.latLng.lat);
    }
    if (changes.hasOwnProperty('latLng') !== undefined && changes.hasOwnProperty('latLng') !== false) {
      this.lat = changes.latLng.currentValue.lat;
      this.lng = changes.latLng.currentValue.lng;
    }

    //todo: get apartments by boundsTemp
    //this.boundsChange(this.latLng.lng, this.latLng.lat);
    
  }
  mapReady(map) {
    this.map = map;
    var that = this;
    this.map.addListener("dragend", function () {
      that.search.emit(false);
      that.boundsChange(that.map.center.lng(), that.map.center.lat());
    });
}

  ngOnInit() {
    //get result.json
    this.lat = this.latLng.lat;
    this.lng = this.latLng.lng;
  }
  boundsChange(lng, lat) {
    if (this.checkLoginStatus !== null){
    console.log("boundsChange - lng: " , lng , " ,lat: " , lat );
    let params = {
      "lat": lng,
      "long": lat,
      "zoom":this.zoom,
      "width": document.body.clientWidth,
      "height":document.body.clientHeight - 50
    }

    this.httpReq.getMarkers(params).subscribe(data => { 
    this.markers = data;
      this.apartmentsResults.emit(this.markers.length);
      this.lastInfoWindow = null;
    });
  }
  }

  // close last info-window https://stackblitz.com/edit/agm-close-infowindow?file=app%2Fapp.component.html
  openApartment(apartment, infowindow) {
    if (this.lastInfoWindow) {
      this.invisibleInfoWindow = true;
      this.lastInfoWindow.close();
    }

    this.httpReq.getApartmentData(apartment._id).subscribe(data => { 
      this.invisibleInfoWindow = false;
      console.log(data);
      this.lastInfoWindow = infowindow;
      this.apartmentInfo = data;
    })
  }

  openApartmentModal(apartment) {
    this.httpReq.getApartmentData(apartment._id).subscribe(data => { 
      this.apartmentModal = data;
    })
  }

  mapRightClick(event){
    console.log(event.coords);
    if (!this.clickEven)
      this.origin = event.coords;
    else
      this.destination = event.coords;

    this.clickEven = !this.clickEven;
  }

}









