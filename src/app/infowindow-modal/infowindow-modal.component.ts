import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-infowindow-modal',
  templateUrl: './infowindow-modal.component.html',
  styleUrls: ['./infowindow-modal.component.scss']
})
export class InfowindowModalComponent implements OnInit {
  
  @Input() apartment: any; 
  indicatorNumber = 0;
  constructor() { }

  ngOnInit() {
  }

  updateIndector(id:number){
    console.log(id);
    this.indicatorNumber = id;
  }

}
