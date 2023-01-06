import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {privileges} from 'src/app/guards/privileges';
import {UserService} from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const routePrivilege = privileges.find((privilege) => {
      return state.url.startsWith(privilege.url);
    });
    if (!routePrivilege) {
      return true;
    }

    const {roles} = this.userService.getUser(),
      hasRequiredRole = roles.some((role) => {
        return routePrivilege.roles.includes(role);
      });

    if (!hasRequiredRole) {
      return this.router.createUrlTree([routePrivilege.redirectTo]);
    }

    return true;
  }
}
