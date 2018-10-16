import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { InfowindowModalComponent } from './infowindow-modal.component';


const routes: Routes = [
  { path : '', component : InfowindowModalComponent  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
    InfowindowModalComponent,]
})
export class InfoWindowModalModule { }
