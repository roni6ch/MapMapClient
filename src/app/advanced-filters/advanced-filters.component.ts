import { Component, OnInit } from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent implements OnInit {

  advancedFilters = [];
  favFilterImg = "favorite";
  
  constructor(private advancedFiltersJSON: AdvancedFilterService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);
  }
  changeFilter(filter){
    console.log(filter);
  }
  filterFavorites(){}
}
