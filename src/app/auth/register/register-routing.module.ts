import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// app
import {RegisterComponent} from './containers/register/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
