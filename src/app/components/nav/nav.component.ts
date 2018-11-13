import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {HttpRequestsService} from '../../services/http-requests.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() logout = new EventEmitter();
  @Output() admin = new EventEmitter();
  @Input() search: boolean;
  @Input() mobile: boolean;
  profile = {}
  
  constructor( private shared : SharedService , private httpReq : HttpRequestsService) { 
  }

  ngOnInit() {
    this.httpReq.token.subscribe(data => {
      if (data !== ""){
          this.profile = this.shared.getUserProfile();
      }
      else{
        this.profile = {};
      }
    });

  }

  signOut(){
    this.logout.emit();
  }

  adminPanel(){
    this.admin.emit('admin');
  }

}
