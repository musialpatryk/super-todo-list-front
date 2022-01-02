import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import cloneDeep from 'lodash.clonedeep';

export interface IUser {
  id: number;
  username: string;
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
  ): Observable<boolean> {
    this.saveUser({
      id: 0,
      username
    });
    return of(true);
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
}
