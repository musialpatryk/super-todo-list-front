import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IRestGroup, IRestNote} from '../../services/rest/rest.interfaces';
import {FormControl} from '@angular/forms';

const SortingStates = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
} as const;

type SortingOptions =  typeof SortingStates[keyof typeof SortingStates];

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: IRestNote[] = [];
  groups: IRestGroup[] = [];
  currentGroup!: IRestGroup;
  loading = true;
  sortingAlreadyChanges = false;
  sortingControl = new FormControl(SortingStates.NONE);

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.initializeGroupsAndNotes();
    this.initializeSorting();
  }

  private initializeSorting(): void {
    this.sortingControl.valueChanges
      .subscribe((value: SortingOptions) => {
        this.sortingAlreadyChanges = true;

        switch (value) {
          case SortingStates.ASC: {
            this.notes.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            break;
          }
          case SortingStates.DESC: {
            this.notes.sort((a, b) => {
              return -a.name.localeCompare(b.name);
            });
            break;
          }
          case SortingStates.NONE: {
            this.sortingAlreadyChanges = false;
            break;
          }
        }
      });
  }

  private initializeGroupsAndNotes(): void {
    this.http.get<IRestGroup[]>('group')
      .subscribe((groups) => {
        this.groups = groups;

        if (!groups?.length) {
          this.loading = false
          return;
        }

        this.currentGroup = this.groups[0];
        this.reloadNotes();
      });
  }

  reloadNotes(): void {
    const params = new HttpParams().set('group', this.currentGroup.id);

    this.loading = true;
    this.http.get<IRestNote[]>('note', {params})
      .subscribe((notes) => {
        this.notes = notes;
        this.sortingControl.setValue('none');
        this.loading = false;
      })
  }
}
