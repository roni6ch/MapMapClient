import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { IApartments } from '../shared/iapartments';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  token:string = "";
  url = "https://mapmapserver.herokuapp.com";
  constructor(private http : HttpClient) { }

   httpOptions = {
    headers: {
      'Content-Type':  'application/json'
    }
  };
  
  //google login 
  login(tokenId:string){
    let url = `${this.url}/login/google`;
    let data = {
      "tokenId": tokenId
    }
    console.log("tokenId: ",data.tokenId);
    return this.http.post(url,data,this.httpOptions);
  }

  //custom register 
  register(user){
    let url = `${this.url}/register`;
    return this.http.post(url,user,this.httpOptions);
  }
  //custom login 
  customLogin(user){
    let url = `${this.url}/login/custom`;
    return this.http.post(url,user,this.httpOptions);
  }
  
  //add or remove apartment from favorites
  favoritesAddRemove(apartment_id,bool){
    let url = `${this.url}/apartments/` + apartment_id + `/favorite/` + bool;
    return this.http.put(url,null,this.httpOptions);
  }

  //get all favorites by filter
  getFavorites(){
    let url = `${this.url}/user/apartments/favorites`;
    return this.http.get(url,this.httpOptions);
  }

  //add or remove from black list
  blackListAddRemove(apartment_id,bool){
    let url = `${this.url}/apartments/` + apartment_id + `/blacklist/` + bool;
    return this.http.put(url,null,this.httpOptions);
  }
 //get all blacklist by filter
  getBlackList(){
    let url = `${this.url}/user/apartments/blacklist`;
    return this.http.get(url,this.httpOptions);
  }

   //set token when user connect's login
  setToken(token:string){
    this.token = token;
    this.httpOptions.headers['Authorization'] =   "JWT " + token;
  }
  //get apartments data
  getMarkers(data:any): Observable<IApartments[]>{
  //  let url = "../assets/result.json";
  //todo - send here all 5 parameters
    let url = `${this.url}/apartments`;
    return this.http.get<IApartments[]>(url, { params: data });
  }

  //get aprtment
  getApartmentData(id): Observable<IApartments[]>{
    let url = `${this.url}/apartments/` + id;
    return this.http.get<IApartments[]>(url,this.httpOptions);
  }
  //publish new apartment
  publishNewApartment(formData:any){
    let url = `${this.url}/apartments`;
    return this.http.post(url,formData,this.httpOptions);
  }
  //upload images
  uploadImages(files:any){
    let url = `${this.url}/uploadPicture`;
    let httpOptions = {
      headers: {
        'Authorization':  "JWT " + this.token
      }
    };
    return this.http.post(url,files,httpOptions);
  }
  //remove picture
  removePicture(files:any){
    let url = `${this.url}/removePicture`;
    return this.http.post(url,files,this.httpOptions);
  }
  //todo: open this insted of the top one
  getUserApartments(): Observable<IApartments[]>{
    let url = `${this.url}/user/apartments`;
    return this.http.get<IApartments[]>(url, this.httpOptions);
  }

  //delete apartment
  deleteApartment(apartment_id){
    let url = `${this.url}/deleteApartment`;
    var apartment = {
      'apartment_id':apartment_id
    }
    return this.http.post(url,apartment,this.httpOptions);
  }

  changeFilters(filters){
    let url = `${this.url}/changeFilters`;
    var filtersJSON = {  filters  }
    console.log(filtersJSON);
    //return this.http.post(url,filtersJSON,this.httpOptions);
  }
  
}

