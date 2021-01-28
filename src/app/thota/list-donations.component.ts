import { Component, OnInit, ViewChild } from '@angular/core';
import { DonationService } from '../shared/donation.service';
import { NotificationService } from '../shared/notification.service';
import { MaterialModule } from '../material/material.module';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewDonationComponent } from './new-donation.component';
import { DonationDisplayComponent } from './donation-display.component';
import { DonationNewComponent } from './donation-new.component';

@Component({
  selector: 'app-list-donations',
  templateUrl: './list-donations.component.html',
  styleUrls: ['./list-donations.component.css']
})
export class ListDonationsComponent implements OnInit {

  constructor(private dService: DonationService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

listData: MatTableDataSource<any>;
displayedColumns: string[] = ['id', 'donorName', 'donationDetails', 'donationAmount', 'monthYear', 'donationStatus', 'actions'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
searchKey: string;

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    this.dService.getDonations().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        console.log(array);
        this.listData = new MatTableDataSource(array);
        console.log(this.listData.data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };
      }
    );
  }

    // tslint:disable-next-line: typedef
    onSearchClear() {
      this.searchKey = '';
      this.applyFilter();
    }

    // tslint:disable-next-line: typedef
    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }

  // tslint:disable-next-line: typedef
  newDonation() {
    // this.router.navigate(['/newdonation']);
    this.dService.initializeFormGroup();
    const dailogConfig = new MatDialogConfig();
    dailogConfig.disableClose = false;
    dailogConfig.autoFocus = true;
    dailogConfig.width = '60%';
    this.dialog.open(NewDonationComponent, dailogConfig);
  }

   // tslint:disable-next-line: typedef
   onDisplay(row) {
    this.dService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DonationDisplayComponent, dialogConfig);
  }

  // tslint:disable-next-line: typedef
  onEdit(row) {
    this.dService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DonationNewComponent, dialogConfig);
  }

  // tslint:disable-next-line: typedef
  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      const donorName = this.dService.getDonationMonth($key);
      this.dService.deleteEmployee($key);
      this.notificationService.warn('! Deleted successfully');
    }
  }


}
