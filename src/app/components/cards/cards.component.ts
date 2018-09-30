import { Component, OnInit ,Input} from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';
import { FiltersPipe } from '../../pipes/filters.pipe';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() filtersInput: {};
  constructor(private httpReq: HttpRequestsService, private filterPipe: FiltersPipe) { }

  ngOnInit() {
    let boundsTemp = {
      lat: 32.056442,
      lng: 34.772238
    }
        //TODO: get all apartments in israel
        this.httpReq.getMarkers(boundsTemp).subscribe(result => {
          this.filteredData = this.filterPipe.transform(result, this.filtersArr);
        });
  }
  filtersArr = [];
  filteredData = [];
  ngOnChanges(changes: any) {

    //send to pipe in order to filter the results on table
    if (changes.hasOwnProperty('filtersInput') !== undefined && changes.hasOwnProperty('filtersInput') !== false) {
      this.filtersArr = changes.filtersInput.currentValue;
      let boundsTemp = {
        lat: 32.056442,
        lng: 34.772238
      }
      //TODO: get all apartments in israel
      this.httpReq.getMarkers(boundsTemp).subscribe(result => {
        this.filteredData = this.filterPipe.transform(result, this.filtersArr);
      });
    }
  }
}
