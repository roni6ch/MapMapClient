import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../apartments.service';
import { IApartments } from '../iapartments';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  apartments = [];
  /*apartmentModal = {
    id: "",
    favorite: false,
    name: "",
    email: "",
    apartment: {
      id: "",
      location: "",
      info: "",
      latlng: {
        lat: 1,
        lng: 1
      },
      images: [
        ""
      ],
      phones: [""],
      apartmentType: "",
      rooms: 1,
      parking: 1,
      balcony: 1,
      mamad: false,
      elevator: false,
      air_conditioner: false,
      tama: false,
      reconditioned: false,
      bars: false,
      master_room: false,
      storage: false,
      gym: false,
      furniture: false,
      pets: false,
      roomates: false,
      immediate_entrance: false,
      apartment_image: false,
      price: 1,
      size: 1,
      floor: 1,
      entrence_date: "",
      toilets: 1
    }
  };
  */
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
