import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app
import {PracticeSessionsResource} from './resources/practice-sessions/practice-sessions.resource';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PracticeSessionsResource
      ]
    };
  }
}
