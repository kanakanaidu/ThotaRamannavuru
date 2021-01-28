import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DonationService } from '../shared/donation.service';
import { NotificationService } from '../shared/notification.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewDonationComponent implements OnInit {

  date = new FormControl(moment());
  // donationForm: FormGroup;

  constructor(public service: DonationService,
              private dialogRef: MatDialog,
              private notificationService: NotificationService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.date.setValue(moment());
    this.service.getDonations();
  }

  // tslint:disable-next-line: typedef
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  // tslint:disable-next-line: typedef
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  // tslint:disable-next-line: typedef
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    console.log(this.date.value);
    // if (this.dService.form.valid) {
    if (!this.service.form.get('$key').value) {
    this.service.insertDonation(this.service.form.value);
    this.notificationService.success(this.service.form.get('donorName').value + ' record saved successfully!!!');
    } else {
      // this.service.updateDonation(this.donationForm.value);
      this.notificationService.success(this.service.form.get('donorName').value + ' record updated successfully!!!');
    }
    this.service.form.reset();
    // this.dService.initializeFormGroup();
    this.onClose();
    // }
  }

  // tslint:disable-next-line: typedef
  onClose() {
    this.service.form.reset();
    this.dialogRef.closeAll();
  }

}
