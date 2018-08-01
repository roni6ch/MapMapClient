import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleSignInComponent } from 'angular-google-signin';
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
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';

import { InfowindowComponent } from './infowindow/infowindow.component';
import { InfowindowModalComponent } from './infowindow-modal/infowindow-modal.component';
import { NewApartmentModalComponent } from './new-apartment-modal/new-apartment-modal.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';

import { NouisliderModule } from 'ng2-nouislider';
import { FiltersPipe } from './filters.pipe';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContractsComponent } from './contracts/contracts.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CardsComponent } from './cards/cards.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

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
    EditModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),  // remove second argument
    BrowserModule,
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



//indent: shift+alt+f