import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public error: string;
  public showEmailVerificationButton = false;

  constructor(private router: Router) {
  }

  public async loginUser(event: FormGroup): Promise<void> {
    console.log('TODO'); // TODO
  }

  public async resendVerificationEmail(): Promise<void> {
    console.log('TODO'); // TODO
  }
}
