import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user/user.service';
import {IRestUser} from '../../../services/rest/rest.interfaces';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  user: IRestUser;
  accountForm!: FormGroup;
  passwordControls!: {
    password: FormControl;
    repeatPassword: FormControl;
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private utils: UtilsService
  ) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    const passwordControl = new FormControl('', Validators.required),
      repeatPasswordControl = new FormControl('', Validators.required);

    this.accountForm = new FormGroup({
      username: new FormControl(this.user.name),
      email: new FormControl(this.user.email, Validators.email),
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

  save(): void {
    if (this.accountForm.invalid) {
      return;
    }

    const payload = {
      name: this.accountForm.get('username')?.value,
      email: this.accountForm.get('email')?.value,
      password: this.accountForm.get('passwords.password')?.value,
      password_confirmation: this.accountForm.get('passwords.repeatPassword')?.value
    }
    this.http.put<IRestUser>('profile', payload)
      .subscribe((res) => {
        this.user = res;
        this.userService.saveUser(res);
      });
  }

}
