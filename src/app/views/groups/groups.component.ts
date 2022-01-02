import { Component } from '@angular/core';

interface IGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent  {
  groups: IGroup[];

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
