import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRestNote} from '../../services/rest/rest.interfaces';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: IRestNote[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get<IRestNote[]>('note')
      .subscribe((notes) => {
        this.notes = notes;
      })
  }
}
