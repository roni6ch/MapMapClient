import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-admin-apartments',
  templateUrl: './admin-apartments.component.html',
  styleUrls: ['./admin-apartments.component.scss']
})
export class AdminApartmentsComponent implements OnInit {

  data;
  constructor(private httpReq: HttpRequestsService) { 
    this.data = [
      {address:'address address address',price:213,owner:'sdf'},
      {address:'address address',price:344,owner:'sdfsdf'},
      {address:'address',price:34234,owner:'fdg'},
      {address:'addressaddressaddressaddress',price:234,owner:'fgjhfg'},
    ]
  }

  ngOnInit() {
  }
  getAllNewAdminApartments(){
    //this.httpReq.getAllNewAdminApartments().subscribe(data => this.data = data);
  }
  adminDeleteApartment(apartment){
    console.log('delete: ',apartment);
    //this.httpReq.adminDeleteApartment().subscribe(data => this.data = data);
  }
  adminApproveApartment(apartment){
    console.log('delete: ',apartment);
  }

}
