import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';


@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent implements OnInit {

  advancedFilters = [];
  favFilterImg = false;
  @Output() favoritesClick = new EventEmitter();

  rangeConfig: any = {
    behaviour: 'drag',
    start: [3000, 7000],
    range: {
      'min': [ 1000 ],
      'max': [ 10000 ]
    },
    tooltips:[ true, true ],
    connect: [false, true, false],
    step: 500,
    keyboard: true,  // same as [keyboard]="true"
    animate: true,
    
  };
  
  constructor(private advancedFiltersJSON: AdvancedFilterService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => {
      this.advancedFilters = data;
    });
  }

  changeFilter(filter){
    console.log(filter);
  }
  toggleFavoriteApartment(){
    this.favFilterImg = !this.favFilterImg;
    this.favoritesClick.emit(this.favFilterImg);
    
  }
}
