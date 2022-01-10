import { Component } from '@angular/core';
import {IRestGroup} from '../../services/rest/rest.interfaces';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent  {
  groups: IRestGroup[];

  constructor() {
    this.groups = [
      {
        id: 1,
        name: 'group_1'
      },
      {
        id: 2,
        name: 'group_2'
      },
    ]
  }

}
