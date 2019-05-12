import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
// app
import { Tag } from '../../../shared/models/tag.model';
import { Tab } from '../../../shared/models/tab.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnChanges {
  public toggled = false;
  public assignOpen = false;
  public tabType: Tag;

  @Input() public tab: Tab;
  @Input() public sessions: PracticeSession[];
  @Input() public types: Tag[];

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tab && this.types) {
      const types = this.types.filter(t => t.name === this.tab.type);

      if (types.length && types.length === 1) {
        this.tabType = types[0];
      }
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public assignExercise(): void {
    window.scrollTo(0, 0);
    this.assignOpen = true;
  }

  public onUpdate(session: PracticeSession): void {
    let params = ['practice-sessions', 'new'];

    if (session) {
      params = ['practice-sessions', session.$key, 'edit'];
    }

    this.router.navigate(params, { queryParams: { exercise: this.tab.$key } });
  }

  public onCancel(): void {
    this.assignOpen = false;
  }
}
