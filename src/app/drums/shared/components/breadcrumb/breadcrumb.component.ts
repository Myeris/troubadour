import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// app
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['breadcrumb.component.scss'],
  templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent {
  @Input() public breadcrumb: Breadcrumb;

  constructor(private router: Router) {
  }

  public navigate() {
    this.router.navigate([this.breadcrumb.route, this.breadcrumb.params]);
  }
}
