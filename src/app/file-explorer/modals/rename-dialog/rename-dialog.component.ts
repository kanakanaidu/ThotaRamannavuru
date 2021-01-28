import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameDialogComponent>) { }

  folderName: string;

  ngOnInit(): void {
  }

}
