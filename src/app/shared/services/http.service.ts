import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from "angular2-jwt";
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

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
    return this.request('post', environment.apiURL + url, body, options);
  }

  private request(reqType: string, url: string, body: Object, options: RequestOptionsArgs): Observable<Response> {

    const key: string = this.buildKey(url, body);
    const cacheData: Response = this.getCachedData(key);

    const httpParams = this.buildHttpParams(url, body, options);
    const response: Observable<Response> = this.authHttp[reqType].apply(this.authHttp, httpParams).share();

    
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
