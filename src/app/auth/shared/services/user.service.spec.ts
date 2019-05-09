import { TestBed } from '@angular/core/testing';
// app
import { UserService } from './user.service';
import { User } from '../models/user.model';
import UserCredential = firebase.auth.UserCredential;

const user: User = {
  email: 'email',
  id: '123',
  verified: true,
  authenticated: true
} as User;

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [UserService]
    });

    service = bed.get(UserService);
    localStorage.removeItem('user');
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

  describe('persistUser', () => {
    it('should add the user to the local storage', () => {
      expect(service.persistedUser).toBeNull();
      service.persistUser(user);
      expect(service.persistedUser).toBeDefined();
      expect(service.persistedUser).toEqual(user);
    });
  });

  describe('getPersistedUser', () => {
    it('should retrieve the persisted user', () => {
      expect(service.persistedUser).toBeNull();
      service.persistUser(user);
      expect(service.persistedUser).toBeDefined();
      expect(service.persistedUser).toEqual(user);
    });
  });

  describe('removePersistedUser', () => {
    it('should remove the persistedUser', () => {
      expect(service.persistedUser).toBeNull();
      service.persistUser(user);
      expect(service.persistedUser).toBeDefined();
      expect(service.persistedUser).toEqual(user);
      service.removePersistedUser();
      expect(service.persistedUser).toBeNull();
    });
  });
});
