import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
      {path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
