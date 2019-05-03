import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app
import {PracticeSessionRoutingModule} from './practice-sessions-routing.module';
import { PracticeSessionsComponent } from './containers/practice-sessions/practice-sessions.component';

@NgModule({
  declarations: [PracticeSessionsComponent],
  imports: [
    CommonModule,
    PracticeSessionRoutingModule
  ]
})
export class PracticeSessionsModule {
}
