import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleSignInComponent } from 'angular-google-signin';

/* MAP */
import { AgmCoreModule } from '@agm/core';

/* SERVICE */
import { ApartmentsService } from './services/apartments.service';
import { AdvancedFilterService } from './services/advanced-filter.service';
import { HttpRequestsService } from './services/http-requests.service';
/*  COMPONENTS */
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InfowindowComponent } from './infowindow/infowindow.component';
import { InfowindowModalComponent } from './infowindow-modal/infowindow-modal.component';
import { NewApartmentModalComponent } from './new-apartment-modal/new-apartment-modal.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';

import { NouisliderModule } from 'ng2-nouislider';
import { FiltersPipe } from './filters.pipe';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContractsComponent } from './contracts/contracts.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent,
    MapComponent,
    InfowindowComponent,
    InfowindowModalComponent,
    NewApartmentModalComponent,
    ImageUploaderComponent,
    AdvancedFiltersComponent,
    FiltersPipe,
    ContractsComponent,
  ],
  imports: [
    BrowserModule,
    BootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG43sbbdLsGywMwY0T7-1yOoKVDGfnbsk',
      libraries: ['places']
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApartmentsService, AdvancedFilterService, HttpRequestsService],
  bootstrap: [AppComponent],
  exports:[FiltersPipe]
})
export class AppModule { }



//indent: shift+alt+f