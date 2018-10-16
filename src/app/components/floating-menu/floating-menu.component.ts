import { Component, OnInit , Output , EventEmitter , Input , ViewChild , ElementRef} from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {

  @ViewChild('apartmentModal') apartmentModal: ElementRef;
  @Output() getApartmentsOutput = new EventEmitter();
  @Output() changeViewOutput = new EventEmitter();
  @Output() apartmentModalOutput = new EventEmitter();
  @Input() connect: boolean;
  @Input() mobile: boolean;
  @Input() apartmentObj: any;
  
  view = '';
  nextView = '';
  constructor(private shared : SharedService) { }

  ngOnInit() {
    this.view = this.shared.viewObj.view;
    this.nextView = this.shared.viewObj.nextView;
    this.apartmentModalOutput.emit(this.apartmentModal);
    M.FloatingActionButton.init($('.fixed-action-btn'));
  }

  getApartments(){
    this.getApartmentsOutput.emit(true);
  }
    //change view
    changeView() {
      this.shared.setViewObj(this.view,this.nextView);
      this.view = this.shared.viewObj.view;
      this.nextView = this.shared.viewObj.nextView;
      this.changeViewOutput.emit(this.view);
    }

}
