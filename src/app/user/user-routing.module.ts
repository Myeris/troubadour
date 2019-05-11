import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// app
import { AuthGuard } from '../auth/shared/guards/auth/auth.guard';

export const routes: Route[] = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: './user-profile/user-profile.module#UserProfileModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
