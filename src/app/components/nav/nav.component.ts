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
  @Output() view = new EventEmitter();
  @Output() getApartmentsOutput = new EventEmitter();
  @Input() mobile: boolean;
  loggedIn: boolean;
  viewObj = {
    view : '',
    nextView : ''
    };
  profile = {};
  search = false;
  
  
  constructor( private shared : SharedService , private httpReq : HttpRequestsService) {  
    this.shared.viewObj.subscribe(data => this.viewObj = data);
  }

  ngOnInit() {
    this.httpReq.token.subscribe(data => {
      if (data !== ""){
          this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    });
    
   
    this.httpReq.token.subscribe(data => {
      if (data !== ""){
          this.profile = this.shared.getUserProfile();
      }
      else{
        this.profile = {};
      }
    });

    this.shared.search.subscribe(data => {
      this.search = data
    });

  }

  signOut(){
    this.logout.emit();
  }

  adminPanel(){
    this.viewObj = {view : 'admin' , nextView : 'אדמין'};
    this.changeView();
  }

  getApartments(){
    this.getApartmentsOutput.emit(true);
  }

  changeView() {
    this.shared.setViewObj(this.viewObj.view);
  }

}
