import { Component } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search = false;
  profile = {};
  /* google signin button*/
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  scriptLoaded = false;

  constructor() { }
  ngOnInit() { 
   this.checkIfUserSignIn();
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

}
