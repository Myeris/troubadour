import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
// app
import {PracticeSessionsResource} from './resources/practice-sessions/practice-sessions.resource';
import {PracticeSessionsService} from './services/practice-sessions/practice-sessions.service';
import {SearchPipe} from './pipes/search/search.pipe';
import {DurationPipe} from './pipes/duration/duration.pipe';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {OptionsPipe} from './pipes/options/options.pipe';
import {TabDisplayComponent} from './components/tab-display/tab-display.component';
import {TabsResource} from './resources/tabs/tabs.resource';
import {TabsService} from './services/tabs/tabs.service';
import {VexflowService} from './services/vexflow/vexflow.service';
import {ExerciseService} from './services/exercise/exercise.service';
import {MetronomeService} from './services/metronome/metronome.service';
import {ExerciseFormComponent} from './components/exercise-form/exercise-form.component';
import {OrderTabsPipe} from './pipes/order-tabs/order-tabs.pipe';
import {AppSharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    SearchPipe,
    DurationPipe,
    OptionsPipe,
    OrderTabsPipe,
    BreadcrumbComponent,
    TabDisplayComponent,
    ExerciseFormComponent
  ],
  exports: [
    SearchPipe,
    DurationPipe,
    OptionsPipe,
    OrderTabsPipe,
    BreadcrumbComponent,
    TabDisplayComponent,
    ExerciseFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    NgxPaginationModule,
    AppSharedModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ExerciseService,
        MetronomeService,
        PracticeSessionsResource,
        PracticeSessionsService,
        TabsResource,
        TabsService,
        VexflowService
      ]
    };
  }
}
