import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { GoogleSignInComponent } from 'angular-google-signin';
/* MAP */
import { AgmCoreModule } from '@agm/core';
/* SERVICE */
import { HttpClientModule } from '@angular/common/http';
import { ApartmentsService } from './apartments.service';
import { AdvancedFilterService } from './advanced-filter.service';




/*  COMPONENTS */
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InfowindowComponent } from './infowindow/infowindow.component';
import { InfowindowModalComponent } from './infowindow-modal/infowindow-modal.component';
import { NewApartmentModalComponent } from './new-apartment-modal/new-apartment-modal.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

/* Image Uploader */


@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent,
    MapComponent,
    InfowindowComponent,
    InfowindowModalComponent,
    NewApartmentModalComponent,
    ImageUploaderComponent,
  ],
  imports: [
    BrowserModule,
    BootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG43sbbdLsGywMwY0T7-1yOoKVDGfnbsk'
    }),
    HttpClientModule
  ],
  providers: [ApartmentsService,AdvancedFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }



//indent: shift+alt+f