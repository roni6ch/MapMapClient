import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {
  
  @Input() apartment: any; 
  
  constructor() { }

  ngOnInit() {
  }

}
