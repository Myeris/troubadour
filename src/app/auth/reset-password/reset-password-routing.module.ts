import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// app
import {ResetPasswordComponent} from './containers/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule {
}
