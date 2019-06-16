import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { LegalsComponent } from './containers/legals/legals.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'practice-sessions' },
  { path: 'legals', component: LegalsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
