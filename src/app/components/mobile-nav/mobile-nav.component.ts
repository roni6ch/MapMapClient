import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';

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
  

  constructor() { }

  ngOnInit() {
    //todo: ask tomer to give me back name family and img + email
  }
  
  signOut(){
    this.signOutOutput.emit(true);
  }
  getApartments(){
    this.getApartmentsOutput.emit(true);
  }
  changeView(){
    this.changeViewOutput.emit(true);
  }

}
