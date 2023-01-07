import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  static passwordsEqualityValidator: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  static getPasswordValidators(): Validators {
    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return [Validators.required, Validators.pattern(PASSWORD_REGEX)];
  }
}
