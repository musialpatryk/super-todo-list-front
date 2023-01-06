import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {IRestGroup, IRestUser} from '../../../services/rest/rest.interfaces';
import {UserService} from '../../../services/user/user.service';

type IGroupUser = IRestUser & {isAdmin?: boolean};

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
})
export class EditGroupComponent implements OnInit {
  linkControl = new FormControl('', Validators.required)
  message: 'success' | 'error' | 'none' = 'none';
  users!: IGroupUser[];
  group!: IRestGroup;
  isCurrentUserAdmin = false;
  loading = true;

  private readonly groupId: number;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.groupId = Number(route.snapshot.paramMap.get('groupId'));
  }

  ngOnInit(): void {
    let userLoading = true,
      groupsLoading = true;

    this.http.get<IRestGroup>('group/' + this.groupId)
      .subscribe({
        next: (response) => {
          this.group = response;
          this.markAdminUser();

          groupsLoading = false;
          this.loading = userLoading || groupsLoading;
        },
        error: () => {
          this.router.navigate(['/app/groups']);
        }
      });


    this.http.get<IGroupUser[]>(`group/${this.groupId}/users`)
      .subscribe((response) => {
        this.users = response;
        this.markAdminUser();

        userLoading = false;
        this.loading = userLoading || groupsLoading;
      });
  }

  private markAdminUser(): void {
    if (
      !this.users?.length
      || !this.group
    ) {
      return;
    }

    console.log(this.users, this.group);
    this.isCurrentUserAdmin = this.userService.getUser().id === this.group.administrator_id;
    this.users.forEach((user) => {
      user.isAdmin = user.id === this.group.administrator_id;
    });
  }

  addUser(): void {
    const payload = {
      invitationLink: this.linkControl.value,
      groupId: this.groupId
    }
     this.http.post<IRestUser>('invitation', payload)
       .subscribe({
         next: (response) => {
           this.users.push(response)
           this.markAdminUser();
           this.message = 'success';
         },
         error: () => {
           this.message = 'error';
         }
       })
  }

  removeUser(user: IGroupUser): void {
    this.http.post('group/' + this.groupId + '/kick', {user: user.id})
      .subscribe({
        next: () => {
          this.users.splice(this.users.indexOf(user), 1);
          this.message = 'success';
        },
        error: () => {
          this.message = 'error';
        }
      });
  }

  leaveGroup(): void {
    this.http.post(`group/${this.groupId}/leave`, {})
      .subscribe({
        next: () => {
          this.router.navigate(['/app/groups']);
        },
        error: () => {
          this.message = 'error'
        }
      });
  }
}
