import { Component } from '@angular/core';

import { MyServiceApp } from './myserviceapp.service';
import { table } from './table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  requestedUrl: string = ""
  resultTable: table[] | undefined;

  loading: boolean = false;
  errorMessage: string | undefined;

  constructor(private myserviceapp: MyServiceApp) {
  }

  public getDatas() {
    this.loading = true;
    this.errorMessage = "";
    this.resultTable=[];
    console.log('>>> in app.component.ts / getDatas()')
    this.myserviceapp.getUrl(this.requestedUrl)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.resultTable = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {
          this.loading = false;                   //complete() callback
        })
  }
}
