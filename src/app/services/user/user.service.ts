import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import cloneDeep from 'lodash.clonedeep';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IRestUser} from '../rest/rest.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userKey = 'currentUser';
  private user: IRestUser | undefined;
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
      this.user = JSON.parse(data);
    }
  }

  login(
    email: string,
    password: string
  ): Observable<IRestUser> {
    const payload = {
      email: email,
      password
    }
    return this.http.post<{token: string, user: IRestUser}>('login', payload)
      .pipe(
        map(({user, token}) => {
          return {...user, token};
        }),
        tap({
          next: (user) => {
            this.saveUser(user);
            return true;
          }
        })
      );
  }

  saveUser(user: IRestUser): void {
    const oldToken = this.user?.token;
    this.user = user;
    if (oldToken) {
      this.user.token = oldToken;
    }
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

  getUser(): IRestUser {
    if (!this.user) {
      return {} as IRestUser;
    }

    this.user.roles = ['user'];
    return cloneDeep(this.user);
  }

  getToken(): string | undefined {
    return this.user?.token;
  }
}
