import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Material imports
import { MaterialModule } from './material/material.module';

// Services
import { DonationService } from './shared/donation.service';
import { FileService  } from './shared/file.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FileExplorerModule } from './file-explorer/file-explorer.module';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { ListDonationsComponent } from './thota/list-donations.component';
import { NewDonationComponent } from './thota/new-donation.component';
import { DonationsListComponent } from './thota/donations-list.component';
import { DonationNewComponent } from './thota/donation-new.component';
import { MonthPickerComponent } from './components/month-picker.component';
import { FileGalleryComponent } from './file-explorer/file-gallery.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { DonationDisplayComponent } from './thota/donation-display.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ListDonationsComponent,
    HeaderComponent,
    FooterComponent,
    NewDonationComponent,
    DonationsListComponent,
    DonationNewComponent,
    MonthPickerComponent,
    FileGalleryComponent,
    UserProfileComponent,
    HomeComponent,
    DonationDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FileExplorerModule,
    FlexLayoutModule
  ],
  providers: [DonationService, DatePipe, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
