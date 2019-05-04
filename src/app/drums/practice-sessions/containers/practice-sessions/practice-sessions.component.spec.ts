import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {StoreModule} from '@ngrx/store';
// app
import {PracticeSessionsComponent} from './practice-sessions.component';
import {appReducers} from '../../../../store/app.reducer';
import {SearchPipe} from '../../../shared/pipes/search/search.pipe';

describe('PracticeSessionsComponent', () => {
  let component: PracticeSessionsComponent;
  let fixture: ComponentFixture<PracticeSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        NgxPaginationModule,
        StoreModule.forRoot({...appReducers})
      ],
      declarations: [PracticeSessionsComponent, SearchPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
