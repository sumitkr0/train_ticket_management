import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- Import FormsModule here
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './modules/userdashboard/userdashboard.component';
import { AdminDashboardComponent } from './modules/admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './modules/booking/booking.component';
import { UserBookingsComponent } from './modules/user-bookings/user-bookings.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FaqComponent } from './modules/faq/faq.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { UserdetailsComponent } from './modules/userdetails/userdetails.component';
import { EdittrainComponent } from './modules/edittrain/edittrain.component';
import { AddtrainComponent } from './modules/addtrain/addtrain.component';
import { FoodComponent } from './modules/food/food.component';
import { FoodBookingComponent } from './modules/food-booking/food-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    RegisterComponent,
    BookingComponent,
    UserBookingsComponent,
    NavbarComponent,
    FaqComponent,
    UpdateUserComponent,
    AddtrainComponent,
    EdittrainComponent,
    UserdetailsComponent,
    EdittrainComponent,
    FoodComponent,
    FoodBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Import routing module
    FormsModule,  // Import FormsModule for ngModel binding
    HttpClientModule,  // Import HttpClientModule for API calls
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
