import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DonationService } from '../shared/donation.service';
import { AuthService } from '../shared/auth.service';
import { NotificationService } from '../shared/notification.service';
import { DonationNewComponent } from './donation-new.component';
import { DonationDisplayComponent } from './donation-display.component';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.css']
})
export class DonationsListComponent implements OnInit {

  constructor(private service: DonationService,
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'donorName', 'donationDetails', 'donationAmount', 'monthYear', 'donationStatus', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  isShowBtn: boolean = true;
  isShowRaiseBtn: boolean = false;
  isPaid: number = 2;

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.service.getDonations().subscribe(
      list => {
        // tslint:disable-next-line: prefer-const
        let array = list.map(item => {
          // const donationData = this.service.getDonationMonth(item.payload.val()['donationDetails']);
          // if (item.payload.val().donationStatus == this.isPaid) {
            return {
              $key: item.key,
              // donationData,
              ...item.payload.val()
            };
          // }
          // else {
          //   return
          // }

        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);

        this.listData.paginator = this.paginator;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        //   });
        // };
      });
  }

  // tslint:disable-next-line: typedef
  onSearchClear() {
    this.searchKey = '';
    // this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  // tslint:disable-next-line: typedef
  donationBooking() {
    this.isShowBtn = !this.isShowBtn;
    this.isShowRaiseBtn = !this.isShowRaiseBtn;
    // this.isPaid = this.isPaid == 2 ? 1 : 2;
    // this.listData.data = this.listData.data;
    this.listData.filter = "Pending";
  }

  donationBooked() {
    this.isShowBtn = !this.isShowBtn;
    this.isShowRaiseBtn = !this.isShowRaiseBtn;
    this.listData.filter = "Paid";
  }

  // tslint:disable-next-line: typedef
  onCreate() {
    const userName = sessionStorage.getItem('displayName');
    if (userName === '') {
      this.notificationService.warn('Please sign in to record your donation !!');
      this.router.navigate(['/userprofile']);
    } else {
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(DonationNewComponent, dialogConfig);
    }
  }

  // tslint:disable-next-line: typedef
  onDisplay(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DonationDisplayComponent, dialogConfig);
  }

  // tslint:disable-next-line: typedef
  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DonationNewComponent, dialogConfig);
  }

  // tslint:disable-next-line: typedef
  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteEmployee($key);
      this.notificationService.warn('! Deleted successfully');
    }
  }

}
