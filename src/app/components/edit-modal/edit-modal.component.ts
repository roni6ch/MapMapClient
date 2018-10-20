import { Component, OnInit, ViewChild, ElementRef , Output ,Input, EventEmitter} from '@angular/core';
import { HttpRequestsService } from '../../services/http-requests.service';
import { ApartmentsService } from '../../services/apartments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  data = [];
  @ViewChild('editButtonModal') editButtonModal: ElementRef;

  @ViewChild('btnClose') btnClose: ElementRef;
  
  @Input() editApartments: any;
  
  @Input() connect: any;
  
  @Output() openEditOutput = new EventEmitter();
  constructor(private httpReq: HttpRequestsService ,   private router: Router,private apartmentsService : ApartmentsService) { }

  ngOnInit() {
    
    document.getElementById("editModalBT").click();
    this.httpReq.getUserApartments().subscribe(result => {
      console.log('edit user apartments!!! ' , result);
        this.data = result;
      });

  };

  deleteApartment(apartment_id,ev){
    ev.stopPropagation();
    this.httpReq.deleteApartment(apartment_id).subscribe(result => {
     console.log("deleted");
    });
  }
  openEditModalOutput(apartment) {
    this.btnClose.nativeElement.click();
    this.apartmentsService.setApartment(apartment);

   this.router.navigate(['/edit']);
  }

}