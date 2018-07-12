import { Component,ElementRef, OnInit ,Input } from '@angular/core';
import { ApartmentsService } from '../apartments.service';
import { IApartments } from '../iapartments';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latLng: any; 

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
     console.log(changes.latLng);
     this.lat = changes.latLng.currentValue.lat;
     this.lng = changes.latLng.currentValue.lng;
   }
  ngOnInit() {
    //get result.json
    this.apartmentResults.getData().subscribe(data => this.apartments = data['results']);

    this.lat = this.latLng.lat;
    this.lng = this.latLng.lng;
    console.log(this.latLng);

  }
  openApartment(apartment){
    console.log(apartment);
    this.apartmentModal = apartment;
  }

}
