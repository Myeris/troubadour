import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { ListSessionComponent } from './list-session.component';
import { SharedModule } from '../../../shared/shared.module';
import { PracticeSession } from '../../../shared/models/practice-session.model';

const session: PracticeSession = {
  name: 'Session1',
  exercises: [],
  repeat: 1,
  created: new Date().valueOf(),
  updated: new Date().valueOf(),
  shared: false,
  drumkit: false,
  duration: 60,
  $key: '1',
  $exist: () => true
};

describe('ListSessionComponent', () => {
  let component: ListSessionComponent;
  let fixture: ComponentFixture<ListSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [ListSessionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSessionComponent);
    component = fixture.componentInstance;
    component.session = session;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeSession', () => {
    it('should emit an event upon requesting a session deletion', () => {
      const spy = spyOn(component.remove, 'emit').and.callThrough();
      component.session = session;
      component.removeSession();
      expect(spy).toHaveBeenCalledWith(session);
    });
  });

  describe('toggle', () => {
    it('should toggle the confirmation message', () => {
      expect(component.toggled).toBeFalsy();
      component.toggle();
      expect(component.toggled).toBeTruthy();
      component.toggle();
      expect(component.toggled).toBeFalsy();
    });
  });
});
