import { Component, OnInit } from '@angular/core';
import { AuthService } from '..//shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() { }

}
