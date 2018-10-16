import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { TableComponent } from './table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const routes: Routes = [
  { path : '', component : TableComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    Ng2SmartTableModule,
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
