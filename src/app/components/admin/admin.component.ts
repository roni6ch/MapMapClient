import { Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router,private shared : SharedService ) { 
  }

  ngOnInit() {

  }

  returnToMap(){
    this.shared.setViewObj('map');
    this.router.navigate(['']);
  }




}
