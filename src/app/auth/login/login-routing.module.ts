import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// app
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
