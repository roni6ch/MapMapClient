import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  @Output() getApartmentsOutput = new EventEmitter();
  @Output() changeViewOutput = new EventEmitter();
  profile = {};
  @Input() mobile: boolean;
  connect = true;
  
  view = '';
  nextView = '';

  constructor(private shared : SharedService,private httpReq:HttpRequestsService) { }

  ngOnInit() {
    this.httpReq.token.subscribe(data => {
      this.profile = this.shared.getUserProfile();
    })
    this.view = this.shared.viewObj.view;
    this.nextView = this.shared.viewObj.nextView;
  }
  
  getApartments(){
    this.getApartmentsOutput.emit(true);
  }
  changeView() {
    this.shared.setViewObj(this.view,this.nextView);
      this.view = this.shared.viewObj.view;
      this.nextView = this.shared.viewObj.nextView;
      this.changeViewOutput.emit(this.view);
  }

}
