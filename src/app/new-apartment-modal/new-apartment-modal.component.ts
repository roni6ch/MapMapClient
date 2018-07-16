import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { HttpRequestsService } from '../services/http-requests.service';


@Component({
  selector: 'app-new-apartment-modal',
  templateUrl: './new-apartment-modal.component.html',
  styleUrls: ['./new-apartment-modal.component.scss']
})
export class NewApartmentModalComponent implements OnInit {


  @ViewChild('btnClose') btnClose : ElementRef 

  advancedFilters = [];

  constructor(private advancedFiltersJSON: AdvancedFilterService,private httpReq: HttpRequestsService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);
    
  }

  publishNewApartment(){
    //close the modal
    this.btnClose.nativeElement.click();
    let formData = {};
    this.httpReq.publishNewApartment(formData).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });

  }

}
