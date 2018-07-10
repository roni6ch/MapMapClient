import { Component } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* google signin button*/
  googleIMG: string = '';
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  scriptLoaded = false;

  constructor() { }
  ngOnInit() { 
   this.checkIfUserSignIn();
  }

  checkIfUserSignIn() {
    if (localStorage.getItem('profile') !== null) {
      //change button to Sign-Out
      this.googleIMG = JSON.parse(localStorage.getItem('profile'))['IMG'];
      $(".signOut").attr("src",this.googleIMG);
      $(".GoogleBT").hide();
      $(".signOut").show();
    }else{
      $(".GoogleBT").show();
      $(".signOut").hide();
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
    $(".GoogleBT").show();
    $(".signOut").hide();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('profile');
    });
  }

}
