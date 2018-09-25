import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import { HttpRequestsService } from './services/http-requests.service';

//import { AuthService } from "angular2-social-login";

import { google } from "google-maps";
declare var google: google;

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobile = false;
  search = true;
  cardsView = false;
  apartmentObj = null;
  view = 'Map';
  nextView = 'טבלה';
  profile = {};
  latLng = {
    lat: 32.056442,
    lng: 34.772238
  };
  /* google signin button*/
  //private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  scriptLoaded = false;
  showMap = true;
  @ViewChild('apartmentModal') apartmentModal: ElementRef;

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
  @ViewChild("searchRef")
  public searchRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
     //public _auth: AuthService,
     private ngZone: NgZone, private http: HttpClient, private httpReq: HttpRequestsService) {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      this.mobile = true;


  }
  ngOnInit() {
    this.initAutoComplete();
    M.Sidenav.init($('.sidenav'));
    M.FloatingActionButton.init($('.fixed-action-btn'));


    setTimeout(() => {
      //check whar happend to login button if i remove comment
      this.searchRef.nativeElement.focus();
    }, 100);

  }

  initAutoComplete() {
    //load Places Autocomplete
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

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }
  /*onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    this.httpReq.(googleUser.getAuthloginResponse().id_token).subscribe(data => {
      if (data) {
        console.log(data);
        this.profile = data;
        this.showLoginBT(false);
        //pass data.token to serices
        this.httpReq.setToken(data['token']);
      }
      else {
        this.showLoginBT(true);
      }
    });
  }*/

  logindata(data) {
    if (data !== false && gapi.auth2.getAuthInstance().isSignedIn.get()) {
      //google connection
      this.profile = data;
      this.profile['picture']  = data['picture'];
      this.showLoginBT(false);
      //pass data.token to serices
      this.httpReq.setToken(data['token']);
      M.Tooltip.init($(".tooltipped"));
    } 
    //TODO: open and fix facebook login
    /*else if(data !== false && this._auth != null){
      //facebook connection
      this.showLoginBT(false);
      this.profile = data;
      this.profile['picture']  = data['image'];
      this.httpReq.setToken(data['token']);

      M.Tooltip.init($(".tooltipped"));
    }*/
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
  
  signOut() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      //disconnect from google
      var auth2 = gapi.auth2.getAuthInstance();
      console.log(auth2);
      this.showLoginBT(true);
      auth2.signOut().then(function () {
        console.log('google user signed out.');
      });
    } else {
      //disconnect from facebook
      this.showLoginBT(true);
      /*this._auth.logout().subscribe(
        (data)=>{
          //return a boolean value.
          console.log(data);
          console.log('facebook User signed out.');
        }
      )*/
    }
  }
  filtersInput = [];
  filtersInputFunc(event) {
    this.filtersInput = event;
  }
  openSearchInput() {
    this.search = true;
  }
  focusOutSearch(e: any) {
    this.search = false;
  }
  apartmentsResults;
  apartmentsResultsInput(e) {
    this.apartmentsResults = e;
  }
  keyDownEnter(event) {
    if (event.keyCode == 13) {
      this.search = false;
    }
  }
  connect = false;
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
  }

  editApartmentInput(apartment) {
    this.apartmentModal.nativeElement.click();
    this.apartmentObj = apartment;
  }




}
