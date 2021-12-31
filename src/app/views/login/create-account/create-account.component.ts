import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent  {
  createUserForm!: FormGroup;
  passwordControls!: {
    password: FormControl;
    repeatPassword: FormControl;
  };

  constructor() {
    this.initializeFormControls();
  }

  private initializeFormControls(): void {
    const passwordControl = new FormControl('', Validators.required),
      repeatPasswordControl = new FormControl('', Validators.required);

    this.createUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
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

    const username = this.createUserForm.get('username')!.value,
      password = this.createUserForm.get('passwords.password')!.value;
  }

}
