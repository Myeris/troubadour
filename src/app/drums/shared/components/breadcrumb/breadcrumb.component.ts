import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['breadcrumb.component.scss'],
  templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent {
  @Input() public breadcrumb: { label: string, route: string[] };
}
