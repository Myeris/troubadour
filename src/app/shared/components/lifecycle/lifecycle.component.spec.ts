import {ComponentFixture, TestBed} from '@angular/core/testing';
// app
import {LifecycleComponent} from './lifecycle.component';

const componentDestroyed$ = 'componentDestroyed$';

describe('LifecycleComponent', () => {
  let fixture: ComponentFixture<LifecycleComponent>;
  let component: LifecycleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifecycleComponent]
    });

    fixture = TestBed.createComponent(LifecycleComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate properly', () => expect(component).toBeTruthy());

  it('should terminate the Subject on OnDestroy', () => {
    expect(component[componentDestroyed$].closed).toEqual(false);
    expect(component[componentDestroyed$].isStopped).toEqual(false);

    fixture.destroy();

    expect(component[componentDestroyed$].closed).toEqual(true);
    expect(component[componentDestroyed$].isStopped).toEqual(true);
  });
});
