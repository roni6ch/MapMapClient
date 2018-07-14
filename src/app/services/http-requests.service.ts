import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  login(google_user_id:string){
    let url = "https://mapmapserver.herokuapp.com/login";
    let data = {
      "google_user_id": google_user_id
      ,"login_type": "google"
    }
    return this.http.post(url,data,this.httpOptions);
  }
}




