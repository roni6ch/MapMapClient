import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {HttpRequestsService} from '../../../services/http-requests.service';
import {ApartmentsService} from '../../../services/apartments.service';
import { Router } from '@angular/router';

@Component({selector: 'app-infowindow', templateUrl: './infowindow.component.html', styleUrls: ['./infowindow.component.scss']})
export class InfowindowComponent implements OnInit {

    @Input()apartment : any;
    @Output()apartmentOBJ = new EventEmitter();

    constructor(private httpReq : HttpRequestsService, private apartmentsService : ApartmentsService,   private router: Router) {}
    markerHeart(event) {
        console.log(this.apartment);
        this.apartment.user.favorite = !this.apartment.user.favorite;
        var apartment_id = this.apartment._id;
        var favorite = this.apartment.user.favorite;
        //send favorite ajax
        this
            .httpReq
            .favoritesAddRemove(apartment_id, favorite)
            .subscribe(data => {
                if (data) {
                    console.log(data)
                }
            });

        event.stopPropagation();
    }
    markerBlackList(event) {
        console.log(this.apartment);

        this.apartment.active = !this.apartment.active;
        var apartment_id = this.apartment._id;
        var blacklist = true;

        //send blackListAddRemove ajax
        this
            .httpReq
            .blackListAddRemove(apartment_id, blacklist)
            .subscribe(data => {
                if (data) {
                    console.log(data)
                }
            });

        event.stopPropagation();
    }
    ngOnInit() {}

    infoWindowClick(id) {
        this
            .apartmentsService
            .setApartment(this.apartment);
            this.router.navigate(["/infowindow/" + id]);
    }

}
