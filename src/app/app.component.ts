import { Component, ElementRef, NgZone, ViewChild, OnInit , Output , EventEmitter , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApartmentsService } from './services/apartments.service';
import { HttpRequestsService } from './services/http-requests.service';
import { SharedService } from './services/shared.service';
import { MapsAPILoader } from '@agm/core';
import { google } from "google-maps";
import * as $ from 'jquery';
import * as M from 'materialize-css';
declare var google: google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Output() checkLoginStatus = new EventEmitter();

  @ViewChild('searchRef') searchRef: ElementRef;
  

  mobile = false;
  search = true;
  cardsView = false;
  scriptLoaded = false;
  showMap = true;
  connect = false;
  apartmentsResults = 0;
  filtersInput = [];
  editApartments = [];
  profile = {};
  view = 'map';
  

  constructor(private mapsAPILoader: MapsAPILoader,   private router: Router, private apartmentService : ApartmentsService,
    private ngZone: NgZone, private http: HttpClient, private httpReq: HttpRequestsService , private shared : SharedService) {
      this.router.navigate(['']);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      this.mobile = true;
  }

  ngOnInit() {
    //login listener
    this.httpReq.token.subscribe(token => {
      if (token !== ""){
        this.showLoginBT(false);
        M.Tooltip.init($(".tooltipped"));
      }
    })
    M.Sidenav.init($('.sidenav'));
    setTimeout(() => {
      this.searchRef.nativeElement.focus();
    }, 200);
  }
  logout(){
    let that = this;
    gapi.auth2.getAuthInstance().signOut().then(function () {
      that.httpReq.token.next('');
      that.showLoginBT(true);
      console.log('google user signed out.');
  });
  }

    //show login button or image
    showLoginBT(bool: boolean) {
      if (bool) {
        //show login
        this.connect = true;
        $(".googleBT").show();
        $(".signOut").hide();
      }
      else {
        //show profile
        console.log( this.profile);
        this.connect = false;
        $(".googleBT").hide();
        $(".signOut").show();
        $(".signOut").attr("src", this.profile['picture']);
        $(".name").html(this.profile['given_name'] + this.profile['family_name']);
        $(".email").html(this.profile['email']);
      }
      console.log("connect (true means - show login button): " , this.connect);
    }

  //load Places Autocomplete
  initAutoComplete(search) { 
    this.searchRef = search;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchRef.nativeElement, {
        types: ["(cities)"]
        //types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let latLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          this.search = false;
          this.shared.coordinates.next(latLng);
          console.log("coordinates: " , latLng);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }


  //get all marker's filters from modal
  filtersInputFunc(filtersInput) {
    this.filtersInput = filtersInput;
  }
  //markers length
  apartmentsResultsInput(apartmentsResultsInput) {
    this.apartmentsResults = apartmentsResultsInput;
  }


  changeView(view){
    this.view = view;
  }
  //edit user apartments
  getApartments(){
    if (!this.connect) //connected
    this.httpReq.getUserApartments().subscribe(result => {
    console.log('edit user apartments ' , result);
      this.editApartments = result;
    });
  }
  removeBlur(){
    this.search = false;
  }
}
