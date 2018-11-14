import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule , Routes} from "@angular/router";

/* AUTH */
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';

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

/*  LIBRERIES */
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/* Pipes */ 
import { FiltersPipe } from './pipes/filters.pipe';
import { DatePipePipe } from './pipes/date-pipe.pipe';


const routes: Routes = [
  { path : 'admin', loadChildren : './components/admin/admin.module#AdminModule' },
  { path : 'new', loadChildren : './components/new-apartment-modal/new-apartment.module#NewApartmentModule' , canActivate: [AuthGuard]},
  { path : 'edit', loadChildren : './components/new-apartment-modal/new-apartment.module#NewApartmentModule' , canActivate: [AuthGuard] },
  { path : 'edit-apartments', loadChildren : './components/edit-modal/edit-apartments.module#EditApartmentsModule' , canActivate: [AuthGuard] },
  { path : 'filters', loadChildren : './components/advanced-filters/advanced-filters.module#AdvancedFiltersModule' , canActivate: [AuthGuard] },
  { path : 'table', loadChildren : './components/table/table.module#TableModule' , canActivate: [AuthGuard] },
  { path : 'cards', loadChildren : './components/cards/cards.module#CardsModule' , canActivate: [AuthGuard] },
  { path : 'infowindow/:id', loadChildren : './components/map/infowindow-modal/info-window-modal.module#InfoWindowModalModule' , canActivate: [AuthGuard] },
  { path : '**', redirectTo : ''  },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
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
  providers: [ApartmentsService, AdvancedFilterService, HttpRequestsService,FiltersPipe,SharedService,
    AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports:[FiltersPipe]
})

export class AppModule { }
