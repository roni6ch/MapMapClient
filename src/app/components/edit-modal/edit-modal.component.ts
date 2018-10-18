import { Component, OnInit, ViewChild, ElementRef , Output ,Input, EventEmitter} from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  data = [];

  @ViewChild('btnClose') btnClose: ElementRef;
  
  @Input() editApartments: any;
  
  @Input() connect: any;
  
  @Output() openEditOutput = new EventEmitter();
  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit() {
  };

  ngOnChanges(changes: any) {

    this.httpReq.getUserApartments().subscribe(result => {
      console.log('edit user apartments!!! ' , result);
        this.data = result;
      });
    //send to pipe in order to filter the results on map
    if (changes.hasOwnProperty('editApartments') !== undefined && !this.connect){
      this.data =  this.editApartments;
    }
  }

  deleteApartment(apartment_id,ev){
    ev.stopPropagation();
    this.httpReq.deleteApartment(apartment_id).subscribe(result => {
     console.log("deleted");
    });
  }
  openEditModalOutput(apartment) {
    this.btnClose.nativeElement.click();
    this.openEditOutput.emit(apartment);
  }

}