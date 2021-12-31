import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (state.url.startsWith('/login')) {
      return !this.userService.isLogged()
        ? true
        : this.router.createUrlTree(['/app']);
    }

    if (this.userService.isLogged()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
