import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor() {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    year: new FormControl(''),
    month: new FormControl(''),
    donation: new FormControl(''),
    amount: new FormControl(''),
    donationStatus: new FormControl('')
  });

  getEmployees() {
    return 'get employees';
  }
}
