import { Component, OnInit , Output , EventEmitter , Input} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() signOutOutput = new EventEmitter();
  @Input() profileIMG: string;
  @Input() search: boolean;
  @Input() mobile: boolean;

  constructor() { }

  ngOnInit() {

  }

  signOut(){
    this.signOutOutput.emit(true);
  }
}
