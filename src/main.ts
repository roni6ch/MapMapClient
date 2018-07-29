import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as $ from 'jquery';

if (environment.production) {
  enableProdMode();
}

loadGoogleSignInScript();

  //loads all app module after google button loaded
function loadGoogleSignInScript() {
  /*let script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  document.getElementsByTagName("head")[0].appendChild(script);
  */

  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
  

}

