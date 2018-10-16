
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { CardsComponent } from './cards.component';
const routes: Routes = [
  { path : '', component : CardsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
    CardsComponent
  ]
})
export class CardsModule { }
