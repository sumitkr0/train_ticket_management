import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {
  train = {
    id: 0,
    name: '',
    source: '',
    destination: '',
    status: true,
    general: 50,
    sleeper: 50,
    ac: 50,
    seatNumber: 1,
    generalPrice: 100,
    sleeperPrice: 150,
    acPrice: 250,
    category: 'General',
  };

  initialTrainState = { ...this.train };

  apiUrl = 'http://localhost:8080/trains';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  // Add train method with validation
  addTrain(trainForm: NgForm) {
    if (trainForm.valid) {
      const newTrain = { ...this.train };

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(this.apiUrl, newTrain, { headers }).subscribe(
        (response) => {
          console.log('Train added:', response);
          this.router.navigate(['/edittrain']);
        },
        (error) => {
          console.error('Error adding train:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please fill all fields correctly.');
    }
  }

  resetForm() {
    this.train = { ...this.initialTrainState };
  }
}
