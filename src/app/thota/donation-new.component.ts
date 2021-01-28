import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DonationService } from '../shared/donation.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-donation-new',
  templateUrl: './donation-new.component.html',
  styleUrls: ['./donation-new.component.css'],
  encapsulation: ViewEncapsulation.None // to add custom style to tooltip
})
export class DonationNewComponent implements OnInit {

  monthYearArray = [];

  constructor(public service: DonationService,
              private notifyService: NotificationService,
              private dialogRef: MatDialogRef<DonationNewComponent>) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.service.getDonations();
    this.monthYearArray = [] = this.service.checkDonation();
  }

  // tslint:disable-next-line: typedef
  checkMonthYear() {
    if (this.service.form.controls.donationMonth.value && this.service.form.controls.donationYear.value) {
      this.monthYearArray = [] = this.service.checkDonation();
      const selectedMonthYear = this.service.form.controls.donationMonth.value + ' ' + this.service.form.controls.donationYear.value;
      if (this.monthYearArray.indexOf(selectedMonthYear)) {
        // alert('selected month ' + selectedMonthYear + ' already booked');
        return 'selected month ' + selectedMonthYear + ' already booked';
      }
    }
  }

  // tslint:disable-next-line: typedef
  getErrorMessage() {
    if (this.service.form.controls.donationMonth.hasError('required')) {
      return 'You must select month';
    }
    if (this.service.form.controls.donationYear.hasError('required')) {
      return 'You must select Year';
    }

    const monthYearWarn = this.checkMonthYear();
    if (monthYearWarn) {
    return monthYearWarn;
    }
  }
  // tslint:disable-next-line: typedef
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notifyService.success('Form cleared successfully!!!');
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    if (this.service.form.valid) {
      const donationMonthYear = this.service.form.controls.donationMonth.value + ' ' + this.service.form.controls.donationYear.value;
      this.service.form.controls.monthYear.setValue(donationMonthYear);
      if (!this.service.form.get('$key').value) {
        this.service.insertDonation(this.service.form.value);
        this.notifyService.success(this.service.form.get('donorName').value + ' record saved successfully!!!');
        this.onClose();
      }
      else {
        this.service.updateEmployee(this.service.form.value);
        this.notifyService.success(this.service.form.get('donorName').value + ' record updated successfully');
        this.onClose();
      }
    }
  }

  // tslint:disable-next-line: typedef
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
