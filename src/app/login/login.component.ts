import { NgForm } from '@angular/forms';
import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ElementRef,
    ViewChild
} from '@angular/core';
import {HttpRequestsService} from '../services/http-requests.service';
import * as $ from 'jquery';
import {AuthService} from "angular2-social-login";
import {GoogleSignInSuccess} from 'angular-google-signin';
@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {

    @Output()logindata = new EventEmitter();
    @Output()login = new EventEmitter();
    private myClientId : string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
    constructor(private httpReq : HttpRequestsService, public _auth : AuthService) {}

    @ViewChild('btnClose')btnClose : ElementRef
    ngOnInit() {
        //TODO: check if facebook connected and keep user image
    }

    onLoginSubmit(ngForm: NgForm){
      console.log(ngForm.form.value);
      var data = ngForm.form.value;
      this.httpReq.customLogin(data).subscribe(token => {
        console.log("customLogin succsess: ", token);
        if (token) {
          //close modal
          this.btnClose.nativeElement.click();
          console.log(token);
          //send token and change image
          
          this.logindata.emit(token);

        }
    });

    }
      onRegisterSubmit(ngForm: NgForm){
        console.log(ngForm.form.value);
        var data = ngForm.form.value;
        this.httpReq.register(data).subscribe(data => {
            console.log("register succsess: ", data);
            if (data) {
              //close modal
              this.btnClose.nativeElement.click();
              console.log(data);
            }
        });

    }
    googleConnect() {

        $(".abcRioButtonContentWrapper").click();
        this
            .btnClose
            .nativeElement
            .click();
    }
    onGoogleSignInSuccess(event : GoogleSignInSuccess) {
        let googleUser : gapi.auth2.GoogleUser = event.googleUser;
        this
            .httpReq
            .login(googleUser.getAuthResponse().id_token)
            .subscribe(data => {
                console.log("onGoogleSignInSuccess: ", data);
                if (data) {
                    this
                        .logindata
                        .emit(data);
                } else {
                    this
                        .logindata
                        .emit(false);
                }
            });
    }

    facebookSignIn(provider) {
        this
            ._auth
            .login(provider)
            .subscribe((data) => {
                console.log(data);
                this
                    .logindata
                    .emit(data);
                this
                    .btnClose
                    .nativeElement
                    .click();
                // user data name, image, uid, provider, uid, email, token (accessToken for
                // Facebook & google, no token for linkedIn), idToken(only for google)
            })
    }
    /*
  facebookLogout(){
    this._auth.logout().subscribe(
      (data)=>{
        //return a boolean value.
        this.logindata.emit(false);
        console.log(data);
      }
    )
  }*/

}
