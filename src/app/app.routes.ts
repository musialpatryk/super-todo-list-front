import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {NotesComponent} from "./views/notes/notes.component";
import {GroupsComponent} from "./views/groups/groups.component";
import {AccountComponent} from "./views/account/account.component";

export const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: PageNotFoundComponent },
];
