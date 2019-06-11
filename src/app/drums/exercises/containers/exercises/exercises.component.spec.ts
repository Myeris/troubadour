import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
// app
import { ExercisesComponent } from './exercises.component';
import { Tag } from '../../../shared/models/tag.model';
import { Tab } from '../../../shared/models/tab.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { SharedModule } from '../../../shared/shared.module';
import { appReducers } from '../../../../store/app.reducer';

const types: Tag[] = [
  { name: 'rolls', color: 'blue', weight: 0, $key: '1', $exist: () => true },
  { name: 'drags', color: 'red', weight: 1, $key: '2', $exist: () => true },
  { name: 'flams', color: 'green', weight: 3, $key: '3', $exist: () => true }
];
const tabs: Tab[] = [
  {
    name: 'Tab1',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [],
    $key: '1',
    $exist: () => true
  },
  {
    name: 'Tab2',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [],
    $key: '2',
    $exist: () => true
  },
  {
    name: 'Tab3',
    type: 'drags',
    drumkit: false,
    timeSignature: '4/4',
    notes: [],
    $key: '3',
    $exist: () => true
  }
];
const sessions: PracticeSession[] = [
  {
    name: 'Session1',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: '1',
    $exist: () => true
  },
  {
    name: 'Session2',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: '2',
    $exist: () => true
  },
  {
    name: 'Session3',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: '3',
    $exist: () => true
  }
];

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [ExercisesComponent],
      providers: [],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        SharedModule.forRoot(),
        StoreModule.forRoot({ ...appReducers }),
        NgxPaginationModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('h1')).nativeElement.textContent).toContain('Library');
    expect(el.query(By.css('.execises__types'))).toBeDefined();
    expect(el.query(By.css('.execises__list'))).toBeDefined();
    expect(el.query(By.css('.seach'))).toBeDefined();
    expect(el.query(By.css('library-list'))).toBeDefined();
  });

  it('should be init', () => {
    expect(component.filteredTabs$.toString()).toEqual(of(tabs).toString());
    expect(component.types$.toString()).toEqual(of(types).toString());
    expect(component.sessions$.toString()).toEqual(of(sessions).toString());
  });

  it('should be able to filter an exercise by type', () => {
    component.filter(types[0]);
    expect(component.activeFilter.toString()).toEqual(types[0].toString());

    component.filter(null);
    expect(component.activeFilter).toBeNull();

    component.filter(types[2]);
    expect(component.activeFilter).toEqual(types[2]);
  });
});
