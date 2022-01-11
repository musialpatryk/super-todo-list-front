import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
    private router: Router
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
      }, this.passwordsEquality)
    });

    this.passwordControls = {
      password: passwordControl,
      repeatPassword: repeatPasswordControl,
    }
  }

  private passwordsEquality: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  createAccount(): void {
    if (this.createUserForm.invalid) {
      return;
    }

    const payload = {
        name: this.createUserForm.get('username')!.value,
        email: this.createUserForm.get('email')!.value,
        password: this.createUserForm.get('passwords.password')!.value,
        passwordCheck: this.createUserForm.get('passwords.repeatPassword')!.value
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
