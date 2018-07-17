import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { AdvancedFilterService } from '../services/advanced-filter.service';
import { HttpRequestsService } from '../services/http-requests.service';
import { Apartment } from '../Apartment';


@Component({
  selector: 'app-new-apartment-modal',
  templateUrl: './new-apartment-modal.component.html',
  styleUrls: ['./new-apartment-modal.component.scss']
})
export class NewApartmentModalComponent implements OnInit {


  @ViewChild('btnClose') btnClose : ElementRef 

  advancedFilters = [];

  apartment: any;

  constructor(private advancedFiltersJSON: AdvancedFilterService,private httpReq: HttpRequestsService) { }

  ngOnInit() {
    this.advancedFiltersJSON.getData().subscribe(data => this.advancedFilters = data);

    //apartment class must be initialize
    this.apartment = new Apartment("","",0,"",new Date(),"",[""],[null]);
  }

  publishNewApartment(){

    //todo - upload the images to 'https://mapmapserver.herokuapp.com/uploadPicture';

    //close the modal
    this.btnClose.nativeElement.click();
    console.log(this.apartment);
    this.httpReq.publishNewApartment(this.apartment).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });

    

  }
  changeFilter(filter){
console.log(filter);
  }


}
