import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { EditModalComponent } from './edit-modal.component';



const routes: Routes = [
  { path : '', component : EditModalComponent  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
    EditModalComponent
  ]
})
export class EditApartmentsModule { }






