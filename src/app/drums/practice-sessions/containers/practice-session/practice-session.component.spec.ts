import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
// app
import {PracticeSessionComponent} from './practice-session.component';
import {appReducers} from '../../../../store/app.reducer';

describe('PracticeSessionComponent', () => {
  let component: PracticeSessionComponent;
  let router: Router;
  let fixture: ComponentFixture<PracticeSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSessionComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        RouterTestingModule.withRoutes([{
          path: 'practice-sessions', component: class BlankComponent {
          }
        }])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('backToPracticeSessions', () => {
    it('should call router', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      (component as any).backToPracticeSessions();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['practice-sessions']);
    });
  });
});
