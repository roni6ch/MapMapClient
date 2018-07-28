import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { IApartments } from '../iapartments';

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
  
  getData(data:any): Observable<IApartments[]>{
  //  let url = "../assets/result.json";
    let url = "https://mapmapserver.herokuapp.com/getApartments";
    return this.http.post<IApartments[]>(url, { params: data });
  }

  login(google_user_id:string){
    let url = "https://mapmapserver.herokuapp.com/login";
    let data = {
      "google_user_id": google_user_id
      ,"login_type": "google"
    }
    return this.http.post(url,data,this.httpOptions);
  }
  publishNewApartment(formData:any){
    let url = "https://mapmapserver.herokuapp.com/addApartment";
    let data = formData;
    return this.http.post(url,data,this.httpOptions);
  }
  uploadImages(files:any){
   
    let url = "https://mapmapserver.herokuapp.com/uploadPicture";
    return this.http.post(url,files);
  }
  removePicture(files:any){
   
    let url = "https://mapmapserver.herokuapp.com/removePicture";
    return this.http.post(url,files);
  }
  favorite(data:any){
    let url = "https://mapmapserver.herokuapp.com/favorite";
    return this.http.post(url,data);
  }
}




