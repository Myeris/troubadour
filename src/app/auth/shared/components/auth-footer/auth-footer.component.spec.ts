import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFooterComponent } from './auth-footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthFooterComponent', () => {
  let component: AuthFooterComponent;
  let fixture: ComponentFixture<AuthFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFooterComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
