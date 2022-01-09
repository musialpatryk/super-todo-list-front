import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import cloneDeep from 'lodash.clonedeep';
import {RestService} from '../rest/rest.service';
import {tap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

export interface IUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userKey = 'currentUser';
  private user: IUser | undefined;
  private sessionStorage!: Storage;

  constructor(
    private router: Router,
    private rest: RestService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.sessionStorage = document.defaultView!.sessionStorage;
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const data = sessionStorage.getItem(this.userKey);

    if (data) {
      this.user = JSON.parse(data);
    }
  }

  login(
    username: string,
    password: string
  ): Observable<HttpResponse<string>> {
    const payload = {
      email: username,
      password
    }
    return this.rest.post('authenticate', payload, {responseType: 'text'})
      .pipe(
        tap({
          next: (response) => {
            if (typeof response.body !== 'string') {
              return;
            }

            this.saveUser({
              username,
              token: response.body
            });
            return true;
          }
        })
      );
  }

  private saveUser(user: IUser): void {
    this.user = user;
    this.sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    this.clearUser();
    this.router.navigate(['login']);
  }

  private clearUser(): void {
    this.user = undefined;
    this.sessionStorage.removeItem(this.userKey);
  }

  isLogged(): boolean {
    return !!this.user;
  }

  getUser(): IUser {
    if (!this.user) {
      return {} as IUser;
    }

    return cloneDeep(this.user);
  }

  getToken(): string | undefined {
    return this.user?.token;
  }
}
