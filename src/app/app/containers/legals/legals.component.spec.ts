import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { LegalsComponent } from './legals.component';

describe('LegalsComponent', () => {
  let component: LegalsComponent;
  let fixture: ComponentFixture<LegalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegalsComponent],
      imports: [BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
