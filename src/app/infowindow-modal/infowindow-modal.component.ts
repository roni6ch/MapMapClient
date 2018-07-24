import { Component, OnInit, Input } from '@angular/core';
import { google } from "google-maps";
import * as $ from 'jquery';
import { } from '../../../node_modules/protractor';
import { HttpRequestsService } from '../services/http-requests.service';
declare var google: google;

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {

  @Input() apartment: any;
  indicatorNumber = 0;
  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit() {}
  updateIndector(id: number) {
    console.log(id);
    this.indicatorNumber = id;
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('apartment') !== undefined && changes.apartment.currentValue.location !== undefined)
       this.panorama(changes.apartment.currentValue.location.latlng);
  }

  calendar(apartment){
    console.log(apartment);
    var calendar = {
      title: "MAPMAP - פגישה לדירה",
      info: apartment.details.info,
      location: apartment.location.address,
      owner: apartment.publisher.email
  }
  window.open("http://www.google.com/calendar/event?action=TEMPLATE&sprop=website:www.mapmap.co.il&text=" + calendar.title + "&location=" + calendar.location + "&details=" + calendar.info + "&add=" + calendar.owner, "MsgWindow", "width=800,height=800");
  return false;
  }

  shareFacebook(apartment){
    console.log(apartment);
       //works only live
       var url = window.location.href;
       //TODO: CHANGE URL TO ID
      /* FB.ui({
           method: 'share_open_graph',
           action_type: 'og.shares',
           action_properties: JSON.stringify({
               object: {
                   'og:url': url,
                   'og:title': 'MapMap - ' + apartment.apartment.location,
                   'og:description': apartment.apartment.apartmentType + " כניסה: " + apartment.apartment.entrence_date + " מידע נוסף: " + apartment.apartment.info,
                   'og:image': apartment.images[0]
               }
           })
       })*/

  }

  markerHeart(event){
    this.apartment.user.favorite = !this.apartment.user.favorite;
    // TODO: change sendData user id
    let sendData = {
      user_id:this.apartment,
      apartment_id:this.apartment.id,
      favorite : this.apartment.user.favorite
    }
    //send favorite ajax
    this.httpReq.favorite(sendData).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });
    
    event.stopPropagation();
  }
  panorama(latLng) {
    var streetViewService = new google.maps.StreetViewService();
    var radius = 100;
    streetViewService.getPanoramaByLocation(latLng, radius, function (data, status) {
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
        var panorama = new google.maps.StreetViewPanorama(document.getElementById('panorama'), panoramaOptions);
      } 
    });
  }
}
