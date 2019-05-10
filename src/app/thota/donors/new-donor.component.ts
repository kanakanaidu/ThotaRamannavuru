import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../shared/donation.service';

@Component({
  selector: 'app-new-donor',
  templateUrl: './new-donor.component.html',
  styleUrls: ['./new-donor.component.css']
})
export class NewDonorComponent implements OnInit {
  constructor(private service: DonationService) {}

  ngOnInit() {
        this.service.getEmployees();
  }
}
