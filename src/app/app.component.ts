import { Component, ElementRef, NgZone, ViewChild, OnInit , Output , EventEmitter , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApartmentsService } from './services/apartments.service';
import { HttpRequestsService } from './services/http-requests.service';
import { MapsAPILoader } from '@agm/core';
import { google } from "google-maps";
import * as $ from 'jquery';
import * as M from 'materialize-css';
declare var google: google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input() apartmentModal: ElementRef;
  @Output() checkLoginStatus = new EventEmitter();

  @ViewChild('searchRef') searchRef: ElementRef;
  

  mobile = false;
  search = true;
  cardsView = false;
  apartmentObj = null;
  scriptLoaded = false;
  showMap = true;
  connect = false;
  apartmentsResults = 0;
  filtersInput = [];
  editApartments = [];
  view = 'Map';
  nextView = 'טבלה';
  profile = {};
  latLng = {
    //initialize coordinates
    lat: 32.056442,
    lng: 34.772238
  };
  @ViewChild('editButtonModal') editButtonModal: ElementRef;
  

  constructor(private mapsAPILoader: MapsAPILoader,   private router: Router, private apartmentService : ApartmentsService,
    private ngZone: NgZone, private http: HttpClient, private httpReq: HttpRequestsService) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      this.mobile = true;
  }

  ngOnInit() {
    M.Sidenav.init($('.sidenav'));
    setTimeout(() => {
      this.searchRef.nativeElement.focus();
    }, 200);
  }
  
  //load Places Autocomplete
  initAutoComplete(search) { 
    this.searchRef = search;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchRef.nativeElement, {
        types: ["(cities)"]
        //types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.latLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          this.search = false;
          console.log("coordinates: " , this.latLng);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  //change view
  changeView() {
    switch (this.view) {
      case 'Map':
        this.view = 'Table'
        this.nextView = 'כרטיסיות';
        break;
      case 'Cards':
        this.view = 'Map'
        this.nextView = 'טבלה';
        break;
      case 'Table':
        this.view = 'Cards'
        this.nextView = 'מפה';
        break;
    }
  }
  //login
  logindata(data) {
    if (data !== false && gapi.auth2.getAuthInstance().isSignedIn.get()) {
      //google connection
      this.profile = data;
      this.profile['picture']  = data['picture'];
      this.showLoginBT(false);
      //pass data.token to serives
      this.httpReq.setToken(data['token']);
      M.Tooltip.init($(".tooltipped"));
      this.checkLoginStatus.emit(true);
    } 
    else if (data !== false){
      //custom login
      this.httpReq.setToken(data);
      this.showLoginBT(false);
      this.profile = [];
      this.profile['picture'] = "../assets/images/apartments/no_image.jpg";
      M.Tooltip.init($(".tooltipped"));
      this.checkLoginStatus.emit(true);
    }
    else {
      this.showLoginBT(true);
      this.checkLoginStatus.emit(false);
    }
    
  }
  //logout
  signOut() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      //disconnect from google
      var auth2 = gapi.auth2.getAuthInstance();
      this.showLoginBT(true);
      auth2.signOut().then(function () {
        console.log('google user signed out.');
      });
    } else {
      //disconnect from custom login
      this.showLoginBT(true);
    }
  }

  //get all marker's filters from modal
  filtersInputFunc(filtersInput) {
    this.filtersInput = filtersInput;
  }
  //markers length
  apartmentsResultsInput(apartmentsResultsInput) {
    this.apartmentsResults = apartmentsResultsInput;
  }
  //show login button or image
  showLoginBT(bool: boolean) {
    if (bool) {
      //show login
      this.connect = true;
      $(".googleBT").show();
      $(".signOut").hide();
    }
    else {
      //show profile
      this.connect = false;
      $(".googleBT").hide();
      $(".signOut").show();
      $(".signOut").attr("src", this.profile['picture']);
      $(".name").html(this.profile['given_name'] + this.profile['family_name']);
      $(".email").html(this.profile['email']);
    }
    console.log("connect (true means - show login button): " , this.connect);
  }

  //edit user apartments
  getApartments(){
    if (!this.connect) //connected
    this.httpReq.getUserApartments().subscribe(result => {
    console.log('edit user apartments ' , result);
      this.editApartments = result;
    });
  }
  //open edit apartment modal
  editApartmentInput(apartment) {
    this.apartmentObj = apartment;
  this.apartmentService.setApartment( this.apartmentObj );
    
   this.router.navigate(['/edit']);
    setTimeout(()=>{
      this.editButtonModal.nativeElement.click();
    },1000);
  }
  removeBlur(){
    this.search = false;
  }
}
