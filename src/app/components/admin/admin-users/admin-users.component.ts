import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
data;
  constructor(private httpReq: HttpRequestsService) {
    this.data = [
      {address:'address address address',mail:'vvv@wdfsf',owner:'sdf'},
      {address:'address address',mail:'aaa@df.com',owner:'sdfsdf'},
      {address:'address',mail:'ffffff@wdfewf.com',owner:'fdg'},
      {address:'addressaddressaddressaddress',mail:'ccccccc@sdfs.com',price:234,owner:'fgjhfg'},
    ]
  }

  ngOnInit() {
  }
  adminDeleteUser(user){
    console.log('delete: ',user);
  }
  adminApproveUser(user){
    console.log('approve: ',user);
  }
}
