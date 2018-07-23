import { Component, EventEmitter , OnInit ,Input , Output   } from '@angular/core';
import { InfowindowModalComponent } from '../infowindow-modal/infowindow-modal.component';
import { IApartments } from '../iapartments';


@Component({
  selector: 'app-infowindow',
  templateUrl: './infowindow.component.html',
  styleUrls: ['./infowindow.component.scss']
})
export class InfowindowComponent implements OnInit {

  @Input() apartment: any; 
  constructor() { 
  }

  ngOnInit() {
  }


}
