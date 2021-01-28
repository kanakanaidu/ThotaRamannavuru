import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../core/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private fb: AngularFireDatabase,
              private notifyService: NotificationService,
              private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          // return this.fb.list('users').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    sessionStorage.setItem('displayName', credential.user.displayName);
    sessionStorage.setItem('photoURL', credential.user.photoURL);
    // alert(credential.user.displayName);
    this.notifyService.success('Dear ' + credential.user.displayName + ' weclome !!!');
    // alert(credential.user.phoneNumber);
    return this.updateUserData(credential.user);
  }

  // private updateUserData({ uid, email, displayName, photoURL }: User) {
  // tslint:disable-next-line: typedef
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // const userRef: AngularFirestoreDocument<User> = firebase.database().ref('users/' + uid);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
      // gender: user.gender,
      // nickname: user.nickname,
      // DOB: user.birthday,
      // phone: user.phone,
      // favoriteColor: user.favoriteColor
    };
    return userRef.set(data, { merge: true });
  }

  // tslint:disable-next-line: typedef
  async signOut() {
    await this.afAuth.signOut();
    sessionStorage.setItem('displayName', '');
    return this.router.navigate(['/']);
  }

  ///// Abilities and Roles Authorization /////
  //// Assign roles to an ability method ////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.CheckAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.CheckAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.CheckAuthorization(user, allowed);
  }

  // determines if user has matching some role
  private CheckAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
