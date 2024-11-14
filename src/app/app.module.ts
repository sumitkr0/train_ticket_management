import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login/login.component';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule here
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './modules/userdashboard/userdashboard.component';
import { AdminDashboardComponent } from './modules/admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    RegisterComponent   // Declare LoginComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Import routing module
    FormsModule,  // Import FormsModule for ngModel binding
    HttpClientModule  // Import HttpClientModule for API calls
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
