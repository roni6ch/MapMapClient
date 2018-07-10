import { Component, OnInit } from '@angular/core';
import { AdvancedFilterService } from '../advanced-filter.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-new-apartment-modal',
  templateUrl: './new-apartment-modal.component.html',
  styleUrls: ['./new-apartment-modal.component.scss']
})
export class NewApartmentModalComponent implements OnInit {



  advancedFilters = [];

  constructor(private advancedFiltersJSON: AdvancedFilterService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);
    
  }

}
