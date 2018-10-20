import { Component, OnInit, Input } from '@angular/core';
import { google } from "google-maps";
import { HttpRequestsService } from '../../../services/http-requests.service';
import { ApartmentsService } from '../../../services/apartments.service';
import { ActivatedRoute} from '@angular/router';
declare var google: google;
declare var FB: any;
declare var $:any;

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {

  apartment: any;
  indicatorNumber = 0;
  mobile = false;
  apartmentId : string;
  loggedIn;
  constructor(private httpReq: HttpRequestsService , private apartmentsService: ApartmentsService , route:ActivatedRoute) { 

    //fix for triggering the second time modal
    route.params.forEach(params => {
      this.getApartment();
      this.apartmentId = params.id;
    });
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      this.mobile = true;
  }
  getApartment(){
    this.apartment = this.apartmentsService.getApartment();
    //check for panorama if theres no images
    if (this.apartment.details.images.length == 0){
      this.panorama(this.apartment.location.coordinates);
    }
  }

  ngOnInit() {
    document.getElementById(this.apartmentId).click();
    this.httpReq.token.subscribe(data => {
      if (data !== ""){
          this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    });
   }
  updateIndector(id: number) {
    console.log(id);
    this.indicatorNumber = id;
  }


  calendar(apartment) {
    console.log(apartment);
    var calendar = {
      title: "MAPMAP - פגישה לדירה",
      info: apartment.details.info,
      location: apartment.details.address,
      owner: apartment.publisher.email
    }
    window.open("http://www.google.com/calendar/event?action=TEMPLATE&sprop=website:www.mapmap.co.il&text=" + calendar.title + "&location=" + calendar.location + "&details=" + calendar.info + "&add=" + calendar.owner, "MsgWindow", "width=800,height=800");
    return false;
  }

  shareFacebook(apartment) {
    console.log(apartment);
    //works only live
    var url = window.location.href;

    let date;
    if (apartment.details.entrance_date){
      date = new Date(apartment.details.entrance_date);
      date = date.toLocaleDateString();
    }
    var aDetails = {
      address : apartment.details.address,
      type : apartment.details.apartment_type,
      date : date,
      info : apartment.details.info,
      price : apartment.details.price,
      image: apartment.details.images.length > 0 ? apartment.details.images[0] : "https://res.cloudinary.com/sharedmoments/image/upload/v1533336239/MapMap/UploadImages/logo.png"
    }


    //TODO: CHANGE URL TO ID and check if it is work online
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': 'MapMap - ' + aDetails.address,
          'og:description': aDetails.type + " ,מחיר: " + aDetails.price + " כניסה: "  + aDetails.date + " מידע נוסף: " + aDetails.info,
          'og:image': aDetails.image
        }
      })
    })

  }
  sendWhatsapp(phone) {
    var data = {
      title: "הודעה חדשה מ-MAPMAP: ",
      content: "שלום ברצוני לבוא לראות את הדירה",
      info: "רוני, טלפון: 0502560005 , תודה!"
    }
    window.open("https://api.whatsapp.com/send?phone=" + (phone) + "&text=" + data.title + " " + data.content + " " + data.info);

  }
  sendMail(apartment) {
    var mail = {
      title: "הודעה חדשה מ  MAPMAP",
      content: "שלום ברצוני לבוא לראות את הדירה",
      emailTo: "Roni6ch@gmail.com",
      emailCC: "Roni691986@gmail.com",
      info: "רוני , טלפון 032434 ..."
    }
    window.open("mailto:" + mail.emailTo + '?cc=' + mail.emailCC + '&subject=' + mail.title + '&body=' + mail.content, '_self');

  }
  openWaze(apartment) {
    window.open('http://waze.to/?ll=' + apartment.location.coordinates[0] + ',' + apartment.location.coordinates[1] + '&navigate=yes');

  }
  print() {
    window.print();
  }

  markerHeart(event) {
//todo: fix to fav
    this.apartment.user.favorite = !this.apartment.user.favorite;
    var apartment_id = this.apartment._id;
    var favorite = this.apartment.user.favorite;

    console.log(" change fav to favorite: " ,this.apartment.user.favorite);
    //send favorite ajax
    this.httpReq.favoritesAddRemove(apartment_id,favorite).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });

    event.stopPropagation();
  }
  markerBlackList(event){
    //todo: fix to blacklist
    console.log(this.apartment);

    this.apartment.active = !this.apartment.active;
    var apartment_id = this.apartment._id;
    var blacklist = true;

    //send blackListAddRemove ajax
    this.httpReq.blackListAddRemove(apartment_id,blacklist).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });
    
    event.stopPropagation();
  }
  panorama(latLng) {
    var streetViewService = new google.maps.StreetViewService();
    var radius = 100;
    let latLngJSON = { lat : latLng[0] , lng : latLng[1]};
    streetViewService.getPanoramaByLocation(latLngJSON, radius, function (data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var lat = nearStreetViewLocation.lat();
        var lng = nearStreetViewLocation.lng();
        latLng = {
          lat: lat,
          lng: lng
        };
        //get google street image
        var panoramaOptions = {
          position: latLng,
          pov: {
            heading: 165,
            pitch: 0
          },
          visible: true,
          zoom: 1
        };
        setTimeout(function(){ new google.maps.StreetViewPanorama(document.getElementById('panorama'), panoramaOptions);});
      }
    });
  }
}
