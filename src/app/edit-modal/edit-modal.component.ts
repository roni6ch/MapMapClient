import { Component, OnInit, ViewChild, ElementRef , Output , EventEmitter} from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';

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
    this.data = this.httpReq.getUserApartments();
  };


  openEditModalOutput(apartment) {
    this.btnClose.nativeElement.click();
    setTimeout(()=>{
      this.openEditOutput.emit(apartment);
    },1000);
  }

}