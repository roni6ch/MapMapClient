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
  @Output() apartmentModalOutput = new EventEmitter();
  @Output() removeBlur = new EventEmitter();
  
  @Input() mobile: boolean;
  
  viewObj = {
    view : '',
    nextView : ''
  };
  loggedIn = false;
  constructor(private shared : SharedService , private httpReq : HttpRequestsService) { }

  ngOnInit() {
    this.shared.viewObj.subscribe(data => this.viewObj = data);
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
      this.shared.setViewObj(this.viewObj.view);
    }
    removeBlurClick(){
      $(".tap-target-wrapper").removeClass("open");
      this.removeBlur.emit();
    }

}
