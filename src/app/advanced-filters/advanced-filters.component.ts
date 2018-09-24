import { Component, OnInit, Output, EventEmitter, ViewChild , ElementRef } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { Filters } from '../filters';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import {  NgForm  } from '@angular/forms';
import { HttpRequestsService } from '../services/http-requests.service';

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent implements OnInit {

  advancedFilters = [];
  favFilterImg;
  imgFilterImg;
  blackListFilter;
  rangeConfig: any;

  filtersObj: any;


  @ViewChild('sliderRef') sliderRef;
  @ViewChild('btnClose') btnClose: ElementRef
  @Output() favoritesClick = new EventEmitter();
  @Output() filters = new EventEmitter();


  constructor(private advancedFiltersJSON: AdvancedFilterService,private httpReq: HttpRequestsService) {
    //init filters
    this.filtersObj = new Filters(false, {}, ["3000", "7000"], "all", 0, 0, 0, false);
    this.initFilters();
  }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => {
      this.advancedFilters = data;
    });
    var instances = M.FormSelect.init($("select"));
  }
  initFilters(){
    this.favFilterImg = false;
    this.imgFilterImg = false;
    this.blackListFilter = false;
    this.rangeConfig = {
      behaviour: 'drag',
      start: [3000, 7000],
      range: {
        'min': [1000],
        'max': [10000]
      },
      tooltips: [true, true],
      connect: [false, true, false],
      step: 500,
      keyboard: true,  // same as [keyboard]="true"
      animate: true,
  
    };
  }
  getFavorites(){
    //todo: check if it working
    this.favFilterImg = !this.favFilterImg;
    this.httpReq.getFavorites().subscribe(data => {
      if (data) {
        console.log(data)
      }
    });
  }
  getBlackList(){
    //todo: check if it working
    this.blackListFilter = !this.blackListFilter;
    this.httpReq.getBlackList().subscribe(data => {
      if (data) {
        console.log(data)
      }
    });
  }
  submitFilters() {
    this.filtersObj.favorites = this.favFilterImg;
    this.filtersObj.blackListFilter = this.blackListFilter;
    this.filtersObj.images = this.imgFilterImg;
    this.filtersObj.advanced_filters = this.advancedFilters.filter(obj => {
      return obj.filter;
    })
    this.filtersObj.range = this.sliderRef.slider.get();
    console.log(this.filtersObj);

    //HELP FOR NGCHANGE
    //https://stackoverflow.com/questions/46702410/ngonchange-not-called-when-value-change
    this.filtersObj.status = !this.filtersObj.status
    this.filtersObj = Object.assign({}, this.filtersObj);

    this.filters.emit(this.filtersObj);
    
    this.btnClose.nativeElement.click();
  }
}
