import { AngularFireAuth } from '@angular/fire/auth';
import { async, TestBed } from '@angular/core/testing';
// app
import { AuthResource } from './auth.resource';
import { AuthRequest } from '../models/auth-request.model';
import { ChangePassword } from '../models/change-password.model';
import UserCredential = firebase.auth.UserCredential;

class AfAuthMock {
  public auth = {
    signInWithEmailAndPassword: () => true,
    createUserWithEmailAndPassword: () => true,
    currentUser: {
      updatePassword: () => true,
      delete: () => true
    }
  };
}

const userCreds: UserCredential = {
  user: {
    email: 'email',
    emailVerified: true
  }
} as UserCredential;
const req: AuthRequest = { email: 'email', password: 'old' };
const changePassword: ChangePassword = { old: 'old', new: 'new', confirmed: 'new' };

describe('AuthResource', () => {
  let resource: AuthResource;
  let afAuth: AngularFireAuth;

  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        AuthResource,
        { provide: AngularFireAuth, useFactory: () => new AfAuthMock() }
      ]
    });

    resource = bed.get(AuthResource);
    afAuth = bed.get(AngularFireAuth);
  }));

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('login', () => {
    it('should return a UserCredentials object on success', async(() => {
      spyOn(afAuth.auth, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve(userCreds));

      resource.login(req).then((res) => expect(res).toEqual(userCreds));

      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(req.email, req.password);
    }));

    it('should return a string on failure', async(() => {
      const error = 'this is an error';
      spyOn(afAuth.auth, 'signInWithEmailAndPassword').and.returnValue(Promise.reject(error));

      resource.login(req).catch((res) => expect(res).toEqual(error));

      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(req.email, req.password);
    }));
  });

  describe('register', () => {
    it('should return a UserCredentials object on success', async(() => {
      spyOn(afAuth.auth, 'createUserWithEmailAndPassword').and.returnValue(Promise.resolve(userCreds));

      resource.register(req).then((res) => expect(res).toEqual(userCreds));

      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(req.email, req.password);
    }));

    it('should return a string on failure', async(() => {
      const error = 'this is an error';
      spyOn(afAuth.auth, 'createUserWithEmailAndPassword').and.returnValue(Promise.reject(error));

      resource.register(req).catch((res) => expect(res).toEqual(error));

      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(req.email, req.password);
    }));
  });

  describe('changePassword', () => {
    it('should resolve the Promise', async(() => {
      spyOn(afAuth.auth.currentUser, 'updatePassword').and.returnValue(Promise.resolve());
      spyOn(resource, 'login').and.returnValue(afAuth.auth.currentUser.updatePassword(changePassword.new));

      resource.changePassword(userCreds.user.email, changePassword).then((res) => expect(res).toBeUndefined());

      expect(resource.login).toHaveBeenCalledTimes(1);
      expect(resource.login).toHaveBeenCalledWith(req);

      expect(afAuth.auth.currentUser.updatePassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.currentUser.updatePassword).toHaveBeenCalledWith(changePassword.new);
    }));

    it('should reject the Promise', async(() => {
      const error = 'error';
      spyOn(afAuth.auth.currentUser, 'updatePassword').and.returnValue(Promise.resolve(error));
      spyOn(resource, 'login').and.returnValue(Promise.resolve(afAuth.auth.currentUser.updatePassword(changePassword.new)));

      resource.changePassword(userCreds.user.email, changePassword).catch((res) => expect(res).toBeNull());

      expect(resource.login).toHaveBeenCalledTimes(1);
      expect(resource.login).toHaveBeenCalledWith(req);

      expect(afAuth.auth.currentUser.updatePassword).toHaveBeenCalledTimes(1);
      expect(afAuth.auth.currentUser.updatePassword).toHaveBeenCalledWith(changePassword.new);
    }));
  });

  describe('removeAccount', () => {
    it('should delete the account', () => {
      spyOn(afAuth.auth.currentUser, 'delete').and.callFake(() => Promise.resolve());

      resource.removeAccount();
      expect(afAuth.auth.currentUser.delete).toHaveBeenCalledTimes(1);
    });
  });
});
