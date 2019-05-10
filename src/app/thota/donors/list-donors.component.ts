import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-donors',
  templateUrl: './list-donors.component.html',
  styleUrls: ['./list-donors.component.css']
})
export class ListDonorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  newDonation() {
    alert('Hello!!!');
  }
}
