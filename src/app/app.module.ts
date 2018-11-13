import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes} from "@angular/router";

/* MAP */
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'   // agm-direction

/* SERVICE */
import { ApartmentsService } from './services/apartments.service';
import { AdvancedFilterService } from './services/advanced-filter.service';
import { HttpRequestsService } from './services/http-requests.service';
import { SharedService } from './services/shared.service';


/*  COMPONENTS */
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { InfowindowComponent } from './components/map/infowindow/infowindow.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { NavComponent } from './components/nav/nav.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { FloatingMenuComponent } from './components/floating-menu/floating-menu.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
/*  ADMIN */
import { AdminApartmentsComponent } from './components/admin/admin-apartments/admin-apartments.component';
import { AdminCommentsComponent } from './components/admin/admin-comments/admin-comments.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';


/*  LIBRERIES */
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/* Pipes */ 
import { FiltersPipe } from './pipes/filters.pipe';
import { DatePipePipe } from './pipes/date-pipe.pipe';

const routes: Routes = [
  { path : 'admin', component : AdminComponent ,
    children : [
    {  path : '' , redirectTo : 'apartments'  , pathMatch: 'full' },
    {  path : 'apartments' , component : AdminApartmentsComponent },
    {  path : 'comments' , component : AdminCommentsComponent },
    {  path : 'users' , component : AdminUsersComponent }
    ]
  },
  { path : 'new', loadChildren : './components/new-apartment-modal/new-apartment.module#NewApartmentModule' },
  { path : 'edit', loadChildren : './components/new-apartment-modal/new-apartment.module#NewApartmentModule'  },
  { path : 'edit-apartments', loadChildren : './components/edit-modal/edit-apartments.module#EditApartmentsModule'  },
  { path : 'filters', loadChildren : './components/advanced-filters/advanced-filters.module#AdvancedFiltersModule'  },
  { path : 'table', loadChildren : './components/table/table.module#TableModule'  },
  { path : 'cards', loadChildren : './components/cards/cards.module#CardsModule'  },
  { path : 'infowindow/:id', loadChildren : './components/map/infowindow-modal/info-window-modal.module#InfoWindowModalModule'  },
  { path : '**', redirectTo : ''  },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AdminComponent,
    AdminApartmentsComponent,
    AdminCommentsComponent,
    AdminUsersComponent,
    InfowindowComponent,
    FiltersPipe,
    ContractsComponent,
    DatePipePipe,
    NavComponent,
    MobileNavComponent,
    FloatingMenuComponent,
    SearchComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),  // remove second argument
    BrowserModule,
    BootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG43sbbdLsGywMwY0T7-1yOoKVDGfnbsk',
      libraries: ['places']
    }),
    AgmDirectionModule,      // agm-direction
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApartmentsService, AdvancedFilterService, HttpRequestsService,FiltersPipe,SharedService],
  bootstrap: [AppComponent],
  exports:[FiltersPipe]
})

export class AppModule { }
