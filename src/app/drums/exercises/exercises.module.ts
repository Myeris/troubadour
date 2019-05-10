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

@NgModule({
  declarations: [ExercisesComponent, LibraryListComponent, ExerciseAssignComponent],
  exports: [ExercisesComponent, LibraryListComponent, ExerciseAssignComponent],
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
