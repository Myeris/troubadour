import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;
// app
import {User} from '../models/user.model';

@Injectable()
export class UserService {

  constructor() {
  }

  public mapLoginResponse(userCreds: UserCredential): User {
    return {
      email: userCreds.user.email,
      uid: userCreds.user.uid,
      authenticated: true,
      verified: userCreds.user.emailVerified
    };
  }
}
