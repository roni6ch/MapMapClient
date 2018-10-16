import { Component, OnInit, EventEmitter, Output, Input, NgModule } from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';
import { FiltersPipe } from '../../pipes/filters.pipe';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [FiltersPipe]
})
export class TableComponent implements OnInit {
  @Input() latLng: any;
  //@Input() filtersInput: {};

  filtersArr;
  data = [];
  settings = {
    actions: false,
    columns: {
      address: {
        title: 'כתובת'
      },
      price: {
        title: 'מחיר',
        type: 'number'
      },
      apartment_type: {
        title: 'Type'
      },
      entrance_date: {
        title: 'תאריך',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data) {
            var currentDate = new Date(data); //use your date here
            return currentDate.toLocaleDateString('he-IL'); // "en-US" gives date in US Format - mm/dd/yy
          }
        },

      },
      rooms: {
        title: 'חדרים',
        type: 'number'
      }
    }
  };
  constructor(private httpReq: HttpRequestsService, private filterPipe: FiltersPipe) {
    console.log("table");
  }

  ngOnInit() {
    
  }
  filteredData = [];
  ngOnChanges(changes: any) {

    //send to pipe in order to filter the results on table
    if (changes.hasOwnProperty('filtersInput') !== undefined && changes.hasOwnProperty('filtersInput') !== false) {
      this.filtersArr = changes.filtersInput.currentValue;
      let boundsTemp = {
        lat: 32.056442,
        lng: 34.772238
      }
      //TODO: get all apartments and open filter ?
      //todo - get apartments from request
      this.httpReq.getMarkers(boundsTemp).subscribe(result => {
       // let filteredData = this.filterPipe.transform(result, this.filtersArr);
       // this.mapData();
      });
    }
  }
  //map data to smart table view
  mapData(data) {
    this.data = data.map(a => ({
      favorites: a['user']['favorite'],
      address: a['details']['address'],
      price: a['details']['price'],
      apartment_type: a['details']['apartment_type'] == undefined || a['details']['apartment_type'] == "" ? "דירה" : a['details']['apartment_type'],
      entrance_date: a['details']['entrance_date'],
      floor: a['details']['floor'],
      toilets: a['details']['toilets'],
      images: a['details']['images'].length > 0,
      rooms: a['details']['rooms'],
      filters: a['filters']
    }));
  }
  markerHeart(e) {
    console.log(e);
  }

}
/*
settings = {
    actions: false,
    columns: {
      location:{
        address: {
          title: 'Address'
        }
      },
      details:{
        price: {
          title: 'Price',
          type: 'number'
        },
        apartment_type: {
          title: 'Type'
        },
        entrance_date: {
          title: 'Date',
          type: 'html',
          valuePrepareFunction: (data) => { 
            if (data){
              var currentDate = new Date(data); //use your date here
              return currentDate.toLocaleDateString('he-IL'); // "en-US" gives date in US Format - mm/dd/yy
            }
          },
        },
        rooms: {
          title: 'Rooms',
          type: 'number'
        }
      },
    }
  };
  */