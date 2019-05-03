import {TestBed} from '@angular/core/testing';
// app
import {PracticeSessionsResource} from './practice-sessions.resource';

describe('PracticeSessionsResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PracticeSessionsResource = TestBed.get(PracticeSessionsResource);
    expect(service).toBeTruthy();
  });
});
