    import { Component, OnInit, ElementRef, ViewChild ,NgZone,Input,Output,EventEmitter } from '@angular/core';
    import { AdvancedFilterService } from '../../services/advanced-filter.service';
    import { HttpRequestsService } from '../../services/http-requests.service';
    import {  NgForm  } from '@angular/forms';
    import { google } from "google-maps";
    declare var google : google;
    import { MapsAPILoader } from '@agm/core';
    import { Apartment } from '../../shared/apartment';
    import * as $ from 'jquery';

    import * as M from 'materialize-css';

    @Component({
      selector: 'app-new-apartment-modal',
      templateUrl: './new-apartment-modal.component.html',
      styleUrls: ['./new-apartment-modal.component.scss']
    })
    export class NewApartmentModalComponent implements OnInit {


      @ViewChild('btnClose') btnClose: ElementRef
      @Input() apartmentObj: any;
      addImagesToFormOutPutArr = [];

      advancedFilters = [];

      
      apartment_types = ["דירה","סטודיו","יחידת דיור","וילה","דירת גן"];
      apartment_rooms = [1,2,3,4,5,6,7,8];
      apartment_floor = [0,1,2,3,4,5,6,7,8,9,10,20,30];
      apartment_toilets = [1,2,3,4];
      apartment_publisherType = ["פרטי","תיווך"];

      apartment: any;

      constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private advancedFiltersJSON: AdvancedFilterService, private httpReq: HttpRequestsService) {
      
      
      }
      ngOnInit(){}
      ngOnChanges(changes: any) {

        //send to pipe in order to filter the results on map
        if (changes.hasOwnProperty('apartmentObj') !== undefined && changes['apartmentObj'].currentValue !== undefined && changes['apartmentObj'].currentValue !== null && changes.hasOwnProperty('apartmentObj') !== false){
          console.log(this.apartmentObj);
          this.apartment = this.apartmentObj;

          //if it havent cast yet
          if (typeof(this.apartment.details.entrance_date) == "object")
            this.apartment.details.entrance_date =  this.apartment.details.entrance_date.toISOString().split('T')[0];
          
          this.addImagesToFormOutPutArr = this.apartment.details.images;


        setTimeout(()=>{
          M.updateTextFields();
          M.FormSelect.init(document.querySelectorAll('select')); 
          });
          
        }
        else{
          //new apartemnt
          this.initApartment();
          this.addImagesToFormOutPutArr = [];


        }
      }
      ngAfterViewInit() {
        
        M.FormSelect.init($("select")); 
        M.CharacterCounter.init($('#inputDescription'));



        this.advancedFiltersJSON.getAllFilters().subscribe(data => this.advancedFilters = data);
        this.initApartment();
        this.initAutoComplete();
      }
      addPhone(){
        this.apartment.publisher.phones.push("");
      }
      initApartment(){

        //apartment class must be initialize
        let id="";
        let publisher = {
          name: "",
          email:"",
          phones: [""],
          type:""
        }
        let location = {
          address: "",
          latlng: {
            lat: 0,
            lng: 0
          }
        }
        let details = {
          apartment_type: [],
          rooms: 0,
          size: null,
          floor: 0,
          toilets: 0,
          info: "",
          price: null,
          entrance_date: "",
          images: [],
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
      }
    
      addImagesToForm(images) {
        console.log('addImagesToForm: ', images);
        //todo: iterate over images
        this.apartment.details.images = images;
        
      }

      onActiveDateChange(event){
        console.log(event);
      }
      onSelectionDone(event){
        console.log(event);
      }
      confirmPhoneByToast(phone){
        if (phone.valid){
          M.toast({html: 'Confirm Message sent to your Phone , please write the code : <input type="text" id="phoneActivation" class="text-white" maxlength="5"  />'
          , classes: 'rounded',displayLength:1000000000
          , completeCallback: function(){ console.log("TODO: send to server user input in order to compare: " , $("#phoneActivation").val()); }
        });
        }
      }
      trackByFn(index: any, item: any) {
      return index;
    }
      submitPhone(number){
        console.log(number);
      }
      submittedError = false;
      publishNewApartment(myForm: NgForm) {

        
        if (!myForm.valid) {
          this.submittedError=true;
          return false;
        }

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

      
      @ViewChild("search") searchElementRef: ElementRef;
      latLng = {
        lat: 32.056442,
        lng: 34.772238
      };
      initAutoComplete() {
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          
          let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById("inputLocation"), {
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
              this.apartment.location.address =  place.formatted_address;
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
