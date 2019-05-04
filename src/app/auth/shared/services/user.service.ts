import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;
// app
import {User} from '../models/user.model';

@Injectable()
export class UserService {
  private userKey = 'user';

  public get persistedUser(): User {
    return JSON.parse(localStorage.getItem(this.userKey));
  }

  constructor() {
  }

  public mapLoginResponse(userCreds: UserCredential): User {
    return {
      email: userCreds.user.email,
      id: userCreds.user.uid,
      authenticated: true,
      verified: userCreds.user.emailVerified
    };
  }

  public persistUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public removePersistedUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
