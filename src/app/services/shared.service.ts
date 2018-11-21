import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  profile = {};
  viewObj = new BehaviorSubject({
    view: 'table',
    nextView: 'טבלה'
  });
  coordinates = new BehaviorSubject({
    lat: 32.056442,
    lng: 34.772238
  });
  apartmentsResults = new BehaviorSubject(0);
  search = new BehaviorSubject(false);
  constructor() { }

  getUserProfile() {
    return this.profile;
  }
  setUserProfile(profile) {
    this.profile = profile;
  }
  getViewObj() {
    return this.viewObj.getValue();
  }
  setViewObj(view) {
    switch (view) {
      case 'map':
        this.viewObj.next({
          view: 'table',
          nextView: 'טבלה'
        });
        break;
      case 'cards':
        this.viewObj.next({
          view: 'map',
          nextView: 'מפה'
        });
        break;
      case 'table':
        this.viewObj.next({
          view: 'cards',
          nextView: 'כרטיסיות'
        });
        break;
      case 'admin':
        this.viewObj.next({
          view: 'map',
          nextView: 'מפה'
        });
        break;
      default:
        this.viewObj.next({
          view: 'table',
          nextView: 'טבלה'
        });
    }

  }
}
