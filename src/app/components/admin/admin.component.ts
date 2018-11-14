import { Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private shared : SharedService ) { 
  }

  ngOnInit() {

  }



}
