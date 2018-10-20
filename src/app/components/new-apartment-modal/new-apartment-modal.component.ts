    import { Component, OnInit, ElementRef, ViewChild ,NgZone,Input,Output,EventEmitter } from '@angular/core';
    import { AdvancedFilterService } from '../../services/advanced-filter.service';
    import { HttpRequestsService } from '../../services/http-requests.service';
    import { ApartmentsService } from '../../services/apartments.service';
    import {  NgForm  } from '@angular/forms';
    import { Router ,ActivatedRoute} from '@angular/router';

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

      @ViewChild('btnClose') btnClose: ElementRef;
      @ViewChild('newApartmentWindowModal') newApartmentWindowModal: ElementRef;
    apartmentObj: any;
      addImagesToFormOutPutArr = [];
      advancedFilters = [];
      submittedError = false;
      apartment: any;
      
      @ViewChild("search") searchElementRef: ElementRef;
      latLng = {
        lat: 32.056442,
        lng: 34.772238
      };

      apartment_types = ["דירה","סטודיו","יחידת דיור","וילה","דירת גן"];
      apartment_rooms = [1,2,3,4,5,6,7,8];
      apartment_floor = [0,1,2,3,4,5,6,7,8,9,10,20,30];
      apartment_toilets = [1,2,3,4];
      apartment_publisherType = [
        {
        "heb":"פרטי",
        "eng":"private"
        },{
          "heb":"תיווך",
          "eng":"broker"
          },
      ];

      constructor(private mapsAPILoader: MapsAPILoader, private apartmentService : ApartmentsService,        private route: ActivatedRoute,         private ngZone: NgZone, private advancedFiltersJSON: AdvancedFilterService, private httpReq: HttpRequestsService) { 

      }
      ngOnInit(){
        this.initApartment();
        this.apartmentObj = this.apartmentService.getApartment();
        if (this.route.snapshot['_routerState'].url == '/new'){
          this.addImagesToFormOutPutArr = [];
          if (this.httpReq.token !== "")
          this.httpReq.getUserInfo().subscribe(data => {
            if (data) {
              document.getElementById("newApartmentWindowModalBT").click();
              console.log(data);
              this.apartment.publisher.name = data['name'];
              this.apartment.publisher.email = data['email'];
            }
            else{
              console.log("not connected!");
            }
          });
        }
        else  if (this.route.snapshot['_routerState'].url == '/edit' && this.apartmentObj){
          console.log(this.apartmentObj);
          this.apartment = this.apartmentObj;
          
          setTimeout(()=>{
            document.getElementById("editButtonModalBT").click();
            },1000);

          //if it havent cast yet
          if (typeof(this.apartment.details.entrance_date) == "object")
            this.apartment.details.entrance_date =  this.apartment.details.entrance_date.toISOString().split('T')[0];
          
          this.addImagesToFormOutPutArr = this.apartment.details.images;


        setTimeout(()=>{
          M.updateTextFields();
          M.FormSelect.init(document.querySelectorAll('select')); 
          });
        }

      }
      ngAfterViewInit() {
        M.FormSelect.init($("select")); 
        M.CharacterCounter.init($('#inputDescription'));
        this.advancedFiltersJSON.getAllFilters().subscribe(data => this.advancedFilters = data);
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
          coordinates: []
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
          address: ""
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
              this.apartment.details.address =  place.formatted_address;
              this.apartment.location.coordinates[0] = this.latLng.lat;
              this.apartment.location.coordinates[1] = this.latLng.lng;

              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
            });
          });
        });
      }
    }
