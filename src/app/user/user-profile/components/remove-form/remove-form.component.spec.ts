import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should toggle the confirmation message on remove button click', async () => {
    el.query(By.css('.button--delete')).nativeElement.click();
    expect(component.toggled).toBeTruthy();

    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.query(By.css('p')).nativeElement.textContent)
      .toContain('Are you sure you want to delete your account? This action is irreversible.');

    component.toggle();
    expect(component.toggled).toBeFalsy();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.query(By.css('p')).nativeElement).toBeNull();
  });

  it('should emit an event to remove an account', () => {
    const spy = spyOn(component, 'removeAccount');
    component.removeAccount();
    expect(spy).toHaveBeenCalled();
  });
});
