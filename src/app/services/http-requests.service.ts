import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { IApartments } from '../iapartments';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  token:string = "";
  constructor(private http : HttpClient) { }

   httpOptions = {
    headers: {
      'Content-Type':  'application/json'
    }
  };
  
  login(google_user_id:string){
    let url = "https://mapmapserver.herokuapp.com/login/google";
    let data = {
      "google_user_id": google_user_id
    }
    return this.http.post(url,data,this.httpOptions);
  }

  register(user){
    let url = "https://mapmapserver.herokuapp.com/register";
    //----PASSWORD VALIDATIONS----
    // Minimum length 8
    // Maximum length 15
    // Must have uppercase letters
    // Must have lowercase letters
    // Must have digits
    // Should not have spaces
    return this.http.post(url,user,this.httpOptions);
  }
  customLogin(user){
    let url = "https://mapmapserver.herokuapp.com/login/custom";
    return this.http.post(url,user,this.httpOptions);
  }

  
  favoritesAddRemove(apartment_id,bool){
    let url = "https://mapmapserver.herokuapp.com/apartments/" + apartment_id + "/favorite/" + bool;
    return this.http.put(url,this.httpOptions);
  }

  getFavorites(){
    let url = "https://mapmapserver.herokuapp.com/apartments/favorites";
    return this.http.get(url,this.httpOptions);
  }

  blackListAddRemove(apartment_id,bool){
    let url = "https://mapmapserver.herokuapp.com/apartments/" + apartment_id + "/blacklist/" + bool;
    return this.http.put(url,this.httpOptions);
  }

  getBlackList(){
    let url = "https://mapmapserver.herokuapp.com/apartments/blacklist";
    return this.http.get(url,this.httpOptions);
  }


  deleteApartment(apartment_id){
    let url = "https://mapmapserver.herokuapp.com/deleteApartment";
    var apartment = {
      'apartment_id':apartment_id
    }
    return this.http.post(url,apartment,this.httpOptions);
  }

  





  setToken(token:string){
    this.token = token;
    this.httpOptions.headers['Authorization'] =   "JWT " + token;
  }
  getData(data:any): Observable<IApartments[]>{
  //  let url = "../assets/result.json";
    let url = "https://mapmapserver.herokuapp.com/apartments";
    return this.http.get<IApartments[]>(url, { params: data });
  }
  publishNewApartment(formData:any){
    let url = "https://mapmapserver.herokuapp.com/apartments";
    let data = formData;
    return this.http.post(url,data,this.httpOptions);
  }
  uploadImages(files:any){
    let url = "https://mapmapserver.herokuapp.com/uploadPicture";
    let httpOptions = {
      headers: {
        'Authorization':  "JWT " + this.token
      }
    };
    return this.http.post(url,files,httpOptions);
  }
  removePicture(files:any){
    let url = "https://mapmapserver.herokuapp.com/removePicture";
    return this.http.post(url,files,this.httpOptions);
  }
  getUserApartments(){
    let url = "https://mapmapserver.herokuapp.com/getUserApartments";
    return userApartmentTempData;
  // return this.http.post(url,{},this.httpOptions);
  }
}




var userApartmentTempData = [
  {
    "id": "1",
    "user": {
      "favorite": false,
      "black_list": false
    },
    "publisher": {
      "name": "",
      "email": "",
      "phones": [
        "9720502560005",
        "9720547552782"
      ],
      "type":"broker"
    },
    "location": {
      "address": "Florentin, תל אביב יפו, ישראל",
      "latlng": {
        "lat": 32.056442,
        "lng": 34.772238000000016
      }
    },
    "details": {
      "apartment_type": "יחידת דיור",
      "rooms": 5,
      "size": 80,
      "floor": 2,
      "toilets": 2,
      "info": "SDfdsf",
      "price": 4000,
      "entrance_date": new Date(),
      "images": [
        "https://cdn.cliqueinc.com/posts/212361/-2030969-1483470364.640x0c.jpg",
        "https://media.architecturaldigest.com/photos/58d535e3e34bbc355f09b0a7/master/w_768/modern-living-room-mac-ii-new-york-new-york-201208-4_1000-watermarked.jpg",
        "https://room-matehotels.com/images/img/oscar/rooms.jpg",
        "https://www.citrus11sukhumvit.com/en/gallery/cozy/cozy-1.jpg"
      ]
    },
    "filters": {
      "parking": true,
      "balcony": true,
      "mamad": true,
      "elevator": true,
      "air_conditioner": true,
      "tama": true,
      "reconditioned": true,
      "bars": true,
      "master_room": true,
      "storage": true,
      "gym": false,
      "furniture": false,
      "pets": false,
      "roommates": false,
      "immediate_entrance": false
    }
  },
  {
    "id": "2",
    "user": {
      "favorite": true,
      "black_list": true,
    },
    "publisher": {
      "name": "gonzo",
      "email": "22dd@dfsd.com",
      "phones": [
        "9720502560000",
        "9720547552222"
      ],
      "type":"private"
    },
    "location": {
      "address": "Frishman, תל אביב יפו, ישראל",
      "latlng": {
        "lat": 32.0797543,
        "lng": 34.77358579999998
      }
    },
    "details": {
      "apartment_type": "סטודיו",
      "rooms": 2,
      "size": 90,
      "floor": 3,
      "toilets": 4,
      "info": "sdfsdfsdfsdfsdf",
      "price": 3500,
      "entrance_date": new Date(),
      "images": [
        "https://room-matehotels.com/images/img/oscar/rooms.jpg",
        "https://www.citrus11sukhumvit.com/en/gallery/cozy/cozy-1.jpg"
      ]
    },
    "filters": {
      "parking": false,
      "balcony": true,
      "mamad": false,
      "elevator": true,
      "air_conditioner": true,
      "tama": true,
      "reconditioned": false,
      "bars": true,
      "master_room": true,
      "storage": true,
      "gym": false,
      "furniture": false,
      "pets": true,
      "roommates": true,
      "immediate_entrance": false
    }
  }
];


