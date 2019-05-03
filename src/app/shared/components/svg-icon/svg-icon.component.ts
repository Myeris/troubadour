import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() name: string;
  @Input() path: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      this.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.path)
    );
  }
}
