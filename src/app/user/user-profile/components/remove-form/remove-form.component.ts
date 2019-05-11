import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-form',
  templateUrl: './remove-form.component.html',
  styleUrls: ['./remove-form.component.scss']
})
export class RemoveFormComponent {

  public toggled = false;

  @Output() public removeUser: EventEmitter<void> = new EventEmitter<void>();

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public removeAccount(): void {
    this.removeUser.emit();
  }
}
