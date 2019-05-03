import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionsComponent } from './practice-sessions.component';

describe('PracticeSessionsComponent', () => {
  let component: PracticeSessionsComponent;
  let fixture: ComponentFixture<PracticeSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
