// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { CreateMemberComponent } from './thota/create-member.component';
import { ListMemberesComponent } from './thota/list-memberes.component';
import { MemberesGalleryComponent } from './thota/memberes-gallery.component';
import { ListDonorsComponent } from './thota/donors/list-donors.component';
import { ListSevasComponent } from './thota/list-sevas.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

// angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// routes
import { AppRoutingModule } from './app-routing.module';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './shared/user.service';
import { DonationService } from './shared/donation.service';

// other
import { NewDonorComponent } from './thota/donors/new-donor.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CreateMemberComponent,
    ListMemberesComponent,
    MemberesGalleryComponent,
    ListDonorsComponent,
    ListSevasComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    NewDonorComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    DonationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
