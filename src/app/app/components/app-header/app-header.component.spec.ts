import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { AppHeaderComponent } from './app-header.component';
import { AppSharedModule } from '../../../shared/shared.module';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      imports: [MatIconModule, AppSharedModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should emit an event', () => {
      spyOn(component.loggingOut, 'emit').and.callThrough();
      component.logout();
      expect(component.loggingOut.emit).toHaveBeenCalledTimes(1);
    });
  });
});
