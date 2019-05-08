import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionFormComponent } from './practice-session-form.component';

describe('PracticeSessionFormComponent', () => {
  let component: PracticeSessionFormComponent;
  let fixture: ComponentFixture<PracticeSessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
