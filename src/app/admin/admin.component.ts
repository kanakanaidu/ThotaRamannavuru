import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: typedef
  async getUser() {
    const userId = firebase.auth().currentUser.uid;
    const snapshot = await firebase.database().ref('/users/' + userId).once('value');
    const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  }

  ngOnInit(): void {
    this.getUser();
  }

}
