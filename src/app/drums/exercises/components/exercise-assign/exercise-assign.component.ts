import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { Tab } from '../../../shared/models/tab.model';

@Component({
  selector: 'app-exercise-assign',
  templateUrl: './exercise-assign.component.html',
  styleUrls: ['./exercise-assign.component.scss']
})
export class ExerciseAssignComponent {

  public selected: string;

  @Input() public sessions: PracticeSession[];
  @Input() public tab: Tab;

  @Output() public update = new EventEmitter<PracticeSession>();
  @Output() public cancel = new EventEmitter<any>();

  public updateAssign(): void {
    const session = this.sessions.filter(s => s.$key === this.selected);

    if (!session.length) {
      throw new Error('Session not found');
    }
    if (session.length > 1) {
      throw new Error('Session key not unique');
    }

    this.update.emit(this.sessions.filter(s => s.$key === this.selected)[0]);
  }

  public cancelAssign(): void {
    this.cancel.emit();
  }

  public toggleItem(key: string): void {
    this.selected = this.exists(key) ? '' : key;
  }

  public exists(key: string): boolean {
    return this.selected === key;
  }

}
