import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app
import {PracticeSessionsResource} from './resources/practice-sessions/practice-sessions.resource';
import {PracticeSessionsService} from './services/practice-sessions/practice-sessions.service';
import {SearchPipe} from './pipes/search/search.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';

@NgModule({
  declarations: [SearchPipe, DurationPipe],
  exports: [SearchPipe, DurationPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PracticeSessionsResource,
        PracticeSessionsService
      ]
    };
  }
}
