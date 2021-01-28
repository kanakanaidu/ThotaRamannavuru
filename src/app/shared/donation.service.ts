import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import * as _ from 'lodash';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DonationService {
  donationList: AngularFireList<any>;
  donationTypeList: AngularFireList<any>;
  array = [];
  monthYearArray = [];
  maxId = 0;

  constructor(private fb: AngularFireDatabase, private auth: AuthService) {
    this.donationTypeList = this.fb.list('donationtypes');
    this.donationTypeList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(this.maxId),
    donorName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    donationDetails: new FormControl('', Validators.required),
    donationAmount: new FormControl('', Validators.required),
    donationStatus: new FormControl('1'),
    donationMonth: new FormControl('', Validators.required),
    donationYear: new FormControl('', Validators.required),
    monthYear: new FormControl(''),
    photoURL: new FormControl('')
  });

  // tslint:disable-next-line: typedef
  initializeFormGroup() {
    const displayName = sessionStorage.getItem('displayName');
    this.form.setValue({
      $key: null,
      id: this.maxId,
      donorName: displayName,
      email: '',
      mobileNo: '',
      donationDetails: 'దేవర ఎద్దు ఫోషణ',
      donationAmount: '4000',
      donationStatus: '1',
      donationMonth: '',
      donationYear: '',
      monthYear: '',
      photoURL: 'assets/img/users.png'
    });
  }

  // tslint:disable-next-line: typedef
  checkDonation() {
    this.donationList = this.fb.list('donations');
    this.donationList.snapshotChanges().subscribe(
      donation => {
        this.array = donation.map(d => {
          const currentId = d.payload.val().id;
          const monthYear = d.payload.val().monthYear;
          this.monthYearArray.push(monthYear);
          // alert(this.monthYearArray);
          if (currentId > this.maxId) {
            this.maxId = currentId;
          }
          return {
            $key: d.key,
            ...d.payload.val()
          };
        });
      });
    return this.monthYearArray;
  }

  // tslint:disable-next-line: typedef
  getDonations() {
    this.donationList = this.fb.list('donations');
    return this.donationList.snapshotChanges();
  }

  // tslint:disable-next-line: typedef
  insertDonation(donation) {
    let photoUrl = sessionStorage.getItem('photoURL');
    if (!photoUrl) {
      photoUrl = 'assets/img/users.png';
    }
    this.donationList.push({
      id: this.maxId + 1,
      donorName: donation.donorName,
      email: donation.email,
      donationDetails: donation.donationDetails,
      donationAmount: donation.donationAmount,
      mobileNo: donation.mobileNo,
      donationStatus: 'Pending',
      donationMonth: donation.donationMonth,
      donationYear: donation.donationYear,
      monthYear: donation.monthYear,
      photoURL: photoUrl
    });
  }

  // tslint:disable-next-line: typedef
  updateEmployee(donation) {
    let photoUrl = sessionStorage.getItem('photoURL');
    if (!photoUrl) {
      photoUrl = 'assets/img/users.png';
    }
    this.donationList.update(donation.$key,
      {
        donorName: donation.donorName,
        email: donation.email,
        donationDetails: donation.donationDetails,
        donationAmount: donation.donationAmount,
        mobileNo: donation.mobileNo,
        donationStatus: '1',
        donationMonth: donation.donationMonth,
        donationYear: donation.donationYear,
        monthYear: donation.monthYear,
        photoURL: photoUrl
      });
  }

  // tslint:disable-next-line: typedef
  deleteEmployee($key: string) {
    this.donationList.remove($key);
  }

  // tslint:disable-next-line: typedef
  populateForm(donation) {
    // this.form.setValue(_.omit(donation, 'donationDetails'));
    this.form.setValue(donation);
  }

  // tslint:disable-next-line: typedef
  getDonationMonth($key) {
    if ($key === '0') {
      return '';
    }
    else {
      return _.find(this.array, (obj) => obj.$key === $key).donationDetails;
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
