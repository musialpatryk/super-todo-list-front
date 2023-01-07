import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRestNote} from '../../services/rest/rest.interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note!: IRestNote;
  @Input() post = false;
  @Input() defaultGroupId?: number;
  @Output() noteChange = new EventEmitter<void>();

  edit = false;
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.createDefaultNote();
    this.editForm.patchValue(this.note);
  }

  private createDefaultNote(): void {
    if (this.post) {
      this.edit = true;
      this.note = {
        name: '',
        description: ''
      } as IRestNote
    }
  }

  editNote(): void {
    this.edit = true;
  }

  saveNote(): void {
    const payload: IRestNote = {
      ...this.note,
      name: this.editForm.get('name')?.value,
      description: this.editForm.get('description')?.value
    }

    if (this.post && typeof this.defaultGroupId !== 'undefined') {
      payload.group_id = this.defaultGroupId;
    }

    const request = this.post
      ? this.http.post<IRestNote>('note', payload)
      : this.http.put<IRestNote>(`note/${this.note.id}`, payload);
    request.subscribe((response) => {
      this.note = response;
      this.edit = false;

      if (this.post) {
        this.noteChange.emit();
      }
    });
  }

  deleteNote(): void {
    this.http.delete(`note/${this.note.id}`)
      .subscribe(() => {
        this.noteChange.emit();
      });
  }
}
