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
  loginError = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  tryLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value,
      password = this.loginForm.get('password')?.value;

    this.userService.login(username, password)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['app']);
        },
        error: () => {
          this.showError();
          this.loginForm.reset();
        }
      });
  }

  showError(): void {
    this.loginError = true;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
