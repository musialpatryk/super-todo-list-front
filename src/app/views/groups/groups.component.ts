import {Component, OnInit} from '@angular/core';
import {IRestGroup} from '../../services/rest/rest.interfaces';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: IRestGroup[] = [];
  nameControl = new FormControl('', Validators.required);
  loading = true;
  error = false;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get<IRestGroup[]>('group')
      .subscribe((groups) => {
        this.groups = groups;
        this.loading = false;
      });
  }

  addGroup(): void {
    this.error = false;
    this.loading = true;

    this.http.post<IRestGroup>('group', {name: this.nameControl.value})
      .subscribe({
        next: (response) => {
          this.groups.push(response);
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      })
  }

  removeGroup(group: IRestGroup): void {
    this.http.delete(`group/${group.id}`)
      .subscribe(() => {
        this.groups.splice(this.groups.indexOf(group), 1)
      });
  }
}
