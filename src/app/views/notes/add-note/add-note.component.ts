import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
})
export class AddNoteComponent {
  groupId: number;

  constructor(
    route: ActivatedRoute,
    private router: Router
  ) {
    this.groupId = Number(route.snapshot.paramMap.get('groupId'));
  }

  goToNotes(): void {
    this.router.navigate(['/app/notes']);
  }
}
