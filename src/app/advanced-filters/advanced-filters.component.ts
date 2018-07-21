import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { Filters } from '../filters';
import * as $ from 'jquery';


@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent implements OnInit {

  advancedFilters = [];
  filtersObj:any;
  favFilterImg = false;
  @ViewChild('sliderRef') sliderRef;
  @Output() favoritesClick = new EventEmitter();
  @Output() filters  = new EventEmitter();

  rangeConfig: any = {
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

  constructor(private advancedFiltersJSON: AdvancedFilterService) {
    //init filters
    this.filtersObj = new Filters(false, {} ,["3000","7000"]);
   }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => {
      this.advancedFilters = data;
    });
  }
  toggleFavoriteApartment() {
    this.favFilterImg = !this.favFilterImg;
    this.favoritesClick.emit(this.favFilterImg);
  }
  submitFilters(){
    this.filtersObj.favorites = this.favFilterImg;
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
  }
}
