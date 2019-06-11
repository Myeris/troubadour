import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// app
import { AuthHeaderComponent } from './auth-header.component';
import { AppSharedModule } from '../../../../shared/shared.module';

describe('AuthHeaderComponent', () => {
  let component: AuthHeaderComponent;
  let fixture: ComponentFixture<AuthHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthHeaderComponent],
      imports: [AppSharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
