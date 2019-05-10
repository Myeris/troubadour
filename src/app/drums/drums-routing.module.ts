import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// app
import { AuthGuard } from '../auth/shared/guards/auth/auth.guard';

const routes: Route[] = [
  {
    path: 'practice-sessions',
    canActivate: [AuthGuard],
    loadChildren: './practice-sessions/practice-sessions.module#PracticeSessionsModule'
  },
  // {path: 'exercises', canActivate: [AuthGuard], loadChildren: './exercises/exercises.module#ExercisesModule'},
  { path: 'metronome', canActivate: [AuthGuard], loadChildren: './metronome/metronome.module#MetronomeModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrumsRoutingModule {
}
