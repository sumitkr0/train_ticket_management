import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  foods: any[] = [];
  newFood = { name: '', price: 0 };
  editFood: any = null;
  apiUrl = 'http://localhost:8080/food';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllFoods();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.error('Authorization token is missing!');
      return {};
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllFoods() {
    this.http.get(this.apiUrl, this.getAuthHeaders()).subscribe(
      (response: any) => {
        this.foods = response;
      },
      (error) => {
        console.error('Error fetching foods:', error);
      }
    );
  }

  createFood() {
    if (this.newFood.name && this.newFood.price > 0) {
      this.http.post(this.apiUrl, this.newFood, this.getAuthHeaders()).subscribe(
        (response) => {
          console.log('Food created:', response);
          this.getAllFoods(); // Refresh the list
          this.newFood = { name: '', price: 0 }; // Reset the form
        },
        (error) => {
          console.error('Error creating food:', error);
        }
      );
    }
  }

  loadFoodForEdit(id: number) {
    this.http.get(`${this.apiUrl}/id?id=${id}`, this.getAuthHeaders()).subscribe(
      (response: any) => {
        this.editFood = { ...response };
      },
      (error) => {
        console.error('Error fetching food by ID:', error);
      }
    );
  }

  updateFood() {
    if (this.editFood && this.editFood.name && this.editFood.price > 0) {
      this.http.put(`${this.apiUrl}?id=${this.editFood.id}`, this.editFood, this.getAuthHeaders()).subscribe(
        (response) => {
          console.log('Food updated:', response);
          this.getAllFoods(); // Refresh the list
          this.editFood = null; // Clear the edit form
        },
        (error) => {
          console.error('Error updating food:', error);
        }
      );
    }
  }
}
