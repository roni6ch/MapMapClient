import { Component, OnInit, Input } from '@angular/core';
import { google } from "google-maps";
import * as $ from 'jquery';
import { } from '../../../node_modules/protractor';
declare var google: google;

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {

  @Input() apartment: any;
  indicatorNumber = 0;
  constructor() { }

  ngOnInit() {}
  updateIndector(id: number) {
    console.log(id);
    this.indicatorNumber = id;
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('apartment') !== undefined && changes.apartment.currentValue.location !== undefined)
       this.panorama(changes.apartment.currentValue.location.latlng);
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
