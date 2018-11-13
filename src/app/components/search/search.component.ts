import { Component, OnInit , Output , EventEmitter , Input , ViewChild ,ElementRef} from '@angular/core';
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
  constructor( private shared : SharedService) { 
  }

  ngOnInit() {
    this.searchRefOutput.emit(this.searchRef);

    this.shared.apartmentsResults.subscribe((data) => {
      this.apartmentsResults = data;
  });

  }

  
  keyDownEnter(event) {
    if (event.keyCode == 13) {
      this.searchOutput.emit(false);
    }
  }
}
