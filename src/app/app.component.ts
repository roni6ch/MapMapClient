import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  /* google signin id */
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  @ViewChild('apartmentModal') apartmentModal: ElementRef;
  @ViewChild("searchRef")  searchRef: ElementRef;
  mobile = false;
  search = true;
  cardsView = false;
  apartmentObj = null;
  scriptLoaded = false;
  showMap = true;
  connect = false;
  apartmentsResults = 0;
  filtersInput = [];
  view = 'Map';
  nextView = 'טבלה';
  profile = {};
  latLng = {
    //initialize coordinates
    lat: 32.056442,
    lng: 34.772238
  };

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private http: HttpClient, private httpReq: HttpRequestsService) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      this.mobile = true;
  }

  ngOnInit() {
    this.initAutoComplete();
    M.Sidenav.init($('.sidenav'));
    M.FloatingActionButton.init($('.fixed-action-btn'));
    setTimeout(() => {
      this.searchRef.nativeElement.focus();
    }, 200);
  }
  
  

  //load Places Autocomplete
  initAutoComplete() {
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
    } 
    else if (data !== false){
      //custom login
      this.httpReq.setToken(data);
      this.showLoginBT(false);
      this.profile = [];
      this.profile['picture'] = "../assets/images/apartments/no_image.jpg";
      M.Tooltip.init($(".tooltipped"));
    }
    else {
      this.showLoginBT(true);
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
  filtersInputFunc(filtersInput) {
    this.filtersInput = filtersInput;
  }
  apartmentsResultsInput(apartmentsResultsInput) {
    this.apartmentsResults = apartmentsResultsInput;
  }
  keyDownEnter(event) {
    if (event.keyCode == 13) {
      this.search = false;
    }
  }
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

  editApartments = [];
  getApartments(){
    console.log('getApartments');

    if (!this.connect) //connected
    this.httpReq.getUserApartments().subscribe(result => {
    console.log('getApartments ' , result);
      this.editApartments = result;
    });
  }
  editApartmentInput(apartment) {
    this.apartmentModal.nativeElement.click();
    this.apartmentObj = apartment;
  }




}
