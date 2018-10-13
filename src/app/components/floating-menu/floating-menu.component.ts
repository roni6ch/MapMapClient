import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {


  @Output() getApartmentsOutput = new EventEmitter();
  @Output() changeViewOutput = new EventEmitter();
  @Input() connect: boolean;
  @Input() mobile: boolean;
  @Input() apartmentObj: any;
  
  constructor() { }

  ngOnInit() {
    M.FloatingActionButton.init($('.fixed-action-btn'));
  }

  getApartments(){
    this.getApartmentsOutput.emit(true);
  }
  changeView(){
    this.changeViewOutput.emit(true);
  }

}
