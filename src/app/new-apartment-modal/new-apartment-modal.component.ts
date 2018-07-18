import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { HttpRequestsService } from '../services/http-requests.service';
import { Apartment } from '../apartment';
import * as $ from 'jquery';


@Component({
  selector: 'app-new-apartment-modal',
  templateUrl: './new-apartment-modal.component.html',
  styleUrls: ['./new-apartment-modal.component.scss']
})
export class NewApartmentModalComponent implements OnInit {


  @ViewChild('btnClose') btnClose: ElementRef

  advancedFilters = [];

  apartment: any;

  constructor(private advancedFiltersJSON: AdvancedFilterService, private httpReq: HttpRequestsService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);

    //apartment class must be initialize
    this.apartment = new Apartment("", "", 0, "", new Date(), "", {}, {});
  }
  addImagesToForm(images) {
    console.log('addImagesToForm: ', images);
    this.apartment['images'] = [];
    //todo: iterate over images
    this.apartment['images'].push(images);
  }
  publishNewApartment() {

    console.log(this.apartment);
    $.each(this.apartment.filters, function(key, value){
      if (value === "" || value === null || value === false){
        this.apartment.filters.splice(key, 1);
      }
    });
    console.log(this.apartment);
    

    //close the modal
    this.btnClose.nativeElement.click();
    console.log(this.apartment);
    this.httpReq.publishNewApartment(this.apartment).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });



  }


}
