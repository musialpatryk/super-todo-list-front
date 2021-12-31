import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private _destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  tryLogin(): void {
    const username = this.loginForm.get('username')?.value,
      password = this.loginForm.get('password')?.value;

    this.userService.login(username, password)
      .pipe(takeUntil(this._destroy$))
      .subscribe((success) => {
        if (!success) {
          this.loginForm.reset();
          return;
        }
        this.router.navigate(['app']);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
