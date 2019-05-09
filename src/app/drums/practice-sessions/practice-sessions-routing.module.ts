import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// app
import { PracticeSessionsComponent } from './containers/practice-sessions/practice-sessions.component';
import { PracticeSessionComponent } from './containers/practice-session/practice-session.component';

const routes: Route[] = [
  { path: '', component: PracticeSessionsComponent },
  { path: 'new', component: PracticeSessionComponent },
  { path: ':id', component: PracticeSessionComponent },
  { path: ':id/edit', component: PracticeSessionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeSessionRoutingModule {
}
