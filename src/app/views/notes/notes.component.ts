import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IRestGroup, IRestNote} from '../../services/rest/rest.interfaces';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: IRestNote[] = [];
  groups: IRestGroup[] = [];
  currentGroup!: IRestGroup;
  loading = false;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<IRestGroup[]>('group')
      .subscribe((groups) => {
        this.groups = groups;
        if (groups?.length) {
          this.currentGroup = this.groups[0];
          this.reloadNotes();
        }
        this.loading = false
      });
  }

  reloadNotes(): void {
    const params = new HttpParams().set('group', this.currentGroup.id);

    this.loading = true;
    this.http.get<IRestNote[]>('note', {params})
      .subscribe((notes) => {
        this.notes = notes;
        this.loading = false;
      })
  }
}
