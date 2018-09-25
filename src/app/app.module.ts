import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
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

/*  COMPONENTS */
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';

/*  LIBRERIES */
import { GoogleSignInComponent } from 'angular-google-signin';
import { NouisliderModule } from 'ng2-nouislider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SmartTableModule } from 'ng2-smart-table';

/* Pipes */ 
import { FiltersPipe } from './pipes/filters.pipe';
import { DatePipePipe } from './pipes/date-pipe.pipe';

import { InfowindowComponent } from './components/map/infowindow/infowindow.component';
import { InfowindowModalComponent } from './components/map/infowindow-modal/infowindow-modal.component';
import { NewApartmentModalComponent } from './components/new-apartment-modal/new-apartment-modal.component';
import { ImageUploaderComponent } from './components/new-apartment-modal/image-uploader/image-uploader.component';
import { AdvancedFiltersComponent } from './components/advanced-filters/advanced-filters.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { CardsComponent } from './components/cards/cards.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { LoginComponent } from './components/login/login.component';



//import { Angular2SocialLoginModule } from "angular2-social-login";


const routes: Routes = [];
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
    InfowindowComponent,
    InfowindowModalComponent,
    NewApartmentModalComponent,
    ImageUploaderComponent,
    AdvancedFiltersComponent,
    FiltersPipe,
    ContractsComponent,
    GoogleSignInComponent,
    CardsComponent,
    EditModalComponent,
    DatePipePipe,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),  // remove second argument
    BrowserModule,
  // Angular2SocialLoginModule,
    BootstrapModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG43sbbdLsGywMwY0T7-1yOoKVDGfnbsk',
      libraries: ['places']
    }),
    AgmDirectionModule,      // agm-direction
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApartmentsService, AdvancedFilterService, HttpRequestsService,FiltersPipe],
  bootstrap: [AppComponent],
  exports:[FiltersPipe]
})

export class AppModule { }


/*
let providers = {
  "facebook": {
    "clientId": "333762270434028",
    "apiVersion": "v2.8" //like v2.4
  }
};
*/

//Angular2SocialLoginModule.loadProvidersScripts(providers);