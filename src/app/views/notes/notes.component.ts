import { Component } from '@angular/core';

interface INote {
  id: number;
  title: string;
  description: string;
  priority: number;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  notes: INote[];

  constructor() {
    this.notes = this.getMockNotes(10);
  }

  private getMockNotes(count: number): INote[] {
    const notes = [];
    for (let i = 0; i < count; i++) {
      notes.push({
        id: i,
        title: 'note_' + i,
        description: 'note_content' + i,
        priority: i
      });
    }
    return notes;
  }
}
