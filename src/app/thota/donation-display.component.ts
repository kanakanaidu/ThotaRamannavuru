import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../core/user.model';
import { AuthService } from '../shared/auth.service';
import { DonationService } from '../shared/donation.service';

@Component({
  selector: 'app-donation-display',
  templateUrl: './donation-display.component.html',
  styleUrls: ['./donation-display.component.css']
})
export class DonationDisplayComponent implements OnInit {

  constructor(public service: DonationService,
              private auth: AuthService,
              private afs: AngularFirestore,
              private dialogRef: MatDialogRef<DonationDisplayComponent>) { }

  userPic: string;

  ngOnInit(): void {
    // this.userPic = this.service.form.value.photoURL;
    // if (this.userPic === 'N/A') {
    //   this.userPic = 'assets/img/users.png';
    // }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
