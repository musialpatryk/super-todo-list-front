import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import cloneDeep from 'lodash.clonedeep';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IRestUser} from '../rest/rest.interfaces';

export interface ILoginInfo {
  user: IRestUser;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userKey = 'currentUser';
  private userInfo: ILoginInfo | undefined;
  private sessionStorage!: Storage;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(DOCUMENT) document: Document
  ) {
    this.sessionStorage = document.defaultView!.sessionStorage;
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const data = sessionStorage.getItem(this.userKey);

    if (data) {
      this.userInfo = JSON.parse(data);
    }
  }

  login(
    username: string,
    password: string
  ): Observable<string> {
    const payload = {
      email: username,
      password
    }
    return this.http.post('authenticate', payload, {responseType: 'text'})
      .pipe(
        tap({
          next: (response) => {
            this.saveUser({
              user: {
                username
              },
              token: response
            });
            return true;
          }
        })
      );
  }

  private saveUser(user: ILoginInfo): void {
    this.userInfo = user;
    this.sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    this.clearUser();
    this.router.navigate(['login']);
  }

  private clearUser(): void {
    this.userInfo = undefined;
    this.sessionStorage.removeItem(this.userKey);
  }

  isLogged(): boolean {
    return !!this.userInfo;
  }

  getUser(): IRestUser {
    if (!this.userInfo) {
      return {} as IRestUser;
    }

    return cloneDeep(this.userInfo.user);
  }

  getToken(): string | undefined {
    return this.userInfo?.token;
  }
}
