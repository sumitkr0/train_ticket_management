import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { UserDashboardComponent } from './modules/userdashboard/userdashboard.component';
import { AdminDashboardComponent } from './modules/admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './modules/booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
