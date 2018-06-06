import { Injectable } from '@angular/core';
import {User} from "firebase";
import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {

  }
  loginUser(email: string, password: string): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signupUser(email: string, password: string): Promise<User> {
    try {
      const newUser: User = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/email`)
        .set(email);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

}
