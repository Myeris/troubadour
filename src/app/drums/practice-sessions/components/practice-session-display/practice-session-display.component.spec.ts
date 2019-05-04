import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionDisplayComponent } from './practice-session-display.component';

describe('PracticeSessionDisplayComponent', () => {
  let component: PracticeSessionDisplayComponent;
  let fixture: ComponentFixture<PracticeSessionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
