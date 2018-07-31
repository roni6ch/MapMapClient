import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import { HttpRequestsService } from './services/http-requests.service';

import { google } from "google-maps";
declare var google : google;

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
  view = 'Map';
  nextView = 'Table';
  profile = {};
  latLng = {
    lat: 32.056442,
    lng: 34.772238
  };
  /* google signin button*/
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  scriptLoaded = false;
  showMap = true;

  changeView(){
    if (this.view == 'Map'){
      this.view = 'Table'
      this.nextView = 'Cards';
    }
    else if (this.view == 'Table'){
      this.view = 'Cards'
      this.nextView = 'Map';
    }
    else if (this.view == 'Cards'){
      this.view = 'Map'
      this.nextView = 'Table';
    }
  }
  @ViewChild("searchRef")
  public searchRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private http: HttpClient, private httpReq: HttpRequestsService) { 

    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
    this.mobile = true;

    
  }
  ngOnInit() {
    this.initAutoComplete();
    M.Sidenav.init($('.sidenav'));
    M.FloatingActionButton.init($('.fixed-action-btn'));
   

    setTimeout(()=>{
      this.searchRef.nativeElement.focus();
    },100);

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
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    this.httpReq.login(googleUser.getAuthResponse().id_token).subscribe(data => {
      if (data) {
        this.profile = data;
        this.showLoginBT(false);
      }
      else {
        this.showLoginBT(true);
      }
    });
  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2);
    this.showLoginBT(true);
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  filtersInput = [];
  filtersInputFunc(event){
    this.filtersInput = event; 
  }
  openSearchInput() {
    this.search = true;
  }
  focusOutSearch(e: any) {
    this.search = false;
  }
  apartmentsResults;
  apartmentsResultsInput(e){
    this.apartmentsResults = e;
  }
  keyDownEnter(event){
    if(event.keyCode == 13) {
      this.search = false;
    }
  }
  connect = false;
  showLoginBT(bool: boolean) {
    if (bool) {
      //show login
      this.connect = true;
      $(".googleBT").show();
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

}
