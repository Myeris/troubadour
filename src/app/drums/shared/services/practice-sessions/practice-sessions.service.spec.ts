import {TestBed} from '@angular/core/testing';
// app
import {PracticeSessionsService} from './practice-sessions.service';

describe('PracticeSessionsService', () => {
  let service: PracticeSessionsService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [PracticeSessionsService]
    });

    service = bed.get(PracticeSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
