import {AngularFireAuth} from '@angular/fire/auth';
import {async, TestBed} from '@angular/core/testing';
import UserCredential = firebase.auth.UserCredential;
// app
import {AuthResource} from './auth.resource';
import {AuthRequest} from '../models/auth-request.model';

class AfAuthMock {
  public auth = {
    signInWithEmailAndPassword: () => true,
    createUserWithEmailAndPassword: () => true
  };
}

const req: AuthRequest = {email: 'email', password: 'password'};

describe('AuthResource', () => {
  let resource: AuthResource;
  let afAuth: AngularFireAuth;

  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        AuthResource,
        {provide: AngularFireAuth, useFactory: () => new AfAuthMock()}
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
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: true
        }
      } as UserCredential;

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
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: true
        }
      } as UserCredential;

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
});
