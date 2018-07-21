import { Component, OnInit, ElementRef, ViewChild ,NgZone } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { HttpRequestsService } from '../services/http-requests.service';
import { FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { google } from "google-maps";
declare var google : google;
import { MapsAPILoader } from '@agm/core';
import { Apartment } from '../apartment';
import * as $ from 'jquery';


@Component({
  selector: 'app-new-apartment-modal',
  templateUrl: './new-apartment-modal.component.html',
  styleUrls: ['./new-apartment-modal.component.scss']
})
export class NewApartmentModalComponent implements OnInit {


  @ViewChild('btnClose') btnClose: ElementRef

  advancedFilters = [];

  apartment: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private advancedFiltersJSON: AdvancedFilterService, private httpReq: HttpRequestsService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);

    //apartment class must be initialize
    let id="";
    let publisher = {
      name: "",
      email:"",
      phone: null
    }
    let location = {
      address: "",
      latlng: {
        lat: null,
        lng: null
      }
    }
    let details = {
      apartmentType: null,
      rooms: null,
      size: null,
      floor: null,
      toilets: null,
      info: "",
      price: null,
      entrance_date: "",
      images: null,
    }
    let filters = {
      parking: false,
      balcony: false,
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
      roommates: false,
      immediate_entrance: false,
      apartment_image: false,
    }
    this.apartment = new Apartment(id, publisher,location,details, filters);
    console.log(this.apartment);
    this.initAutoComplete();
  }
  addImagesToForm(images) {
    console.log('addImagesToForm: ', images);
    //todo: iterate over images
    this.apartment['images'].push(images);
  }
  publishNewApartment() {
    console.log(this.apartment);
    var trueFilters = {};
    for (var key in this.apartment.filters) {
      if (this.apartment.filters[key] === true)
        trueFilters[key] = true;
    }
    this.apartment.filters = trueFilters;

    console.log(this.apartment);
    //close the modal
    this.btnClose.nativeElement.click();
    this.httpReq.publishNewApartment(this.apartment).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });



  }


  @ViewChild("date") date: ElementRef;
  changeDate(){
    this.apartment.details.entrance_date = this.date.nativeElement.value;
  }
  @ViewChild("search") searchElementRef: ElementRef;
  latLng = {
    lat: 32.056442,
    lng: 34.772238
  };
  initAutoComplete() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.latLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          this.apartment.location.latlng.lat = this.latLng.lat;
          this.apartment.location.latlng.lng = this.latLng.lng;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }


}
