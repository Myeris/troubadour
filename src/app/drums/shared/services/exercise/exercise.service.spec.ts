import { TestBed } from '@angular/core/testing';
// app
import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [ExerciseService]
    });

    service = bed.get(ExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getExerciseDuration', () => {
    it('should be able to get the exercises duration', () => {
      let duration = service.getExerciseDuration('4/4', 1, 60);
      expect(duration).toBe(4);

      duration = service.getExerciseDuration('4/4', 60, 60);
      expect(duration).toBe(240);
    });
  });
});
