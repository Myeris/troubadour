import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
// app
import {PracticeSessionDisplayComponent} from './practice-session-display.component';
import {SharedModule} from '../../../shared/shared.module';
import {PracticeSession} from '../../../shared/models/practice-session.model';

const session: PracticeSession = {
  name: 'Single beat combination',
  exercises: [],
  repeat: 1,
  created: new Date().valueOf(),
  updated: new Date().valueOf(),
  shared: false,
  drumkit: false,
  $key: 'a',
  $exist: () => true
};

describe('PracticeSessionDisplayComponent', () => {
  let component: PracticeSessionDisplayComponent;
  let fixture: ComponentFixture<PracticeSessionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSessionDisplayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionDisplayComponent);
    component = fixture.componentInstance;
    component.session = session;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
