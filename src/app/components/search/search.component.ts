import { Component, OnInit , Output , EventEmitter , Input , ViewChild ,ElementRef , NgZone} from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchOutput = new EventEmitter();
  @Output() searchRefOutput = new EventEmitter();
  @Input() view: any;
  @ViewChild("searchRef")  searchRef: ElementRef;
  apartmentsResults;
  constructor( private shared : SharedService , private zone:NgZone) { 
  }

  ngOnInit() {
    this.searchRefOutput.emit(this.searchRef);
    let that = this;
    this.shared.apartmentsResults.subscribe((data) => {
     //fix for render issue
      this.zone.run(() => { 
        that.apartmentsResults = data;
      });
  });

  }

  
  keyDownEnter(event) {
    if (event.keyCode == 13) {
      this.searchOutput.emit(false);
    }
  }
}
