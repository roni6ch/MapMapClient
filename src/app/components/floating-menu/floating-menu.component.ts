import { Component, OnInit , Output , EventEmitter , Input , ViewChild , ElementRef} from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import { SharedService } from '../../services/shared.service';
import {HttpRequestsService} from '../../services/http-requests.service';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {

  @ViewChild('apartmentModal') apartmentModal: ElementRef;
  @ViewChild('editApartments') editApartments: ElementRef;
  
  @Output() getApartmentsOutput = new EventEmitter();
  @Output() changeViewOutput = new EventEmitter();
  @Output() apartmentModalOutput = new EventEmitter();
  @Output() removeBlur = new EventEmitter();
  
  @Input() mobile: boolean;
  
  view = '';
  nextView = '';
  loggedIn = false;
  constructor(private shared : SharedService , private httpReq : HttpRequestsService) { }

  ngOnInit() {
    this.view = this.shared.viewObj.view;
    this.nextView = this.shared.viewObj.nextView;
    this.apartmentModalOutput.emit(this.apartmentModal);
    M.FloatingActionButton.init($('.fixed-action-btn'));

    this.httpReq.token.subscribe(data => {
      if (data !== ""){
          this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    });
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
    removeBlurClick(){
      $(".tap-target-wrapper").removeClass("open");
      this.removeBlur.emit();
    }

}
