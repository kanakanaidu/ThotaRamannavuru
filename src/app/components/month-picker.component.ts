import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {

  @Output() monthRangeSelected = new EventEmitter<string>();

  constructor(public dialogRef: MatDialogRef<MonthPickerComponent>) {}

  currentYearIndex: number;
  years: Array<number>;
  months: Array<string>;
  monthsData: Array<{
    monthName: string,
    monthYear: number,
    isInRange: boolean,
    isLowerEdge: boolean,
    isUpperEdge: boolean
  }>;
  rangeIndexes: Array<number>;
  monthViewSlicesIndexes: Array<number>;
  monthDataSlice: Array<{
    monthName: string,
    monthYear: number,
    isInRange: boolean,
    isLowerEdge: boolean,
    isUpperEdge: boolean
  }>;
  globalIndexOffset: number;

  // tslint:disable-next-line: typedef
  onClick(indexClicked) {
    if (this.rangeIndexes[0] === null) {
      this.rangeIndexes[0] = this.globalIndexOffset + indexClicked;
    } else
      if (this.rangeIndexes[1] === null) {
        this.rangeIndexes[1] = this.globalIndexOffset + indexClicked;
        this.rangeIndexes.sort((a, b) => a - b);
        this.monthsData.forEach((month, index) => {
          if ((this.rangeIndexes[0] <= index) && (index <= this.rangeIndexes[1])) {
            month.isInRange = true;
          }
          if (this.rangeIndexes[0] === index) {
            month.isLowerEdge = true;
          }
          if (this.rangeIndexes[1] === index) {
            month.isUpperEdge = true;
          }
        });
        const fromMonthYear = this.monthsData[this.rangeIndexes[0]];
        const toMonthYear = this.monthsData[this.rangeIndexes[1]];
        const rangeFrom = `${fromMonthYear.monthName} ${fromMonthYear.monthYear}`;
        const rangeTo = `${toMonthYear.monthName} ${toMonthYear.monthYear}`;

        this.emitData('Range is: ' + rangeFrom + ' to ' + rangeTo);
      } else {
        this.initRangeIndexes();
        this.initMonthsData();
        this.onClick(indexClicked);
        this.sliceDataIntoView();
      }
  }

  // tslint:disable-next-line: typedef
  emitData(value: string) {
    this.monthRangeSelected.emit(value);
    // this.dialogRef.close();
  }

  // tslint:disable-next-line: typedef
  sliceDataIntoView() {
    this.globalIndexOffset = this.monthViewSlicesIndexes[this.currentYearIndex];
    this.monthDataSlice = this.monthsData.slice(this.globalIndexOffset, this.globalIndexOffset + 24);
  }

  // tslint:disable-next-line: typedef
  incrementYear() {
    if (this.currentYearIndex !== this.years.length - 1) {
      this.currentYearIndex++;
      this.sliceDataIntoView();
    }
  }

  // tslint:disable-next-line: typedef
  decrementYear() {
    if (this.currentYearIndex !== 0) {
      this.currentYearIndex--;
      this.sliceDataIntoView();
    }
  }

  // tslint:disable-next-line: typedef
  initRangeIndexes() {
    this.rangeIndexes = [null, null];
  }

  // tslint:disable-next-line: typedef
  initMonthsData() {
    this.monthsData = new Array();
    this.years.forEach(year => {
      this.months.forEach(month => {
        this.monthsData.push({
          monthName: month,
          monthYear: year,
          isInRange: false,
          isLowerEdge: false,
          isUpperEdge: false
        });
      });
    });
  }

  // tslint:disable-next-line: typedef
  initYearLabels() {
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    this.years = range(currentYear - 1, currentYear + 5, 1);
  }

  // tslint:disable-next-line: typedef
  initMonthLabels() {
    this.months = new Array(12).fill(0).map((_, i) => {
      return new Date(`${i + 1}/1`).toLocaleDateString(undefined, { month: 'short' });
    });
  }

  // tslint:disable-next-line: typedef
  initViewSlices() {
    this.monthViewSlicesIndexes = [];
    this.years.forEach((year, index) => {
      if (index === 0) { this.monthViewSlicesIndexes.push(0); } else
        if (index === 1) { this.monthViewSlicesIndexes.push(6); } else {
          this.monthViewSlicesIndexes.push(this.monthViewSlicesIndexes[index - 1] + 12);
        }
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.initYearLabels();
    this.initMonthLabels();
    this.initViewSlices();
    this.initMonthsData();
    this.initRangeIndexes();
    this.currentYearIndex = this.years.findIndex(year => year === (new Date()).getFullYear());
    this.sliceDataIntoView();
  }

}
