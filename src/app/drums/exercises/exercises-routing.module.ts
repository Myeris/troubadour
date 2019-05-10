import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// app
import { ExercisesComponent } from './containers/exercises/exercises.component';

export const routes: Route[] = [
  { path: '', component: ExercisesComponent }
  // { path: ':id', component: ExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {
}
