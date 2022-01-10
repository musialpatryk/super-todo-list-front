import {Component, OnInit} from '@angular/core';
import {IRestGroup} from '../../services/rest/rest.interfaces';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: IRestGroup[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get<IRestGroup[]>('group')
      .subscribe((groups) => {
        this.groups = groups;
      });
  }

  removeGroup(group: IRestGroup): void {
    this.http.delete(`group/${group.id}`)
      .subscribe()
  }
}
