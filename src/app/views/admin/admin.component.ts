import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRestUser} from 'src/app/services/rest/rest.interfaces';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  users?: IRestUser[];
  loading = true;
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get<IRestUser[]>('admin/user')
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      })
  }

  removeUser(userIndex: number): void {
    if (!this.users) {
      return;
    }

    this.http.delete('admin/user/' + this.users[userIndex].id)
      .subscribe(() => {
        this.users?.splice(userIndex, 1);
      });
  }
}
