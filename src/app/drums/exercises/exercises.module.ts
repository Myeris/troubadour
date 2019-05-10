import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material';
// app
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from './containers/exercises/exercises.component';
import { SharedModule } from '../shared/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { ExerciseAssignComponent } from './components/exercise-assign/exercise-assign.component';
import { ExerciseComponent } from './containers/exercise/exercise.component';
import { ExerciseDisplayComponent } from './components/exercise-display/exercise-display.component';
import { ExercisePracticeFormComponent } from './components/exercise-practice-form/exercise-practice-form.component';

@NgModule({
  declarations: [
    ExercisesComponent,
    LibraryListComponent,
    ExerciseAssignComponent,
    ExerciseComponent,
    ExerciseDisplayComponent,
    ExercisePracticeFormComponent
  ],
  exports: [
    ExercisesComponent,
    LibraryListComponent,
    ExerciseAssignComponent,
    ExerciseDisplayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule,
    ExercisesRoutingModule,
    SharedModule,
    AppSharedModule
  ]
})
export class ExercisesModule {
}
