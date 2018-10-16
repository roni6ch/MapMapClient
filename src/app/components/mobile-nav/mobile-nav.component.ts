import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  @Output() signOutOutput = new EventEmitter();
  @Output() getApartmentsOutput = new EventEmitter();
  @Output() changeViewOutput = new EventEmitter();
  @Input() profile: any;
  @Input() connect: boolean;
  @Input() mobile: boolean;
  @Input() apartmentObj: any;
  
  view = '';
  nextView = '';

  constructor(private shared : SharedService) { }

  ngOnInit() {
    this.view = this.shared.viewObj.view;
    this.nextView = this.shared.viewObj.nextView;
    //todo: ask tomer to give me back name family and img + email
  }
  
  signOut(){
    this.signOutOutput.emit(true);
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
