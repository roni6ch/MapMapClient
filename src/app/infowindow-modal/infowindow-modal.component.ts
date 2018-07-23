import { Component, OnInit , Input } from '@angular/core';
import { google } from "google-maps";
import * as $ from 'jquery';
import { } from '../../../node_modules/protractor';
declare var google : google;

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {
  
  @Input() apartment: any; 
  indicatorNumber = 0;
  constructor() { }

  ngOnInit() {
   // this.panorama();
   // this.panorama2();
  }
  updateIndector(id:number){
    console.log(id);
    this.indicatorNumber = id;
  }
  


panorama2(){
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      position: {lat: 32.08310847156331, lng: 34.79660164206189},
      pov: {
        heading: 270,
        pitch: 0
      },
      visible: true
}); panorama.addListener('pano_changed', function() {
  var panoCell = document.getElementById('pano-cell');
  panoCell.innerHTML = panorama.getPano();
});

panorama.addListener('links_changed', function() {
  var linksTable = document.getElementById('links_table');
  while (linksTable.hasChildNodes()) {
    linksTable.removeChild(linksTable.lastChild);
  }
  var links = panorama.getLinks();
  for (var i in links) {
    var row = document.createElement('tr');
    linksTable.appendChild(row);
    var labelCell = document.createElement('td');
    labelCell.innerHTML = '<b>Link: ' + i + '</b>';
    var valueCell = document.createElement('td');
    valueCell.innerHTML = links[i].description;
    linksTable.appendChild(labelCell);
    linksTable.appendChild(valueCell);
  }
});

panorama.addListener('position_changed', function() {
  var positionCell = document.getElementById('position-cell');
  positionCell.firstChild.nodeValue = panorama.getPosition() + '';
});

panorama.addListener('pov_changed', function() {
  var headingCell = document.getElementById('heading-cell');
  var pitchCell = document.getElementById('pitch-cell');
  headingCell.firstChild.nodeValue = panorama.getPov().heading + '';
  pitchCell.firstChild.nodeValue = panorama.getPov().pitch + '';
});

}
  panorama(){
    var lat = 32.08310847156331;
    var lng = 34.79660164206189;

    var latLng = {lat: 32.08310847156331, lng: 34.79660164206189};

    var map = $("#map");
  //todo: WHERE TO LOOK STREET VIEW https://stackoverflow.com/questions/16443241/google-maps-api-streetview-panoramaoptions-point-of-view-setting-from-lon-lat
  //var whereToLookLatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

  var streetViewService = new google.maps.StreetViewService();
  var radius = 100;
  streetViewService.getPanoramaByLocation(latLng, radius, function(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          lat = nearStreetViewLocation.lat();
          lng = nearStreetViewLocation.lng();
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

          var panorama = new google.maps.StreetViewPanorama(document.getElementById('modalImage'), panoramaOptions);
          map.setStreetView(panorama);

      } else {
         // console.log('a');
      }
  });
} 

}
