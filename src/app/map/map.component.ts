import { Component,ElementRef, OnInit ,Input } from '@angular/core';
import { ApartmentsService } from '../services/apartments.service';
import { FiltersPipe } from '../filters.pipe';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latLng: any; 
  @Input() filterFavoritesInput: boolean; 
  
  favorites = false;
  apartments = [];
 apartmentModal = {};
  lat: number;
  lng: number;
  mapOptions: object = {
    zoom:14
  };
  constructor(private apartmentResults : ApartmentsService) {
   
   }
   ngOnChanges(changes: any){
    if (changes.hasOwnProperty('filterFavoritesInput')){
      this.favorites = changes["filterFavoritesInput"].currentValue;
      //create @pipe that filter the ngFor
    }
    if (changes.hasOwnProperty('latLng')){
      this.lat = changes.latLng.currentValue.lat;
      this.lng = changes.latLng.currentValue.lng;
    }
   }

   changeFavorites(fav){
     console.log(fav);
  
   }
  ngOnInit() {
    //get result.json
    this.apartmentResults.getData().subscribe(data => this.apartments = data['results']);

    this.lat = this.latLng.lat;
    this.lng = this.latLng.lng;

  }
  openApartment(apartment){
    console.log(apartment);
    this.apartmentModal = apartment;
  }

}
