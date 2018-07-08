import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  apartments = [];
  apartmentModal = {};
  lat: number = 32.056442;
  lng: number = 34.772238;
  mapOptions: object = {
    zoom:14
  };
  constructor(private apartmentResults : ApartmentsService) { }

  ngOnInit() {
    //get result.json
    this.apartmentResults.getData().subscribe(data => this.apartments = data['results']);
  }
  openApartment(apartment){
    console.log(apartment);
    this.apartmentModal = apartment;
  }

}
