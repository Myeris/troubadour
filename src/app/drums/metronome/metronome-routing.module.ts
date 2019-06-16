import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// app
import { MetronomeComponent } from './containers/metronome/metronome.component';

const routes: Route[] = [{ path: '', component: MetronomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetronomeRoutingModule {}
