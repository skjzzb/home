import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { FaqComponent } from './views/faq/faq.component';
import { ErrorComponent } from './views/error/error.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },{
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: "**",
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
