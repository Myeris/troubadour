import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
// app
import {PracticeSessionRoutingModule} from './practice-sessions-routing.module';
import {PracticeSessionsComponent} from './containers/practice-sessions/practice-sessions.component';
import {SharedModule} from '../shared/shared.module';
import {AppSharedModule} from '../../shared/shared.module';
import {ListSessionComponent} from './components/list-session/list-session.component';
import {PracticeSessionComponent} from './containers/practice-session/practice-session.component';
import { PracticeSessionDisplayComponent } from './components/practice-session-display/practice-session-display.component';

@NgModule({
  declarations: [PracticeSessionsComponent, ListSessionComponent, PracticeSessionComponent, PracticeSessionDisplayComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule,

    PracticeSessionRoutingModule,
    SharedModule,
    AppSharedModule
  ]
})
export class PracticeSessionsModule {
}
