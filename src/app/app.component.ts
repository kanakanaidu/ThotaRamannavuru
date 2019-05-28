import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<!-- header -->
  <app-header></app-header>

  <!-- routes will be rendered here -->
  <router-outlet></router-outlet>

  <!-- footer -->
  <app-footer></app-footer>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ThotaramannaVuruDevasthanam';
  userDetails;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    // this.userDetails.getUserProfile().subscribe(
    //   res => {
    //     this.userDetails = res['user'];
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  // onLogout() {
  //   this.userService.deleteToken();
  //   this.router.navigate(['/login']);
  // }
}
