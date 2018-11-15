import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { InfowindowModalComponent } from './infowindow-modal.component';
// For MDB Angular Free
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'


const routes: Routes = [
  { path : '', component : InfowindowModalComponent  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    CarouselModule,WavesModule, ButtonsModule 
  ],
  declarations: [
    InfowindowModalComponent,]
})
export class InfoWindowModalModule { }
