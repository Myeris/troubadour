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
      declarations: [RemoveFormComponent]
    });

    fixture = bed.createComponent(RemoveFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('toggle', () => {
    it('should toggle the toggled property', () => {
      expect(component.toggled).toBeFalsy();
      component.toggle();
      expect(component.toggled).toBeTruthy();
      component.toggle();
      expect(component.toggled).toBeFalsy();
    });
  });

  describe('removeAccount', () => {
    it('should emit an event to remove an account', () => {
      spyOn(component.removeUser, 'emit').and.callThrough();
      component.removeAccount();
      expect(component.removeUser.emit).toHaveBeenCalled();
    });
  });
});
