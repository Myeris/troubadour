import {TestBed} from '@angular/core/testing';
// app
import {UserService} from './user.service';
import UserCredential = firebase.auth.UserCredential;

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [UserService]
    });

    service = bed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapLoginResponse', () => {
    it('should return a User object', () => {
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          uid: '123',
          emailVerified: true
        }
      } as UserCredential;

      expect(service.mapLoginResponse(userCreds)).toEqual({
        email: 'email',
        id: '123',
        authenticated: true,
        verified: true
      });
    });
  });
});
