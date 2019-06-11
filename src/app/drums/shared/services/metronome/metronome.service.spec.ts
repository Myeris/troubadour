import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { MetronomeService } from './metronome.service';
import { ExerciseService } from '../exercise/exercise.service';

class ExerciseServiceMock {}

describe('MetronomeService', () => {
  let service: MetronomeService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [MetronomeService, { provide: ExerciseService, useClass: ExerciseServiceMock }],
      imports: [RouterTestingModule]
    });

    service = bed.get(MetronomeService);
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });
});
