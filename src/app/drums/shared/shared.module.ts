import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
// app
import { PracticeSessionsResource } from './resources/practice-sessions/practice-sessions.resource';
import { PracticeSessionsService } from './services/practice-sessions/practice-sessions.service';
import { SearchPipe } from './pipes/search/search.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OptionsPipe } from './pipes/options/options.pipe';
import { TabDisplayComponent } from './components/tab-display/tab-display.component';
import { TabsResource } from './resources/tabs/tabs.resource';
import { TabsService } from './services/tabs/tabs.service';
import { VexflowService } from './services/vexflow/vexflow.service';
import { ExerciseService } from './services/exercise/exercise.service';
import { MetronomeService } from './services/metronome/metronome.service';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { OrderTabsPipe } from './pipes/order-tabs/order-tabs.pipe';
import { AppSharedModule } from '../../shared/shared.module';
import { BpmDurationFormComponent } from './components/bpm-duration-form/bpm-duration-form.component';
import { BpmScaleFormComponent } from './components/bpm-scale-form/bpm-scale-form.component';
import { SoundOptionsComponent } from './components/sound-options/sound-options.component';
import { MetronomeSettingsComponent } from './components/metronome-settings/metronome-settings.component';
import { NumberToCollectionPipe } from './pipes/number-to-collection/number-to-collection.pipe';
import { NoteCountPipe } from './pipes/note-count/note-count.pipe';
import { TypesResource } from './resources/types/types.resource';
import { TypesService } from './services/types/types.service';
import { HandFormComponent } from './components/hand-form/hand-form.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { TimerPipe } from './pipes/timer/timer.pipe';
import { HighscoresService } from './services/highscores/highscores.service';
import { HighscoresResource } from './resources/highscores/highscores.resource';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { ToFailureFormComponent } from './components/to-failure-form/to-failure-form.component';
import { ToFailureResultComponent } from './components/to-failure-result/to-failure-result.component';

@NgModule({
  declarations: [
    SearchPipe,
    DurationPipe,
    OptionsPipe,
    OrderTabsPipe,
    NumberToCollectionPipe,
    NoteCountPipe,
    CapitalizePipe,
    TimerPipe,
    BreadcrumbComponent,
    TabDisplayComponent,
    ExerciseFormComponent,
    BpmDurationFormComponent,
    BpmScaleFormComponent,
    SoundOptionsComponent,
    MetronomeSettingsComponent,
    HandFormComponent,
    StopwatchComponent,
    ToFailureFormComponent,
    ToFailureResultComponent
  ],
  exports: [
    SearchPipe,
    DurationPipe,
    OptionsPipe,
    OrderTabsPipe,
    NumberToCollectionPipe,
    NoteCountPipe,
    CapitalizePipe,
    TimerPipe,
    BreadcrumbComponent,
    TabDisplayComponent,
    ExerciseFormComponent,
    BpmDurationFormComponent,
    BpmScaleFormComponent,
    SoundOptionsComponent,
    MetronomeSettingsComponent,
    HandFormComponent,
    StopwatchComponent,
    ToFailureFormComponent,
    ToFailureResultComponent
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
        HighscoresResource,
        HighscoresService,
        MetronomeService,
        PracticeSessionsResource,
        PracticeSessionsService,
        TabsResource,
        TabsService,
        TypesResource,
        TypesService,
        VexflowService
      ]
    };
  }
}
