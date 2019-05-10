import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import the components so they can be referenced in routes
import { CreateMemberComponent } from './thota/create-member.component';
import { ListMemberesComponent } from './thota/list-memberes.component';
import { MemberesGalleryComponent } from './thota/memberes-gallery.component';
import { ListDonorsComponent } from './thota/donors/list-donors.component';
import { ListSevasComponent } from './thota/list-sevas.component';
import { NewDonorComponent } from './thota/donors/new-donor.component';

// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  { path: 'list', component: ListMemberesComponent },
  { path: 'create', component: CreateMemberComponent },
  { path: 'gallery', component: MemberesGalleryComponent },
  { path: 'sevas', component: ListSevasComponent },
  { path: 'donors', component: ListDonorsComponent },
  { path: 'newdonation', component: NewDonorComponent },
  { path: '', redirectTo: '/donors', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
