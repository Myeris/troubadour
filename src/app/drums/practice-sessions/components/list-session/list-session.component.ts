import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PracticeSession} from '../../../shared/models/practice-session.model';

@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.scss']
})
export class ListSessionComponent {
  public toggled = false;

  @Input() public session: PracticeSession;
  @Output() public remove: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();

  public removeSession(): void {
    this.remove.emit(this.session);
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

}
