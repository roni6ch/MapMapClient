import { Component, OnInit , EventEmitter , Output ,ElementRef,ViewChild} from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';
import * as $ from 'jquery';

import { GoogleSignInSuccess } from 'angular-google-signin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() logindata = new EventEmitter();
  private myClientId: string = '1030406172046-vlrntkrarjqaau9jbor61j1nqe4gtbja.apps.googleusercontent.com';
  constructor(private httpReq: HttpRequestsService) { }

  @ViewChild('btnClose') btnClose: ElementRef
  ngOnInit() {
  }

  googleConnect(){

    $(".abcRioButtonContentWrapper").click();
    this.btnClose.nativeElement.click();
  }
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    this.httpReq.login(googleUser.getAuthResponse().id_token).subscribe(data => {
      if (data) {
        this.logindata.emit(data);
      }
      else {
        this.logindata.emit(false);
      }
      }
    );
  }

}
