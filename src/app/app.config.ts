import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'


@Injectable()
export class AppConfig {

    private config: string | undefined;
    private environment: string | undefined;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig():string {
        return this.config?this.config:'not defined';
    }

    /**
     * Use to get the data found in the first file (environment file)
     */
    public getEnv():string {
        return this.environment?this.environment:'not defined';
    }

    /**
     * This method:
     *   a) Loads "environment.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[environment].json" to get all environment's variables (e.g.: 'config.development.json')
     */
    public load() {
        let self = this;
        return new Promise((resolve, reject) => {
            this.http.get('./assets/environment.json')
            .pipe(
             catchError((error: any):any => {
                console.log('Configuration file "environment.json" could not be read');
                resolve(true);
                //return Observable.throw(error.json().error || 'Server error');
                return throwError(() => new Error(' error : "environment.json" could not be read'))
            }))
            .subscribe( (envResponse) => {
                self.environment=self.getValueOfJson(envResponse,'env');
                console.log('>>> env after parse='+self.environment)
                let request:any = null;
                let newPath='./assets/config.' + self.environment+ '.json';
                console.log('>>> newPath='+newPath);
                switch (true) {
                    case (self.environment =='production' || self.environment=='development'):
                        request = this.http.get('./assets/config.' + self.environment+ '.json');
                        break;
                    default:
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                         break;
                }

                if (request) {
                    request
                        .pipe(
                          catchError((error: any) => {
                            console.error('Error reading ' + self.environment+ ' configuration file');
                            resolve(error);
                            return throwError(() => new Error(' error : "config.'+self.environment+'.json" could not be read'))
                          }))
                        .subscribe((responseData: Observable<any>) => {
                            this.config =self.getValueOfJson(responseData,'host'); ;
                            resolve(true);
                         });
                } else {
                    console.error('environment config file "environment.json" is not valid');
                    resolve(true);
                }
            });

        });
    }


    public getValueOfJson(object:any, inKey:string): string {
      var r='error reading key : '+inKey;
      console.log('>>> in method getValueOfJson()');
      let v= JSON.stringify(object);
      console.log('>>> getValueOfJson() value after stringify='+v);
      let env = JSON.parse(v, (key, value) => {
        console.log('>>> getValueOfJson() key='+key);
        console.log('>>> getValueOfJson() value='+value);
        if (typeof value === 'string' && key == inKey ) {
          r=value;
        }
      });
      return r;

    }

}


