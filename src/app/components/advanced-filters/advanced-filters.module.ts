import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancedFiltersComponent } from './advanced-filters.component';
import { NouisliderModule } from 'ng2-nouislider';

const routes: Routes = [
  { path : '', component : AdvancedFiltersComponent },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), 
    NouisliderModule,
  ],
  declarations: [
    AdvancedFiltersComponent,
  ]
})
export class AdvancedFiltersModule { }
