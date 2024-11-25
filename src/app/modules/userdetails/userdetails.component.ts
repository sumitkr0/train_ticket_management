import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  users: any[] = []; // To store the users data

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Fetch user details from the API
  getUserDetails(): void {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('accept', '*/*');
    
    this.http.get<any[]>('http://localhost:8080/user/getAll', { headers }).subscribe(
      (response) => {
        this.users = response; // Assign the response data to users array
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  // Toggle user status (Activate/Deactivate)
  toggleStatus(userId: string, currentStatus: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    
    // Prepare the payload with the new status
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const body = null;

    // Call API to update user status
    this.http.put(`http://localhost:8080/user/updateStatus/${userId}/${newStatus}`, body, { headers })
      .subscribe(
        (response) => {
          const userIndex = this.users.findIndex(user => user.id === userId);
          if (userIndex !== -1) {
            this.users[userIndex].status = newStatus;
          }
        },
        (error) => {
          console.error('Error updating status', error);
        }
      );
  }
}
