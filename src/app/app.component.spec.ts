import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { AuthComponent } from './components/auth/auth.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavigationComponent } from './components/navigation/navigation.component'
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent, HeaderComponent, FooterComponent, AuthComponent, NavigationComponent
      ],
      providers: [
        AngularFireAuth, AngularFireDatabase
      ]
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });
});
