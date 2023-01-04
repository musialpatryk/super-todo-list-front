import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  createUserForm!: FormGroup;
  passwordControls!: {
    password: FormControl;
    repeatPassword: FormControl;
  };
  creationError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utils: UtilsService
  ) {
    this.initializeFormControls();
  }

  private initializeFormControls(): void {
    const passwordControl = new FormControl('', Validators.required),
      repeatPasswordControl = new FormControl('', Validators.required);

    this.createUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: passwordControl,
        repeatPassword: repeatPasswordControl
      }, this.utils.passwordsEqualityValidator)
    });

    this.passwordControls = {
      password: passwordControl,
      repeatPassword: repeatPasswordControl,
    }
  }

  createAccount(): void {
    if (this.createUserForm.invalid) {
      return;
    }

    const payload = {
        name: this.createUserForm.get('username')!.value,
        email: this.createUserForm.get('email')!.value,
        password: this.createUserForm.get('passwords.password')!.value,
        password_confirmation: this.createUserForm.get('passwords.repeatPassword')!.value
      };
    this.http.post('register', payload)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.creationError = true;
        }
      })
  }
}
