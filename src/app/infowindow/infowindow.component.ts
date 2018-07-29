import { Component, EventEmitter , OnInit ,Input , Output   } from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';


@Component({
  selector: 'app-infowindow',
  templateUrl: './infowindow.component.html',
  styleUrls: ['./infowindow.component.scss']
})
export class InfowindowComponent implements OnInit {

  @Input() apartment: any; 
  @Output() apartmentOBJ = new EventEmitter();


  constructor(private httpReq: HttpRequestsService) { 
  }
  markerHeart(event){
    this.apartment.user.favorite = !this.apartment.user.favorite;
    // TODO: change sendData user id
    let sendData = {
      user_id:this.apartment,
      apartment_id:this.apartment.id,
      favorite : this.apartment.user.favorite
    }
    //send favorite ajax
    this.httpReq.favorite(sendData).subscribe(data => {
      if (data) {
        console.log(data)
      }
    });
    
    event.stopPropagation();
  }
  ngOnInit() {
  }

  infoWindowClick(){
    this.apartmentOBJ.emit(this.apartment);
  }


}
