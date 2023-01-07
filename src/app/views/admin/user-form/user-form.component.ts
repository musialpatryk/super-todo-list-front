import {Component, OnInit} from '@angular/core';
import {IRestUser} from 'src/app/services/rest/rest.interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user!: IRestUser;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    roles: new FormControl([]),
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (!userId) {
      this.createUser();
      return;
    }

    this.resolveUser(userId);
  }

  private createUser(): void {
    this.user = {
      email: '',
      name: '',
      roles: ['user']
    } as unknown as IRestUser;
    this.userForm.addControl('password', new FormControl('', Validators.required));
    this.userForm.patchValue(this.user);
  }

  private resolveUser(userId: number): void {
    this.http.get<IRestUser>('admin/user/' + userId)
      .subscribe((user) => {
        this.user = user;
        this.userForm.patchValue(this.user);
      });
  }

  save(): void {
    if (this.user.id) {
      this.editUser();
      return;
    }

    this.addUser();
  }

  private addUser(): void {
    const payload = {
      ...this.userForm.value,
      password_confirmation: this.userForm.value.password
    };

    this.http.post('admin/user', payload)
      .subscribe(() => {
        this.router.navigate(['/app/admin']);
      });
  }

  private editUser(): void {
    this.http.put<IRestUser>('admin/user/' + this.user.id, this.userForm.value)
      .subscribe((user) => {
        this.user = user;
      });
  }
}
