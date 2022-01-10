import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.userService.getToken()}`),
      url:  `/api/${req.url}`
    });

    const invalidTokenObserver = {
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.userService.logout();
        }
      }
    };
    return next.handle(modifiedReq)
      .pipe(
        tap(invalidTokenObserver)
      );
  }
}
