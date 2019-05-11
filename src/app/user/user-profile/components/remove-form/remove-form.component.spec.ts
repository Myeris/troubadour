import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
// app
import { RemoveFormComponent } from './remove-form.component';

describe('RemoveFormComponent', () => {
  let component: RemoveFormComponent;
  let fixture: ComponentFixture<RemoveFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        RemoveFormComponent
      ]
    });

    fixture = bed.createComponent(RemoveFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should emit an event to remove an account', () => {
    const spy = spyOn(component, 'removeAccount');
    component.removeAccount();
    expect(spy).toHaveBeenCalled();
  });
});
