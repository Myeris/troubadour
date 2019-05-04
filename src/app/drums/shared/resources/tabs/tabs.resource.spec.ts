import { TestBed } from '@angular/core/testing';

import { TabsResource } from './tabs.resource';

describe('TabsResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabsResource = TestBed.get(TabsResource);
    expect(service).toBeTruthy();
  });
});
