import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewApartmentModalComponent } from './new-apartment-modal.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

const routes: Routes = [
  { path : '', component : NewApartmentModalComponent  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
    NewApartmentModalComponent,
    ImageUploaderComponent,
  ]
})
export class NewApartmentModule { }
