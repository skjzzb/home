import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './views/contact/contact.component';
import { ErrorComponent } from './views/error/error.component';
import { FaqComponent } from './views/faq/faq.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PackagesComponent } from './views/packages/packages.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    ContactComponent,
    ErrorComponent,
    FaqComponent,
    AuthComponent,
    ProfileComponent,
    PackagesComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhgYGsUa7529jFR8yWrnTLjgvyA3T9Xi0'
    }),
    GooglePlaceModule,
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
