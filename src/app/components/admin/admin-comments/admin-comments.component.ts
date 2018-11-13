import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
data;
  constructor(private httpReq: HttpRequestsService) { 
    this.data = [
      {address:'address address address',comment:'vvv',owner:'sdf'},
      {address:'address address',comment:'aaa',owner:'sdfsdf'},
      {address:'address',comment:'ffffff',owner:'fdg'},
      {address:'addressaddressaddressaddress',comment:'ccccccc',price:234,owner:'fgjhfg'},
    ]
  }

  ngOnInit() {
  }

  adminDeleteComment(apartment){
    console.log('delete: ',apartment);
  }
  adminApproveComment(apartment){
    console.log('approve: ',apartment);
  }

}
