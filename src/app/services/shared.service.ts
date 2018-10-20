import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  profile = {};
  viewObj = {
    view : 'table',
    nextView : 'טבלה'
  }
  constructor() { }

  getUserProfile(){
    return this.profile;
  }
  setUserProfile(profile){
    this.profile = profile;
  }
  setViewObj(view,nextView){
    switch (view) {
      case 'map':
        this.viewObj.view = 'table';
        this.viewObj.nextView = 'טבלה';
        break;
      case 'cards':
      this.viewObj.view = 'map';
        this.viewObj.nextView = 'מפה';
        break;
      case 'table':
      this.viewObj.view = 'cards';
        this.viewObj.nextView = 'כרטיסיות';
        break;
    }
   
  }
}
