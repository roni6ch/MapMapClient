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

  constructor(private advancedFiltersJSON: AdvancedFilterService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => {
      this.advancedFilters = data;
    });
  }

  filtersArrOutput = [];
  changeFilter(filter) {
      console.log(filter);

      this.advancedFilters.forEach((f, i,advancedFilters) =>  {
        if (filter.name == f.name && !filter.filter){
          advancedFilters[i].filter = !advancedFilters[i].filter;
          this.filtersArrOutput.push(filter);
          //https://stackoverflow.com/questions/46702410/ngonchange-not-called-when-value-change
          this.filtersArrOutput = this.filtersArrOutput.slice();
          this.filters.emit(this.filtersArrOutput);
          return;
        }
        else if (filter.name == f.name && filter.filter){
          advancedFilters[i].filter = !advancedFilters[i].filter;
          this.filtersArrOutput = this.filtersArrOutput.filter(obj => {
            return obj.name !== filter.name
          })
          this.filtersArrOutput = this.filtersArrOutput.slice();
          this.filters.emit(this.filtersArrOutput);
          return;
        }
      }, this);

  }
  toggleFavoriteApartment() {
    this.favFilterImg = !this.favFilterImg;
    this.favoritesClick.emit(this.favFilterImg);

  }
}
