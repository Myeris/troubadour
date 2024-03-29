import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Output() public loggingOut: EventEmitter<void> = new EventEmitter<void>();

  public logout(): void {
    this.loggingOut.emit();
  }
}
