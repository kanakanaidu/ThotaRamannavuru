import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ListDonationsComponent } from './thota/list-donations.component';
import { NewDonationComponent } from './thota/new-donation.component';
import { DonationsListComponent } from './thota/donations-list.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { FileGalleryComponent } from './file-explorer/file-gallery.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListDonationsComponent },
  { path: 'newdonation', component: NewDonationComponent },
  { path: 'donations', component: DonationsListComponent },
  { path: 'login', component: UserProfileComponent },
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'file', component: FileGalleryComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
