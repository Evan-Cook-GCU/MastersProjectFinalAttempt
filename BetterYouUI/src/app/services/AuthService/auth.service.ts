import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // Sign up with email and password
  signUp(email: string, password: string) {
    return this.afAuth['createUserWithEmailAndPassword'](email, password);
  }

  // Sign in with email and password
  signIn(email: string, password: string) {
    return this.afAuth['signInWithEmailAndPassword'](email, password);
  }

  // Sign out
  signOut() {
    return this.afAuth['signOut']();
  }

  // Get the currently authenticated user
  getCurrentUser() {
    return this.afAuth.authState;
  }
  signInWithGoogle(): Promise<any> {
    return this.afAuth['signInWithPopup'](new GoogleAuthProvider());
  }

  // signOut(): Promise<void> {
  //   return this.afAuth['signOut']();
  // }

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
}
