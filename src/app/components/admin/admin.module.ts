import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from "@angular/router";
import { AdminComponent } from './admin.component';
import { AdminApartmentsComponent } from './admin-apartments/admin-apartments.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';



const routes: Routes = [
  { path : '',  component : AdminComponent,
    children : [
        {  path : '' , redirectTo : 'apartments'  , pathMatch: 'full' },
        {  path : 'apartments' , component : AdminApartmentsComponent },
        {  path : 'comments' , component : AdminCommentsComponent },
        {  path : 'users' , component : AdminUsersComponent }
        ]
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
    AdminComponent,
    AdminApartmentsComponent,
    AdminCommentsComponent,
    AdminUsersComponent
  ]
})
export class AdminModule { }
