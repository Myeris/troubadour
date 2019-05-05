import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
// app
import {PracticeSessionComponent} from './practice-session.component';
import {appReducers} from '../../../../store/app.reducer';

describe('PracticeSessionComponent', () => {
  let component: PracticeSessionComponent;
  let fixture: ComponentFixture<PracticeSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSessionComponent],
      imports: [StoreModule.forRoot(appReducers), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
