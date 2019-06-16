import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export class LifecycleComponent implements OnDestroy {
  protected componentDestroyed$: Subject<null> = new Subject();

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.unsubscribe();
  }
}
