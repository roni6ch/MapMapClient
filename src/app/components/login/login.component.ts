import {NgForm} from '@angular/forms';
import {   Component,   OnInit,  EventEmitter,   Output,  ElementRef,    ViewChild  , NgZone } from '@angular/core';
import {HttpRequestsService} from '../../services/http-requests.service';
import * as $ from 'jquery';
import {GoogleSignInSuccess} from 'angular-google-signin';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {

    @Output() logindata = new EventEmitter();
    @ViewChild('btnClose') btnClose : ElementRef
    private myClientId : string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';

    constructor(private httpReq : HttpRequestsService ,ngZone: NgZone ) {
        window['onSignIn'] = () => ngZone.run(() => this.onSignIn());

    }
    ngOnInit() { }

    //custom login
    onLoginSubmit(ngForm : NgForm) {
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

    //custom register
    onRegisterSubmit(ngForm : NgForm) {
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

    //click on google-sign-in button
    googleConnect() {
        $("#google-signin2 .abcRioButtonContentWrapper").click();
        this.btnClose.nativeElement.click();
    }

    //google button event
    onGoogleSignInSuccess(event : GoogleSignInSuccess) {
        let googleUser : gapi.auth2.GoogleUser = event.googleUser;
        this.httpReq.login(googleUser.getAuthResponse().id_token).subscribe(data => {
                console.log("onGoogleSignInSuccess: ", data);
                if (data) {
                    this.logindata.emit(data);
                } else {
                    this.logindata.emit(false);
                }
        });
    }


   
    onSignIn():void {
        if (gapi.auth2.getAuthInstance() !== undefined){
        let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        this.httpReq.login(token).subscribe(data => {
                console.log("onSignIn: ", data);
                if (data) {
                    this.logindata.emit(data);
                } else {
                    this.logindata.emit(false);
                }
                this.btnClose.nativeElement.click();
        });
    }
      }
      signOut():void {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
      
}
