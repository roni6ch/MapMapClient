import { Component ,ElementRef,NgZone,ViewChild  ,OnInit} from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import * as $ from 'jquery';

import { } from 'googlemaps';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  search = false;
  profile = {};
  latLng = {
    lat:32.056442,
    lng:34.772238
  };
  /* google signin button*/
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  scriptLoaded = false;

  //https://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
  public searchControl: FormControl;
  @ViewChild("searchRef")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  ngOnInit() { 
   this.checkIfUserSignIn();
   this.initAutoComplete();
  }
  
  initAutoComplete(){
  //create search FormControl
  this.searchControl = new FormControl();
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
          lat:place.geometry.location.lat(),
          lng:place.geometry.location.lng()
        }

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
      });
    });
  });
  }

  checkIfUserSignIn() {
    if (localStorage.getItem('profile') !== null) {

    this.profile = JSON.parse(localStorage.getItem('profile'));
      $(".googleBT").hide();
      $(".name").show();
      $(".email").show();
      $(".signOut").attr("src",this.profile['IMG']);
      $(".name").html(this.profile['NAME']);
      $(".email").html(this.profile['EMAIL']);
      $(".signOut").show();
    }else{
      $(".googleBT").show();
      $(".signOut").hide();
      $(".name").hide();
      $(".email").hide();
    }
  }
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    console.log(event);
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let userProfile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();

    var profile = {
      "GOOGLE_USER_ID": googleUser.getAuthResponse().id_token,
      "ID": userProfile.getId(),
      "NAME": userProfile.getName(),
      "IMG": userProfile.getImageUrl(),
      "EMAIL": userProfile.getEmail()
    }
    console.log(profile);
    localStorage.setItem('profile', JSON.stringify(profile));
    
    this.checkIfUserSignIn();

  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2);
    localStorage.removeItem('profile');
    this.checkIfUserSignIn();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  openSearchInput(){
    this.search = true;
  }
  focusOutSearch(e: any) {
    this.search = false;
 }

}
