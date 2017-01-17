import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from "angular2-jwt";
import {Http} from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class HttpService {
//noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
  private httpCache: Map<string, Response> = new Map();

  constructor(private authHttp: AuthHttp) {
  }
  

  private getCachedData(key: string): Response {
    //noinspection TypeScriptUnresolvedFunction
    return this.httpCache.get(key)
  }

  private buildKey(url: string, body?: Object): string {
    return url + JSON.stringify(body);
  }

  private buildHttpParams(url: string, body?: Object, options?: RequestOptionsArgs): any[] {

    let httpParams: any[] = [];

    httpParams.push(url);

    if (body) httpParams.push(body);
    if (options) httpParams.push(options);

    return httpParams;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request('get', environment.apiURL + url, null, options)
  }

  public post(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
    console.log(environment.apiURL + url, body, options);
    return this.request('post', environment.apiURL + url, body, options);
  }
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request('delete', environment.apiURL + url, null, options);
  }
  public put(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.request('put', environment.apiURL + url, body, options);
  }

  private getByRequestType(reqType : string, url : string, body? : Object, options? : RequestOptionsArgs) : Observable<Response> {
    switch(reqType) {
      case 'get':
        console.log("test");
        return this.authHttp.get(url, options).share(); // share to return a "hot" Observable!
      case 'post':
        return this.authHttp.post(url, body, options).share();
      case 'put':
        return this.authHttp.put(url, body, options).share();
      case 'delete':
        return this.authHttp.delete(url, options).share();
    }
  }

  private request(reqType: string, url: string, body: Object, options: RequestOptionsArgs): Observable<Response> {
    console.log("test1");
    //const key: string = this.buildKey(url, body);
    console.log("test2");
    // const cacheData: Response = this.getCachedData(key);
    
    //const httpParams = this.buildHttpParams(url, body, options);
    console.log("test3");


    const response: Observable<Response> = this.getByRequestType(reqType, url, body, options);
    

    console.log("test4");
    
    response
      .catch(error => {
        return Observable.throw(error || 'Server error');
      })
      .subscribe(data => {
          
      }, error => {
          // Ignore
        }
      );

    return response;
  }

}
