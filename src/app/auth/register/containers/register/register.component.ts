import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public error: string;

  constructor(private router: Router) {
  }

  public async registerUser(event: FormGroup): Promise<void> {
    console.log('TODO'); // TODO
  }
}
