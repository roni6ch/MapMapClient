import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() latLng: any;
  apartments = [];
  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit() {
    let boundsTemp = {
      lat: 32.056442,
      lng: 34.772238
    }
    this.httpReq.getData(boundsTemp).subscribe(data => { this.apartments = data; console.log('table',data); });

  }

}
