import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { table } from './table';
import { AppConfig } from './app.config';

@Injectable()
export class MyServiceApp {

  baseURL: string | undefined;
  //baseURL: string ='http://localhost:8282/api';


  constructor(private http: HttpClient, private config: AppConfig) {
    this.baseURL=this.myMethodToGetHost();
    console.log('>>> running environment is : '+this.myMethodToGetCurrentEnv());
    console.log('>>> current url for requesting is : '+this.myMethodToGetHost());

  }


  getUrl(requestedUrl: string): Observable<any> {
    var url=this.baseURL+'/'+requestedUrl;
    console.log('>>> in myserciceapp.service.ts/getUrl() for '+url);
    return this.http.get(url);
  }

  myMethodToGetHost(): string {
    // will print 'localhost' or IP of production
    return this.config.getConfig();
  }

  myMethodToGetCurrentEnv(): string {
    // will print 'development'or 'production'
    return this.config.getEnv();
  }


}
