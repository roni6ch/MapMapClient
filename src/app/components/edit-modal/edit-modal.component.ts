import { Component, OnInit, ViewChild, ElementRef , Output ,Input, EventEmitter} from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';
import { IApartments } from '../../shared/iapartments';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  data = [];

  @ViewChild('btnClose') btnClose: ElementRef;
  @Output() openEditOutput = new EventEmitter();
  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit() {
    this.httpReq.getUserApartments().subscribe(result => {
      this.data = result;
    });
   // this.data  = this.httpReq.getUserApartments();
  };

  deleteApartment(apartment_id,ev){
    ev.stopPropagation();
    this.httpReq.deleteApartment(apartment_id).subscribe(result => {
     console.log("deleted");
    });
  }
  openEditModalOutput(apartment) {
    this.btnClose.nativeElement.click();
    setTimeout(()=>{
      this.openEditOutput.emit(apartment);
    },1000);
  }

}