import {NgForm} from '@angular/forms';
import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ElementRef,
    ViewChild,
    NgZone
} from '@angular/core';
import {HttpRequestsService} from '../../services/http-requests.service';
import * as $ from 'jquery';
import {GoogleSignInSuccess} from 'angular-google-signin';
import { SharedService } from '../../services/shared.service';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {

    @Output() loggedIn = new EventEmitter();
    @ViewChild('btnClose')btnClose : ElementRef
    profile= {};
    constructor(private httpReq : HttpRequestsService, ngZone : NgZone , private shared : SharedService) {
        window['onSignIn'] = () => ngZone.run(() => this.onSignIn());

    }
    ngOnInit() {
      
    }

    //custom login
    onLoginSubmit(ngForm : NgForm) {
        var data = ngForm.form.value;
        this.httpReq.customLogin(data).subscribe(tokenId => {
                if (tokenId) {
                    console.log("customLogin succsess: ", tokenId);
                    this.shared.setUserProfile(data);
                    //todo - check if i get token from server?
                  //  this.httpReq.token.next(tokenId);
                    //close modal
                    this.btnClose.nativeElement.click();
                }
            });
    }

    //custom register
    onRegisterSubmit(ngForm : NgForm) {
        console.log(ngForm.form.value);
        var data = ngForm.form.value;
        this
            .httpReq
            .register(data)
            .subscribe(data => {
                console.log("register succsess: ", data);
                if (data) {
                    //close modal
                    this
                        .btnClose
                        .nativeElement
                        .click();
                    console.log(data);
                }
            });

    }
    //google sign in
    onSignIn() : void {
        if(gapi.auth2.getAuthInstance() !== undefined) {
            let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
            this.httpReq.login(token).subscribe(data => {
                    console.log('data' , data);
                    if (data){
                        this.shared.setUserProfile(data);
                        this.httpReq.setToken(data['token']);
                        //this.httpReq.httpOptions.headers['Authorization'] =   "JWT " + token; 
                        console.log('google user signed in.');
                        this.btnClose.nativeElement.click();
                    }
                })
        }
    }

}
