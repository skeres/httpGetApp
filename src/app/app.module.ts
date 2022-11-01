import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import added for the app
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MyServiceApp } from './myserviceapp.service';

// import added initalizing environement parameters
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';

//Add this function as initiating load method first
function initConfig(config: AppConfig){
  return () => config.load()
}

// added imports : HttpClientModule, FormsModule
// added providers : HttpClientModule, FormsModule
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MyServiceApp, AppConfig,  { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
