import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl = '/api';
  defaultConfig = {
    observe: 'response'
  } as const;

  constructor(
    private http: HttpClient
  ) {
  }

  get(endpoint: string, options = {}): Observable<HttpResponse<any>> {
    return this.http.get(
      `${this.apiUrl}/${endpoint}`,
      this.mergeOptions(options)
    );
  }

  post(endpoint: string, payload: unknown, options = {}): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.apiUrl}/${endpoint}`,
      payload,
      this.mergeOptions(options)
    );
  }

  put(endpoint: string, payload: unknown, options = {}): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}/${endpoint}`,
      payload,
      this.mergeOptions(options)
    );
  }

  private mergeOptions(customOptions: object): RestService['defaultConfig'] {
    return {...this.defaultConfig, ...customOptions};
  }
}
