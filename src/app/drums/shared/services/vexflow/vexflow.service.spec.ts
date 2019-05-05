import { TestBed } from '@angular/core/testing';

import { VexflowService } from './vexflow.service';

describe('VexflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VexflowService = TestBed.get(VexflowService);
    expect(service).toBeTruthy();
  });
});
