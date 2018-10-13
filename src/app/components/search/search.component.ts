import { Component, OnInit , Output , EventEmitter , Input , ViewChild ,ElementRef} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchOutput = new EventEmitter();
  @Output() searchRefOutput = new EventEmitter();
  @Input() view: any;
  @Input() apartmentsResults: number;
  @ViewChild("searchRef")  searchRef: ElementRef;

  search = true;
  constructor() { 
  }

  ngOnInit() {
    this.searchRefOutput.emit(this.searchRef);

  }

  
  keyDownEnter(event) {
    if (event.keyCode == 13) {
      this.searchOutput.emit(false);
    }
  }
}
