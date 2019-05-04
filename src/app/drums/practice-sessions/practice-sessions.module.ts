import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
// app
import {PracticeSessionRoutingModule} from './practice-sessions-routing.module';
import {PracticeSessionsComponent} from './containers/practice-sessions/practice-sessions.component';
import {SharedModule} from '../shared/shared.module';
import {AppSharedModule} from '../../shared/shared.module';
import {MatIconModule} from '@angular/material';
import { ListSessionComponent } from './components/list-session/list-session.component';

@NgModule({
  declarations: [PracticeSessionsComponent, ListSessionComponent],
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
