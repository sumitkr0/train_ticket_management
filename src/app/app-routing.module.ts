import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { UserDashboardComponent } from './modules/userdashboard/userdashboard.component';
import { AdminDashboardComponent } from './modules/admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './modules/booking/booking.component';
import { UserBookingsComponent } from './modules/user-bookings/user-bookings.component';
import { FaqComponent } from './modules/faq/faq.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { UserdetailsComponent } from './modules/userdetails/userdetails.component';
import { AddtrainComponent } from './modules/addtrain/addtrain.component';
import { EdittrainComponent } from './modules/edittrain/edittrain.component';
import { AuthGuard } from './auth.guard';
import { AuthGuard1 } from './auth1.guard';
import { CommonguardGuard } from './commonguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'userdashboard', component: UserDashboardComponent ,canActivate: [AuthGuard]},
  { path: 'admindashboard', component: AdminDashboardComponent ,canActivate: [AuthGuard1]},
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent ,canActivate: [AuthGuard]},
  { path: 'user-bookings', component: UserBookingsComponent ,canActivate: [AuthGuard]},
  { path: 'faq', component: FaqComponent,canActivate: [AuthGuard] },
  { path: 'update-user', component: UpdateUserComponent,canActivate: [CommonguardGuard]},
  { path: 'addtrain', component: AddtrainComponent,canActivate: [AuthGuard1]},
  { path: 'edittrain', component: EdittrainComponent,canActivate: [AuthGuard1]},
  { path: 'userdetails', component: UserdetailsComponent,canActivate: [AuthGuard1]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
