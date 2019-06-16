import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// app
import { SvgIconComponent } from './svg-icon.component';

describe('SvgIconComponent', () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgIconComponent],
      imports: [MatIconModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
